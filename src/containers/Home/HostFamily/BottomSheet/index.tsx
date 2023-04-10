import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import { Divider, ListItem, Overlay } from 'react-native-elements'
import { deleteHostFamilyById } from 'src/client/HostFamily'
import { Spacing } from 'src/components/Layout/Spacing'
import { IconAntDesign, IconFontAwesome } from 'src/constant/Icons'
import { startsWithVowel } from 'src/utils/Functions'
import { HostFamilyRouteParams } from '../Router/type'
import { BottomSheetProps } from './Type'

export const BottomSheetHostFamily: React.FC<BottomSheetProps> = ({
  bottomSheetModalRef,
  hostFamilyDetails,
}) => {
  const snapPoints = ['20%']
  const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible)
    if (isOverlayVisible) {
      bottomSheetModalRef.current.close()
    }
  }

  const handleViewEditProfil = () => {
    bottomSheetModalRef.current.close()
    navigation.navigate('hostFamilyUpdate', {
      hostFamilyDetails: hostFamilyDetails,
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

  const deleteHostFamily = () => {
    deleteHostFamilyById(hostFamilyDetails.id)
    navigation.navigate('hostFamilyScreen')
  }

  const listBottomSheet = [
    {
      name: 'Éditer le profil',
      icon: <IconAntDesign name="profile" size={20} style={{ paddingRight: 16 }} />,
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
      <Overlay
        isVisible={isOverlayVisible}
        overlayStyle={{ marginHorizontal: 40, padding: 16 }}
        onBackdropPress={toggleOverlay}
      >
        <Text>{`Etes vous sûre de vouloir supprimer le ${startsWithVowel(
          hostFamilyDetails.firstname
        )} ?`}</Text>
        <Text>Ce choix sera irréversible.</Text>
        <Spacing size="8" />
        <Divider />
        <Spacing size="8" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text onPress={deleteHostFamily}>Oui</Text>
          <Divider orientation="vertical" />
          <Text onPress={toggleOverlay}>Non</Text>
        </View>
      </Overlay>
    </BottomSheetModal>
  )
}
