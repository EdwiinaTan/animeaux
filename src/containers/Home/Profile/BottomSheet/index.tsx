import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import { ListItem } from 'react-native-elements'
import { updateUserById } from 'src/client/User'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { Title3 } from 'src/components/Typo'
import { IconAntDesign, IconFoundation, IconMaterialIcons } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { AuthContext } from 'src/containers/App/AuthContext'
import { useGetUserByToken } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
import { ProfileRouteParams } from '../Router/type'
import { ListView } from './Styled'
import { BottomSheetProps } from './Type'

export const BottomSheetProfile: React.FC<BottomSheetProps> = ({ bottomSheetModalRef }) => {
  const snapPoints = ['30%']
  const navigation = useNavigation<NativeStackNavigationProp<ProfileRouteParams>>()
  const { logoutUser, userToken, setUserToken } = useContext(AuthContext)
  const { statusTokenUser, userDataToken } = useGetUserByToken(userToken)
  const queryClient = useQueryClient()

  const handleViewEditProfile = (): void => {
    bottomSheetModalRef.current.close()
    navigation.navigate('userUpdate')
  }

  const handleViewEditPhoto = (): void => {
    bottomSheetModalRef.current.close()
    navigation.navigate('updateProfilePhoto', {
      user: userDataToken,
    })
  }

  const handleViewUsers = (): void => {
    bottomSheetModalRef.current.close()
    navigation.navigate('usersScreen')
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
    mutationFn: updateUserById,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', { id: userDataToken.id }], data)
      queryClient.invalidateQueries({ queryKey: ['user', userDataToken.id] })
      // queryClient.invalidateQueries({ queryKey: ['getUserToken'] })
      // queryClient.invalidateQueries({ queryKey: ['getUserToken', userDataToken.id] })
      // queryClient.invalidateQueries({ queryKey: ['users'] })
      AsyncStorage.removeItem('userToken')
      SnackbarToastComponent({ type: 'info', title: 'À bientôt ! 👋' })
      // setUserToken('')
    },
    onError: (err) => {
      SnackbarToastComponent({
        type: 'error',
        title: 'Erreur',
      })
      console.log('err', err)
    },
  })

  const logout = () => {
    bottomSheetModalRef.current.close()
    logoutUser()
    navigation.navigate('loginHomeScreen')
    const data = {
      firstName: userDataToken.firstName,
      lastName: userDataToken.lastName,
      email: userDataToken.email,
      phone: userDataToken.phone,
      picture: userDataToken.picture,
      animalId: userDataToken.animalId,
      token: '',
    }
    mutation.mutateAsync({ id: userDataToken.id, values: data })
  }

  const listBottomSheet = [
    {
      name: 'Voir la liste des bénévoles',
      icon: <IconAntDesign name="profile" size={20} style={{ paddingRight: 16 }} />,
      press: handleViewUsers,
      chevron: true,
    },
    {
      name: 'Éditer mon profil',
      icon: <IconAntDesign name="edit" size={20} style={{ paddingRight: 16 }} />,
      press: handleViewEditProfile,
      chevron: true,
    },
    {
      name: 'Éditer ma photo',
      icon: <IconFoundation name="photo" size={20} style={{ paddingRight: 16 }} />,
      press: handleViewEditPhoto,
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
      press: logout,
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
      <>
        {statusTokenUser === FetchStatus.LOADING ? (
          <ActivityIndicator size="large" color={theme.colors.blue} />
        ) : (
          <ListView>
            {listBottomSheet.map((list, key) => (
              <ListItem
                key={`${list.name}_${key}`}
                onPress={list.press}
                bottomDivider={list.chevron}
              >
                {list.icon}
                <ListItem.Content>
                  <ListItem.Title>{list.name}</ListItem.Title>
                </ListItem.Content>
                {list.chevron === true && <ListItem.Chevron />}
              </ListItem>
            ))}
          </ListView>
        )}
      </>
    </BottomSheetModal>
  )
}
