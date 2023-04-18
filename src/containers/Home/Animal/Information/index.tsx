import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CatSvg } from 'assets/svg/cat'
import { DogSvg } from 'assets/svg/dog'
import { KidSvg } from 'assets/svg/kid'
import { useRef } from 'react'
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native'
import { Image as ImageElement } from 'react-native-elements'
import { ChipComponent } from 'src/components/Chip'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1, Body2, Title2 } from 'src/components/Typo'
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
import { AnimalType } from 'src/types/Animal/Type'
import { FetchStatus } from 'src/types/Status'
import { animalAge, renderDateFormat, startsWithVowel, uppercaseWord } from 'src/utils/Functions'
import { BottomSheetAnimal } from '../BottomSheet'
import { CarouselAnimal } from '../Carousel'
import { AnimalRouteParams } from '../Router/type'
import { renderAnimalGender, renderHostFamily } from '../Utils'
import {
  BoxViewImage,
  Card,
  Container,
  ContainerViewImage,
  Description,
  InCharge,
  TitleCard,
  ViewImage,
} from './Styled'

export const AnimalInformation = (): React.ReactElement => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const { statusUser, userData } = useGetUserById(animalDetails.userId)
  const { statusHostFamily, hostFamilyData } = useGetHostFamilyById(animalDetails.hostFamilyId)

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present()
  }

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const onClick = () => {
    navigation.navigate('animalUserInCharge', { animalDetails: animalDetails })
  }

  const renderIsSterilised = () => {
    if (animalDetails.isSterilised) {
      return <Body1>Stérilisé</Body1>
    }
    return <Body1>Non stérilisé</Body1>
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

  const renderField = (key: string, value: string) => {
    if (value) {
      return (
        <Body1>
          {key} : {value}
        </Body1>
      )
    }
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={uppercaseWord(startsWithVowel(animalDetails.name))}
        toggleOverlay={handlePresentModal}
      />
      <Container>
        {statusUser === FetchStatus.LOADING ? (
          <ActivityIndicator size="large" color={theme.colors.blue} />
        ) : (
          <ScrollView>
            <CarouselAnimal animal={animalDetails} />
            <Description>
              <View>
                <TitleCard>
                  <Body1 paddingRight={4}>{animalDetails.name}</Body1>
                  {renderAnimalGender(animalDetails)}
                </TitleCard>
                <Body1>Age : {animalAge(animalDetails.birthday)}</Body1>
                {renderField('Icad', animalDetails.icadNumber)}
                {renderField('Alias', animalDetails.alias)}
                {renderField('Race', animalDetails.race)}
                {renderHostFamily(statusHostFamily, hostFamilyData)}
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <ChipComponent value={animalDetails.status} />
                <Body1>{renderIsSterilised()}</Body1>
              </View>
            </Description>
            <Spacing size="16" />
            <TouchableOpacity onPress={onClick} activeOpacity={1}>
              <Card>
                <TitleCard>
                  <IconFoundation name="clipboard-notes" size={20} color={theme.colors.secondary} />
                  <Title2 paddingLeft={8}>Prise en charge </Title2>
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
                    <Body1>
                      {userData.firstname} {userData.lastname}
                    </Body1>
                    <Body1>Date : {renderDateFormat(animalDetails.dateInCharge)}</Body1>
                    <Body1>Lieu : {animalDetails.placeCare}</Body1>
                    <Body1>Raison : {animalDetails.reason}</Body1>
                  </View>
                </InCharge>
              </Card>
            </TouchableOpacity>
            <Spacing size="16" />
            <Card>
              <TitleCard>
                <IconEntypo name="heart" size={20} color={theme.colors.red} />
                <Title2 paddingLeft={8}>Son histoire</Title2>
              </TitleCard>
              <Spacing size="8" />
              <Body2>{animalDetails.publicDescription}</Body2>
            </Card>
            <Spacing size="16" />
            <Card>
              <BoxViewImage>
                <TitleCard>
                  <IconMaterialCommunityIcons
                    name="thumbs-up-down"
                    size={20}
                    color={theme.colors.blue}
                  />
                  <Title2 paddingLeft={8}>Ententes</Title2>
                </TitleCard>
                <Spacing size="8" />
                <ContainerViewImage>
                  <ViewImage marginRight color={renderAgreement(animalDetails.dogAgreement)}>
                    <DogSvg />
                  </ViewImage>
                  <ViewImage marginRight color={renderAgreement(animalDetails.catAgreement)}>
                    <CatSvg />
                  </ViewImage>
                  <ViewImage color={renderAgreement(animalDetails.childAgreement)}>
                    <KidSvg />
                  </ViewImage>
                </ContainerViewImage>
              </BoxViewImage>
            </Card>
            <Spacing size="16" />
            <Card>
              <TitleCard>
                <IconMaterialIcons name="description" size={20} color={theme.colors.yellow} />
                <Title2 paddingLeft={8}>Description privé</Title2>
              </TitleCard>
              <Spacing size="8" />
              <Body2>
                {animalDetails.privateDescription ?? 'Aucune description pour le moment'}
              </Body2>
            </Card>
            <Spacing size="32" />
          </ScrollView>
        )}
      </Container>
      <BottomSheetAnimal bottomSheetModalRef={bottomSheetModalRef} animalDetails={animalDetails} />
    </Layout>
  )
}
