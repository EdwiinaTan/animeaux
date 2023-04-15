import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import { useState } from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import StepIndicator from 'react-native-step-indicator'
import { AnimalProfile } from 'src/components/Animal/Profile'
import { AnimalSituation } from 'src/components/Animal/Situation'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Card, Container, customStyles } from './Styled'

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
    gender: '',
    name: '',
    alias: '',
    icadNumber: '',
    race: '',
    color: '',
    publicDescription: '',
  }

  const initialValuesStepTwo = {
    hostFamilyId: '',
    status: '',
    placeCare: '',
    reason: '',
    childAgreement: '',
    catAgreement: '',
    dogAgreement: '',
    userId: '',
    privateDescription: '',
    isSterilised: '',
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
      <Container>
        <Card>
          {currentPosition === 0 && (
            <Formik
              initialValues={initialValuesStepOne}
              onSubmit={(values) => {
                console.log('valueOne', values)
              }}
            >
              {({ handleChange, values, handleSubmit, handleBlur }) => (
                <AnimalProfile
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                />
              )}
            </Formik>
          )}
          {currentPosition === 1 && (
            <Formik
              initialValues={initialValuesStepTwo}
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
            <Text>Précédent</Text>
            <Spacing size="24" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => onPageChange('next')}>
          <Text>Suivant</Text>
        </TouchableOpacity>
        <Spacing size="24" />
      </Container>
    </Layout>
  )
}
