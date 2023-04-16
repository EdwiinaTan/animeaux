import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Divider, ListItem, Overlay } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { deleteAnimalById } from 'src/client/Animal'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1, Title3 } from 'src/components/Typo'
import { IconAntDesign, IconFontAwesome, IconFoundation } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { startsWithVowel } from 'src/utils/Functions'
import { AnimalRouteParams } from '../Router/type'
import { ContainerButton, TextRed } from './Styled'
import { BottomSheetProps } from './Type'

export const BottomSheetAnimal: React.FC<BottomSheetProps> = ({
  bottomSheetModalRef,
  animalDetails,
}) => {
  const snapPoints = ['30%']
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible)
    if (isOverlayVisible) {
      bottomSheetModalRef
    }
  }

  const handleViewEditProfil = () => {
    bottomSheetModalRef.current.close()
    navigation.navigate('animalUpdateProfil', {
      animalDetails: animalDetails,
    })
  }

  const handleViewEditSituation = () => {
    bottomSheetModalRef.current.close()
    navigation.navigate('animalUpdateSituation', {
      animalDetails: animalDetails,
    })
  }

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    []
  )

  const deleteAnimal = () => {
    deleteAnimalById(animalDetails.id)
    navigation.navigate('animalScreen')
  }

  const listBottomSheet = [
    {
      name: 'Éditer le profil',
      icon: <IconAntDesign name="profile" size={20} style={{ paddingRight: 16 }} />,
      press: handleViewEditProfil,
      chevron: true,
    },
    {
      name: 'Éditer la situation',
      icon: <IconAntDesign name="edit" size={20} style={{ paddingRight: 16 }} />,
      press: handleViewEditSituation,
      chevron: true,
    },
    {
      name: 'Éditer les photos',
      icon: <IconFoundation name="photo" size={22} style={{ paddingRight: 16 }} />,
      press: handleViewEditProfil,
      chevron: true,
    },
    {
      name: <Title3 color={theme.colors.red}>Supprimer le profil</Title3>,
      icon: (
        <IconFontAwesome
          name="trash-o"
          size={24}
          style={{ paddingRight: 16, color: theme.colors.red }}
        />
      ),
      press: toggleOverlay,
      chevron: false,
    },
  ]

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <View style={{ paddingHorizontal: 16 }}>
        {listBottomSheet.map((list, key) => (
          <ListItem key={`${list.name}_${key}`} onPress={list.press} bottomDivider={list.chevron}>
            {list.icon}
            <ListItem.Content>
              <ListItem.Title>{list.name}</ListItem.Title>
            </ListItem.Content>
            {list.chevron === true && <ListItem.Chevron />}
          </ListItem>
        ))}
      </View>
      <Overlay
        isVisible={isOverlayVisible}
        overlayStyle={{ marginHorizontal: 40, padding: 16 }}
        onBackdropPress={toggleOverlay}
      >
        <Body1>{`Êtes vous sûre de vouloir supprimer le ${startsWithVowel(
          animalDetails.name
        )} ?`}</Body1>
        <Body1>
          Ce choix sera <TextRed>irréversible.</TextRed>
        </Body1>
        <Spacing size="8" />
        <Divider />
        <Spacing size="8" />
        <ContainerButton>
          <TouchableOpacity onPress={() => deleteAnimal()}>
            <Body1>Oui</Body1>
          </TouchableOpacity>
          <Divider orientation="vertical" />
          <TouchableOpacity onPress={() => toggleOverlay()}>
            <Body1>Non</Body1>
          </TouchableOpacity>
        </ContainerButton>
      </Overlay>
    </BottomSheetModal>
  )
}
