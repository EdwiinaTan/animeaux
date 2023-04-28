import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback, useContext } from 'react'
import { ListItem } from 'react-native-elements'
import { Title3 } from 'src/components/Typo'
import { IconAntDesign, IconMaterialIcons } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { AuthContext } from 'src/containers/App/AuthContext'
import { ProfileRouteParams } from '../Router/type'
import { ListView } from './Styled'
import { BottomSheetProps } from './Type'

export const BottomSheetProfile: React.FC<BottomSheetProps> = ({ bottomSheetModalRef }) => {
  const snapPoints = ['20%']
  const navigation = useNavigation<NativeStackNavigationProp<ProfileRouteParams>>()

  const { logoutUser, userId } = useContext(AuthContext)
  const handleViewEditProfile = (): void => {
    bottomSheetModalRef.current.close()
    navigation.navigate('userUpdate')
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

  const lalala = () => {
    console.log('userId', userId)
    logoutUser()
  }

  const listBottomSheet = [
    {
      name: 'Éditer mon profil',
      icon: <IconAntDesign name="profile" size={20} style={{ paddingRight: 16 }} />,
      press: handleViewEditProfile,
      chevron: true,
    },
    {
      name: <Title3 color={theme.colors.red}>Déconnexion</Title3>,
      icon: (
        <IconMaterialIcons
          name="logout"
          size={20}
          style={{ paddingRight: 16, color: theme.colors.red }}
        />
      ),
      press: lalala,
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
    </BottomSheetModal>
  )
}
