import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AddressSvg } from 'assets/svg/address'
import { CalendarSvg } from 'assets/svg/calendar'
import { DescriptionSvg } from 'assets/svg/description'
import { EmailSvg } from 'assets/svg/email'
import { NoPictureSvg } from 'assets/svg/noPicture'
import { PauseSvg } from 'assets/svg/pause'
import { PhoneSvg } from 'assets/svg/phone'
import { WarningSvg } from 'assets/svg/warning'
import { useRef } from 'react'
import { ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1 } from 'src/components/Typo'
import { HostFamilyType } from 'src/types/HostFamily/Type'
import {
  formatPhoneNumber,
  renderDateFormat,
  startsWithVowel,
  uppercaseWord,
} from 'src/utils/Functions'
import { BottomSheetHostFamily } from '../BottomSheet'
import { HostFamilyRouteParams } from '../Router/type'
import { Container, ContainerDescription, ContainerImage, Description, Fields } from './Styled'

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

  const renderField = (image: React.ReactElement, value: string, moreValue?: string) => {
    if (value) {
      return (
        <>
          <Spacing size="16" />
          <Fields>
            {image}
            <Body1 paddingLeft={8}>
              {moreValue}
              {value}
            </Body1>
          </Fields>
        </>
      )
    }
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={uppercaseWord(startsWithVowel(hostFamilyDetails.firstName))}
        toggleOverlay={handlePresentModal}
      />
      <Container>
        <>
          <Spacing size="8" />
          <ContainerImage>
            {hostFamilyDetails.picture ? (
              <Image
                source={{ uri: hostFamilyDetails.picture[0].url }}
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
              {hostFamilyDetails.firstName} {hostFamilyDetails.lastName}
            </Body1>
          </ContainerImage>
        </>
        <ContainerDescription>
          <Description>
            <Spacing size="48" />
            {renderField(<PhoneSvg />, formatPhoneNumber(hostFamilyDetails.phone))}
            {renderField(<EmailSvg />, hostFamilyDetails.email)}
            {renderField(
              <AddressSvg />,
              `${hostFamilyDetails.address}, ${hostFamilyDetails.postalCode} - ${hostFamilyDetails.city}`
            )}
            {renderField(
              <CalendarSvg />,
              renderDateFormat(hostFamilyDetails.createdAt),
              'Inscrit le '
            )}
            {renderField(<PauseSvg />, hostFamilyDetails.onBreak, 'Indisponible : ')}
            {renderField(<WarningSvg />, hostFamilyDetails.criteria, 'Critère : ')}
            {renderField(<DescriptionSvg />, hostFamilyDetails.description, 'Description : ')}
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
