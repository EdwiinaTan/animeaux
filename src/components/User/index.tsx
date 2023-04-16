import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ActivityIndicator, ImageSourcePropType, Text } from 'react-native'
import { Image } from 'react-native-elements'
import { theme } from 'src/constant/Theme'
import { AnimalRouteParams } from 'src/containers/Home/Animal/Router/type'
import { useGetUserById } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
import { startsWithVowel, uppercaseWord } from 'src/utils/Functions'
import { HeaderComponent } from '../Header'
import { Layout } from '../Layout'
import { Spacing } from '../Layout/Spacing'
import {
  Container,
  ContainerDescription,
  ContainerImage,
  Description,
  Fields,
  ImageField,
} from './Styled'
import email from '/assets/icons/e-mail.png'
import smartphone from '/assets/icons/smartphones.png'

export const UserInCharge = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route
  const { statusUser, userData } = useGetUserById(animalDetails.userId)

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const renderField = (image: ImageSourcePropType, value: string) => {
    if (value) {
      return (
        <>
          <Spacing size="16" />
          <Fields>
            <ImageField source={image} />
            <Text>{value}</Text>
          </Fields>
        </>
      )
    }
  }

  return (
    <Layout>
      <HeaderComponent
        title={uppercaseWord(startsWithVowel(userData.firstname))}
        onClickGoBack={onClickGoBack}
      />
      <Container>
        {statusUser === FetchStatus.LOADING ? (
          <ActivityIndicator size="large" color={theme.colors.blue} />
        ) : (
          <>
            <Spacing size="8" />
            <ContainerImage>
              <Image
                source={{ uri: userData?.picture[0]?.url }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 8,
                }}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Spacing size="4" />
            </ContainerImage>
            <ContainerDescription>
              <Description>
                <Spacing size="64" />
                <Text>
                  {userData.firstname} {userData.lastname}
                </Text>
                {renderField(smartphone, userData.phone)}
                {renderField(email, userData.email)}
              </Description>
              {/* animaux en charge avec historique */}
            </ContainerDescription>
          </>
        )}
      </Container>
    </Layout>
  )
}
