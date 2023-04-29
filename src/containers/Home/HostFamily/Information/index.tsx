import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AddressSvg } from 'assets/svg/address'
import { AquariumSvg } from 'assets/svg/aquarium'
import { CalendarSvg } from 'assets/svg/calendar'
import { EmailSvg } from 'assets/svg/email'
import { PauseSvg } from 'assets/svg/pause'
import { PhoneSvg } from 'assets/svg/phone'
import { WarningSvg } from 'assets/svg/warning'
import { useRef } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView } from 'react-native'
import { HeaderComponent } from 'src/components/Header'
import { ImageProfile } from 'src/components/ImageProfile'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetHostFamilyById } from 'src/hooks/HostFamily'
import { FetchStatus } from 'src/types/Status'
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
    params: { hostFamilyId },
  } = route as { params: { hostFamilyId: string } }
  const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { statusHostFamily, hostFamilyData } = useGetHostFamilyById(hostFamilyId)

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present()
  }

  const renderField = (image?: React.ReactElement, value?: string | number, moreValue?: string) => {
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

  let numberAnimal

  if (hostFamilyData.animalId && hostFamilyData.animalId.length) {
    numberAnimal = hostFamilyData.animalId && hostFamilyData.animalId.length
  } else {
    numberAnimal = 0
  }

  return (
    <Layout>
      {statusHostFamily === FetchStatus.LOADING ? (
        <SafeAreaView>
          <Spacing size="24" />
          <ActivityIndicator size="large" color={theme.colors.blue} />
        </SafeAreaView>
      ) : (
        <>
          <HeaderComponent
            onClickGoBack={onClickGoBack}
            title={uppercaseWord(startsWithVowel(hostFamilyData.firstName))}
            toggleOverlay={handlePresentModal}
          />
          <ScrollView>
            <Container>
              <ContainerImage>
                <Spacing size="8" />
                <ImageProfile picture={hostFamilyData.picture} />
                <Body1>
                  {hostFamilyData.firstName} {hostFamilyData.lastName}
                </Body1>
              </ContainerImage>
              <ContainerDescription>
                <Description>
                  <Spacing size="48" />
                  {renderField(<PhoneSvg />, formatPhoneNumber(hostFamilyData.phone))}
                  {renderField(<EmailSvg />, hostFamilyData.email)}
                  {renderField(
                    <AddressSvg />,
                    `${hostFamilyData.address}, ${hostFamilyData.postalCode} - ${hostFamilyData.city}`
                  )}
                  {renderField(
                    <CalendarSvg />,
                    renderDateFormat(hostFamilyData.createdAt),
                    'Inscrit le '
                  )}
                  {renderField(<PauseSvg />, hostFamilyData.onBreak, 'Indisponible : ')}
                  {renderField(<WarningSvg />, hostFamilyData.criteria, 'Critère : ')}
                  {renderField(null, hostFamilyData.description, 'Description : ')}
                  {renderField(<AquariumSvg />, numberAnimal, `Nombre d'animaux hébergés : `)}
                </Description>
              </ContainerDescription>
            </Container>
            <Spacing size="16" />
          </ScrollView>
          <BottomSheetHostFamily
            bottomSheetModalRef={bottomSheetModalRef}
            hostFamilyDetails={hostFamilyData}
          />
        </>
      )}
    </Layout>
  )
}
