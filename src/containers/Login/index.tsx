import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AnimalSvg } from 'assets/svg/animal'
import { Formik, FormikValues } from 'formik'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Spacing } from 'src/components/Layout/Spacing'
import { Title1 } from 'src/components/Typo'
import { CardStyle, Keyboard } from 'src/constant/Theme/Styled'
import { useGetUsers } from 'src/hooks/User'
import * as Yup from 'yup'
import { FormLogin } from './Form'
import { LoginRouteParams } from './Router/type'

export const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LoginRouteParams>>()
  const { usersData } = useGetUsers()

  const initialValues = {
    email: '',
    password: '',
  }

  const validationLogin = Yup.object().shape({
    email: Yup.string().email('Le format est incorrect').required('L’adresse mail est requise'),
    password: Yup.string().required('Le responsable est obligatoire'),
  })

  const updateAnimal = async (values) => {
    console.log('iciiiiiiiii', values)
    // usersData.map((user) => {
    //   if (
    //     bcrypt.compareSync(values.password, user.fields.password) &&
    //     user.fields.email === values.email
    //   ) {
    //     console.log('ouaiiiis', user)
    //   }
    // })
  }

  const onClickRegister = () => {
    navigation.navigate('registerScreen')
  }

  return (
    <Keyboard behavior="padding" enabled>
      <SafeAreaView>
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          <CardStyle>
            <Spacing size="32" />
            <Title1 textAlign="center">Bienvenue !</Title1>
            <View style={{ alignItems: 'center' }}>
              <AnimalSvg />
            </View>
            <Spacing size="16" />
            <Formik
              initialValues={initialValues}
              validationSchema={validationLogin}
              onSubmit={(values) => {
                // console.log('aaaaa', values)
                updateAnimal(values)
              }}
            >
              {(field: FormikValues) => (
                <FormLogin field={field} onClickRegister={onClickRegister} />
              )}
            </Formik>
          </CardStyle>
        </View>
      </SafeAreaView>
    </Keyboard>
  )
}
