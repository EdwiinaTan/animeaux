import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { EmailSvg } from 'assets/svg/email'
import { NoPictureSvg } from 'assets/svg/noPicture'
import { PhoneSvg } from 'assets/svg/phone'
import { ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'
import { theme } from 'src/constant/Theme'
import { ContainerStyle } from 'src/constant/Theme/Styled'
import { AnimalRouteParams } from 'src/containers/Home/Animal/Router/type'
import { useGetUserById } from 'src/hooks/User'
import { AnimalType } from 'src/types/Animal/Type'
import { FetchStatus } from 'src/types/Status'
import { formatPhoneNumber, startsWithVowel, uppercaseWord } from 'src/utils/Functions'
import { HeaderComponent } from '../Header'
import { Layout } from '../Layout'
import { Spacing } from '../Layout/Spacing'
import { Body1 } from '../Typo'
import { ContainerDescription, ContainerImage, Description, Fields } from './Styled'

export const UserInCharge = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const { statusUser, userData } = useGetUserById(animalDetails.userId)

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const renderField = (image: React.ReactElement, value: string) => {
    if (value) {
      return (
        <>
          <Spacing size="16" />
          <Fields>
            {image}
            <Body1>{value}</Body1>
          </Fields>
        </>
      )
    }
  }

  return (
    <Layout>
      <HeaderComponent
        title={uppercaseWord(startsWithVowel(userData.firstName))}
        onClickGoBack={onClickGoBack}
      />
      <ContainerStyle>
        {statusUser === FetchStatus.LOADING ? (
          <ActivityIndicator size="large" color={theme.colors.blue} />
        ) : (
          <>
            <Spacing size="8" />
            <ContainerImage>
              {userData.picture ? (
                <Image
                  source={{ uri: userData.picture[0].url }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                />
              ) : (
                <NoPictureSvg />
              )}
              <Body1>
                {userData.firstName} {userData.lastName}
              </Body1>
            </ContainerImage>
            <ContainerDescription>
              <Description>
                <Spacing size="64" />
                <Body1>
                  {userData.firstName} {userData.lastName}
                </Body1>
                {renderField(<PhoneSvg />, userData.phone && formatPhoneNumber(userData.phone))}
                {renderField(<EmailSvg />, userData.email)}
              </Description>
              {/* animaux en charge avec historique */}
            </ContainerDescription>
          </>
        )}
      </ContainerStyle>
    </Layout>
  )
}
