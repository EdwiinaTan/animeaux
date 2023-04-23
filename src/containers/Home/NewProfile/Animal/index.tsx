import { useNavigation } from '@react-navigation/native'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import StepIndicator from 'react-native-step-indicator'
import { postAnimal } from 'src/client/Animal'
import { AnimalProfile } from 'src/components/Form/Animal/Profile'
import { validationAnimalProfile } from 'src/components/Form/Animal/Profile/Utils'
import { AnimalSituation } from 'src/components/Form/Animal/Situation'
import { validationAnimalSituation } from 'src/components/Form/Animal/Situation/Utils'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1 } from 'src/components/Typo'
import { CardStyle, ContainerStyle } from 'src/constant/Theme/Styled'
import { AnimalType } from 'src/types/Animal/Type'
import { customStyles, Keyboard } from './Styled'

export const AddAnimal = () => {
  const navigation = useNavigation()
  const labels = ['Profil', 'Situation', 'Photos']
  const [currentPosition, setCurrentPosition] = useState(0)
  const [valueProfile, setValueProfile] = useState()
  const [valueSituation, setValueSituation] = useState()
  const queryClient = new QueryClient()

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const onPageChange = (value: string) => {
    if (value === 'next') {
      currentPosition !== 2 ? setCurrentPosition(currentPosition + 1) : setCurrentPosition(2)
    } else {
      currentPosition !== 0 ? setCurrentPosition(currentPosition - 1) : setCurrentPosition(0)
    }
  }

  const initialValuesStepOne = {
    species: '',
    gender: '',
    name: '',
    alias: '',
    icad: '',
    race: '',
    birthday: '',
    color: '',
    publicDescription: '',
  }

  const initialValuesStepTwo = {
    hostFamilyId: '',
    status: '',
    placeAssigned: '',
    dateAssigned: '',
    reason: '',
    childAgreement: '',
    catAgreement: '',
    dogAgreement: '',
    userId: '',
    privateDescription: '',
    isSterilized: '',
  }

  const onSubmitProfile = (values) => {
    setValueProfile(values)
    onPageChange('next')
  }

  const onSubmitSituation = (values) => {
    setValueSituation(values)
    onPageChange('next')
  }

  const mutation = useMutation({
    mutationFn: postAnimal,
    onSuccess: () => {
      navigation.goBack()
      queryClient.invalidateQueries(['animals'])
    },
    onError: (err) => {
      console.log('err', err)
    },
  })

  const validation = () => {
    const values: AnimalType = Object.assign({}, valueProfile, valueSituation)
    const data = {
      ...values,
      hostFamilyId: [values.hostFamilyId],
      userId: [values.userId],
    }
    console.log('values', data)
    mutation.mutate(data)
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={onClickGoBack} title="Ajouter un animal" />
      <Spacing size="8" />
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        stepCount={3}
        direction="horizontal"
      />
      <Spacing size="8" />
      <Keyboard behavior="padding" enabled>
        <ContainerStyle>
          {currentPosition !== 0 && (
            <TouchableOpacity onPress={() => onPageChange('prev')}>
              <Body1>Précédent</Body1>
              <Spacing size="8" />
            </TouchableOpacity>
          )}
          {currentPosition === 0 && (
            <Formik
              initialValues={initialValuesStepOne}
              validationSchema={validationAnimalProfile}
              onSubmit={(values) => {
                onSubmitProfile(values)
              }}
            >
              {({
                handleChange,
                values,
                handleSubmit,
                handleBlur,
                errors,
                touched,
                setFieldValue,
              }) => (
                <AnimalProfile
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              )}
            </Formik>
          )}
          {currentPosition === 1 && (
            <CardStyle>
              <Formik
                initialValues={initialValuesStepTwo}
                validationSchema={validationAnimalSituation}
                onSubmit={(values) => {
                  onSubmitSituation(values)
                }}
              >
                {({
                  handleChange,
                  values,
                  handleSubmit,
                  handleBlur,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <AnimalSituation
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                  />
                )}
              </Formik>
            </CardStyle>
          )}
          {currentPosition === 2 && (
            <TouchableOpacity onPress={() => validation()}>
              <Body1>Suivant</Body1>
              <Spacing size="8" />
            </TouchableOpacity>
          )}
          <Spacing size="24" />
        </ContainerStyle>
      </Keyboard>
    </Layout>
  )
}
