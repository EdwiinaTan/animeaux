import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { Divider, ListItem, Overlay } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { deleteHostFamilyById } from 'src/client/HostFamily'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1, Title3 } from 'src/components/Typo'
import { IconAntDesign, IconFontAwesome } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { TextRed } from 'src/constant/Theme/Styled'
import { startsWithVowel } from 'src/utils/Functions'
import { HostFamilyRouteParams } from '../Router/type'
import { ContainerButton, ListView } from './Styled'
import { BottomSheetProps } from './Type'

export const BottomSheetHostFamily: React.FC<BottomSheetProps> = ({
  bottomSheetModalRef,
  hostFamilyDetails,
}) => {
  const snapPoints = ['20%']
  const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const queryClient = useQueryClient()

  const toggleOverlay = (): void => {
    setIsOverlayVisible(!isOverlayVisible)
    if (isOverlayVisible) {
      bottomSheetModalRef.current.close()
    }
  }

  const handleViewEditProfil = (): void => {
    bottomSheetModalRef.current.close()
    navigation.navigate('hostFamilyUpdate', {
      hostFamilyDetails: hostFamilyDetails,
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

  const mutation = useMutation({
    mutationFn: deleteHostFamilyById,
    onSuccess: () => {
      navigation.navigate('hostFamilyScreen')
      queryClient.invalidateQueries({ queryKey: ['hostFamilies'] })
    },
    onError: (err) => {
      console.log('err', err)
    },
  })

  const deleteHostFamily = () => {
    mutation.mutate(hostFamilyDetails.id)
  }

  const listBottomSheet = [
    {
      name: 'Éditer le profil',
      icon: <IconAntDesign name="profile" size={20} style={{ paddingRight: 16 }} />,
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
      <ListView>
        {listBottomSheet.map((list, key) => (
          <ListItem key={`${list.name}_${key}`} onPress={list.press} bottomDivider={list.chevron}>
            {list.icon}
            <ListItem.Content>
              <ListItem.Title>{list.name}</ListItem.Title>
            </ListItem.Content>
            {list.chevron === true && <ListItem.Chevron />}
          </ListItem>
        ))}
      </ListView>
      <Overlay
        isVisible={isOverlayVisible}
        overlayStyle={{ marginHorizontal: 40, padding: 16 }}
        onBackdropPress={toggleOverlay}
      >
        <Body1>{`Êtes vous sûre de vouloir supprimer le ${startsWithVowel(
          hostFamilyDetails.firstName
        )} ?`}</Body1>
        <Body1>
          Ce choix sera <TextRed>irréversible.</TextRed>
        </Body1>
        <Spacing size="8" />
        <Divider />
        <Spacing size="8" />
        <ContainerButton>
          <TouchableOpacity onPress={() => deleteHostFamily()}>
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
