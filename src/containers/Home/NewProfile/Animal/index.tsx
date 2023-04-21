import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import StepIndicator from 'react-native-step-indicator'
import { AnimalProfile } from 'src/components/Animal/Profile'
import { validationAnimalProfile } from 'src/components/Animal/Profile/Utils'
import { AnimalSituation } from 'src/components/Animal/Situation'
import { validationAnimalSituation } from 'src/components/Animal/Situation/Utils'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1 } from 'src/components/Typo'
import { Card, Container, customStyles, Keyboard } from './Styled'

export const AddAnimal = () => {
  const navigation = useNavigation()
  const labels = ['Profil', 'Situation', 'Photos']
  const [currentPosition, setCurrentPosition] = useState(0)

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
    genre: '',
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
    reason: '',
    childAgreement: '',
    catAgreement: '',
    dogAgreement: '',
    userId: '',
    privateDescription: '',
    isSterilized: '',
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
        <Container>
          <Card>
            {currentPosition === 0 && (
              <Formik
                initialValues={initialValuesStepOne}
                validationSchema={validationAnimalProfile}
                onSubmit={(values) => {
                  console.log('valueOne', values)
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
              <Formik
                initialValues={initialValuesStepTwo}
                validationSchema={validationAnimalSituation}
                onSubmit={(values) => {
                  console.log('valueTwo', values)
                }}
              >
                {({ handleChange, values, handleSubmit, handleBlur }) => (
                  <AnimalSituation
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                  />
                )}
              </Formik>
            )}
          </Card>
          {currentPosition !== 0 && (
            <TouchableOpacity onPress={() => onPageChange('prev')}>
              <Body1>Précédent</Body1>
              <Spacing size="24" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => onPageChange('next')}>
            <Body1>Suivant</Body1>
          </TouchableOpacity>
          <Spacing size="24" />
        </Container>
      </Keyboard>
    </Layout>
  )
}
