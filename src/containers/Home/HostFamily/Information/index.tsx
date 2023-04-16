import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useRef } from 'react'
import { ActivityIndicator, ImageSourcePropType } from 'react-native'
import { Image } from 'react-native-elements'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1 } from 'src/components/Typo'
import { HostFamilyType } from 'src/types/HostFamily/Type'
import { renderDateFormat, startsWithVowel, uppercaseWord } from 'src/utils/Functions'
import { BottomSheetHostFamily } from '../BottomSheet'
import { HostFamilyRouteParams } from '../Router/type'
import {
  Container,
  ContainerDescription,
  ContainerImage,
  Description,
  Fields,
  ImageField,
} from './Styled'
import address from '/assets/icons/address.png'
import calendar from '/assets/icons/calendar.png'
import clipboard from '/assets/icons/clipboard.png'
import email from '/assets/icons/e-mail.png'
import jobSeeking from '/assets/icons/job-seeking.png'
import play from '/assets/icons/play.png'
import smartphone from '/assets/icons/smartphones.png'

export const HostFamilyInformation = (): React.ReactElement => {
  const route = useRoute<RouteProp<HostFamilyRouteParams>>()
  const {
    params: { hostFamilyDetails },
  } = route as { params: { hostFamilyDetails: HostFamilyType } }
  const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present()
  }

  const renderField = (image: ImageSourcePropType, value: string) => {
    if (value) {
      return (
        <>
          <Spacing size="16" />
          <Fields>
            <ImageField source={image} />
            <Body1>{value}</Body1>
          </Fields>
        </>
      )
    }
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={uppercaseWord(startsWithVowel(hostFamilyDetails.firstname))}
        toggleOverlay={handlePresentModal}
      />
      <Container>
        <Spacing size="8" />
        <ContainerImage>
          <Image
            source={{ uri: hostFamilyDetails?.picture[0]?.url }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 8,
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Body1>
            {hostFamilyDetails.firstname} {hostFamilyDetails.lastname}
          </Body1>
        </ContainerImage>
        <ContainerDescription>
          <Description>
            <Spacing size="48" />
            {renderField(smartphone, hostFamilyDetails.phone)}
            {renderField(email, hostFamilyDetails.email)}
            {renderField(address, hostFamilyDetails.address)}
            {renderField(calendar, renderDateFormat(hostFamilyDetails.updatedAt))}
            {renderField(play, hostFamilyDetails.onBreak)}
            {renderField(clipboard, hostFamilyDetails.criteria)}
            {renderField(jobSeeking, hostFamilyDetails.description)}
          </Description>
        </ContainerDescription>
        {/* <Text>Historique de prise en charge d'animal</Text> */}
      </Container>
      <BottomSheetHostFamily
        bottomSheetModalRef={bottomSheetModalRef}
        hostFamilyDetails={hostFamilyDetails}
      />
    </Layout>
  )
}
