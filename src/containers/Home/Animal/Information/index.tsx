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
  const { params } = route
  const { statusUser, userData } = useGetUserById(params?.animalDetails.userId)
  const { statusHostFamily, hostFamilyData } = useGetHostFamilyById(
    params?.animalDetails.hostFamilyId
  )

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
    if (params?.animalDetails.isSterilised) {
      return <Text>Stérilisé</Text>
    } else {
      return <Text>Non stérilisé</Text>
    }
  }

  const renderAgreement = (value: string) => {
    switch (value) {
      case AnimalAgreement.YES:
        return theme.lightColors?.grey3
      case AnimalAgreement.NO:
        return theme.lightColors?.grey1
      default:
        return theme.lightColors?.background
    }
  }

  const dateA = moment(new Date())
  const dateB = moment(params.animalDetails.birthday)
  console.log('aaa', dateA.diff(dateB, 'years'))

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={startsWithVowel(params?.animalDetails.name)}
        toggleOverlay={handlePresentModal}
      />
      <Container>
        <ScrollView>
          <CarouselAnimal animal={params.animalDetails} />
          <Description>
            <View>
              <TitleCard>
                <Text style={{ paddingRight: 4 }}>{params.animalDetails.name}</Text>
                {params && renderAnimalGender(params.animalDetails)}
              </TitleCard>
              <Spacing size="4" />
              <Text>{uppercaseWord(params.animalDetails.species)}</Text>
              <Spacing size="4" />
              <Text>Age : {dateA.diff(dateB, 'years')} ans</Text>
              {params.animalDetails.icadNumber && (
                <>
                  <Spacing size="4" />
                  <Text>Icad : {params.animalDetails.icadNumber}</Text>
                </>
              )}
              <Spacing size="4" />
              <Text>Alias : {params.animalDetails.alias}</Text>
              <Spacing size="4" />
              {renderHostFamily(statusHostFamily, hostFamilyData)}
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <ChipComponent value={params.animalDetails.status} />
              <Spacing size="4" />
              <Text>{renderIsSterilised()}</Text>
            </View>
          </Description>
          <Spacing size="16" />
          <Card>
            <TitleCard>
              <IconFoundation name="clipboard-notes" size={20} color={theme.lightColors?.grey3} />
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
                  containerStyle={{ backgroundColor: theme.lightColors?.grey4, borderRadius: 8 }}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
              <View>
                <Text>
                  {userData.firstname} {userData.lastname}
                </Text>
                <Spacing size="4" />
                <Text>Date : {renderDateFormat(params.animalDetails.dateInCharge)}</Text>
                <Spacing size="4" />
                <Text>Lieu : {params.animalDetails.placeCare}</Text>
                <Spacing size="4" />
                <Text>Raison : {uppercaseWord(renderReason(params.animalDetails.reason))}</Text>
              </View>
            </InCharge>
          </Card>
          <Spacing size="16" />
          <Card>
            <TitleCard>
              <IconEntypo name="heart" size={20} color={theme.lightColors?.grey1} />
              <TitleText>Son histoire</TitleText>
            </TitleCard>
            <Spacing size="8" />
            <Text>{params.animalDetails.publicDescription}</Text>
          </Card>
          <Spacing size="16" />
          <Card>
            <TitleCard>
              <IconMaterialCommunityIcons
                name="thumbs-up-down"
                size={20}
                color={theme.lightColors?.grey2}
              />
              <TitleText>Ententes</TitleText>
            </TitleCard>
            <Spacing size="16" />
            <ContainerViewImage>
              <ViewImage marginRight color={renderAgreement(params.animalDetails.dogAgreement)}>
                <Image
                  source={require('../../../../../assets/icons/chien1.png')}
                  style={{ width: 50, height: 50 }}
                />
              </ViewImage>
              <ViewImage marginRight color={renderAgreement(params.animalDetails.catAgreement)}>
                <Image
                  source={require('../../../../../assets/icons/chat1.png')}
                  style={{ width: 50, height: 50 }}
                />
              </ViewImage>
              <ViewImage color={renderAgreement(params.animalDetails.childAgreement)}>
                <Image
                  source={require('../../../../../assets/icons/kids1.png')}
                  style={{ width: 50, height: 50 }}
                />
              </ViewImage>
            </ContainerViewImage>
          </Card>
          <Spacing size="16" />
          <Card>
            <TitleCard>
              <IconMaterialIcons name="description" size={20} color={theme.lightColors?.grey0} />
              <TitleText>Description privé</TitleText>
            </TitleCard>
            <Spacing size="8" />
            <Text>
              {params.animalDetails.privateDescription ?? 'Aucune description pour le moment'}
            </Text>
          </Card>
          <Spacing size="32" />
        </ScrollView>
      </Container>
      <BottomSheetAnimal bottomSheetModalRef={bottomSheetModalRef} params={params} />
    </Layout>
  )
}
