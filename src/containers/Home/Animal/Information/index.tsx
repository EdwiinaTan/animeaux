import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import moment from 'moment'
import { useRef } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native'
import { Image as ImageElement } from 'react-native-elements'
import { ChipComponent } from 'src/components/Chip'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import {
  IconEntypo,
  IconFoundation,
  IconMaterialCommunityIcons,
  IconMaterialIcons,
} from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { useGetHostFamilyById } from 'src/hooks/HostFamily'
import { useGetUserById } from 'src/hooks/User'
import { AnimalAgreement } from 'src/types/Animal/enum'
import { FetchStatus } from 'src/types/Status'
import { renderReason } from 'src/utils/Animal'
import { renderDateFormat, startsWithVowel, uppercaseWord } from 'src/utils/Functions'
import { BottomSheetAnimal } from '../BottomSheet'
import { CarouselAnimal } from '../Carousel'
import { AnimalRouteParams } from '../Router/type'
import { renderAnimalGender, renderHostFamily } from '../Utils'
import {
  Card,
  Container,
  ContainerViewImage,
  Description,
  InCharge,
  TitleCard,
  TitleText,
  ViewImage,
} from './Styled'

export const AnimalInformation = (): React.ReactElement => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const bottomSheetModalRef = useRef(null)
  const {
    params: { animalDetails },
  } = route
  const { statusUser, userData } = useGetUserById(animalDetails.userId)
  const { statusHostFamily, hostFamilyData } = useGetHostFamilyById(animalDetails.hostFamilyId)

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present()
  }

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  if (statusUser === FetchStatus.LOADING) {
    return <Text>loading</Text>
  }

  const renderIsSterilised = () => {
    if (animalDetails.isSterilised) {
      return <Text>Stérilisé</Text>
    } else {
      return <Text>Non stérilisé</Text>
    }
  }

  const renderAgreement = (value: string) => {
    switch (value) {
      case AnimalAgreement.YES:
        return theme.colors.secondary
      case AnimalAgreement.NO:
        return theme.colors.red
      default:
        return theme.colors.background
    }
  }

  const dateA = moment(new Date())
  const dateB = moment(animalDetails.birthday)

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={startsWithVowel(animalDetails.name)}
        toggleOverlay={handlePresentModal}
      />
      <Container>
        <ScrollView>
          <CarouselAnimal animal={animalDetails} />
          <Description>
            <View>
              <TitleCard>
                <Text style={{ paddingRight: 4 }}>{animalDetails.name}</Text>
                {renderAnimalGender(animalDetails)}
              </TitleCard>
              <Spacing size="4" />
              <Text>{uppercaseWord(animalDetails.species)}</Text>
              <Spacing size="4" />
              <Text>Age : {dateA.diff(dateB, 'years')} ans</Text>
              {animalDetails.icadNumber && (
                <>
                  <Spacing size="4" />
                  <Text>Icad : {animalDetails.icadNumber}</Text>
                </>
              )}
              <Spacing size="4" />
              <Text>Alias : {animalDetails.alias}</Text>
              <Spacing size="4" />
              {renderHostFamily(statusHostFamily, hostFamilyData)}
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <ChipComponent value={animalDetails.status} />
              <Spacing size="4" />
              <Text>{renderIsSterilised()}</Text>
            </View>
          </Description>
          <Spacing size="16" />
          <Card>
            <TitleCard>
              <IconFoundation name="clipboard-notes" size={20} color={theme.colors.secondary} />
              <TitleText>Prise en charge </TitleText>
            </TitleCard>
            <Spacing size="8" />
            <InCharge>
              <View style={{ paddingRight: 8 }}>
                <ImageElement
                  source={{ uri: userData.picture[0].url }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    borderTopRightRadius: 8,
                    resizeMode: 'contain',
                  }}
                  containerStyle={{ backgroundColor: theme.colors.grey0, borderRadius: 8 }}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
              <View>
                <Text>
                  {userData.firstname} {userData.lastname}
                </Text>
                <Spacing size="4" />
                <Text>Date : {renderDateFormat(animalDetails.dateInCharge)}</Text>
                <Spacing size="4" />
                <Text>Lieu : {animalDetails.placeCare}</Text>
                <Spacing size="4" />
                <Text>Raison : {uppercaseWord(renderReason(animalDetails.reason))}</Text>
              </View>
            </InCharge>
          </Card>
          <Spacing size="16" />
          <Card>
            <TitleCard>
              <IconEntypo name="heart" size={20} color={theme.colors.red} />
              <TitleText>Son histoire</TitleText>
            </TitleCard>
            <Spacing size="8" />
            <Text>{animalDetails.publicDescription}</Text>
          </Card>
          <Spacing size="16" />
          <Card>
            <TitleCard>
              <IconMaterialCommunityIcons
                name="thumbs-up-down"
                size={20}
                color={theme.colors.blue}
              />
              <TitleText>Ententes</TitleText>
            </TitleCard>
            <Spacing size="16" />
            <ContainerViewImage>
              <ViewImage marginRight color={renderAgreement(animalDetails.dogAgreement)}>
                <Image
                  source={require('/assets/icons/chien1.png')}
                  style={{ width: 50, height: 50 }}
                />
              </ViewImage>
              <ViewImage marginRight color={renderAgreement(animalDetails.catAgreement)}>
                <Image
                  source={require('/assets/icons/chat1.png')}
                  style={{ width: 50, height: 50 }}
                />
              </ViewImage>
              <ViewImage color={renderAgreement(animalDetails.childAgreement)}>
                <Image
                  source={require('/assets/icons/kids1.png')}
                  style={{ width: 50, height: 50 }}
                />
              </ViewImage>
            </ContainerViewImage>
          </Card>
          <Spacing size="16" />
          <Card>
            <TitleCard>
              <IconMaterialIcons name="description" size={20} color={theme.colors.yellow} />
              <TitleText>Description privé</TitleText>
            </TitleCard>
            <Spacing size="8" />
            <Text>{animalDetails.privateDescription ?? 'Aucune description pour le moment'}</Text>
          </Card>
          <Spacing size="32" />
        </ScrollView>
      </Container>
      <BottomSheetAnimal bottomSheetModalRef={bottomSheetModalRef} animalDetails={animalDetails} />
    </Layout>
  )
}
