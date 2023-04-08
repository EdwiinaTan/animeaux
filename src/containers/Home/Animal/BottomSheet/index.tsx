import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import { ListItem, Overlay } from 'react-native-elements'
import { IconAntDesign, IconFontAwesome, IconFoundation } from 'src/constant/Icons'
import { startsWithVowel } from 'src/utils/Functions'
import { AnimalRouteParams } from '../Router/type'
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
    (props: any) => (
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
      name: <Text style={{ color: 'red' }}>Supprimer le profil</Text>,
      icon: <IconFontAwesome name="trash-o" size={24} style={{ paddingRight: 16, color: 'red' }} />,
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
      <Overlay isVisible={isOverlayVisible} onBackdropPress={toggleOverlay}>
        <Text>{`Etes vous sûre de vouloir supprimer le ${startsWithVowel(
          animalDetails.name
        )} ?`}</Text>
        <Text>Ce choix sera irréversible</Text>
      </Overlay>
    </BottomSheetModal>
  )
}
