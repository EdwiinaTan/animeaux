import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useContext, useRef } from 'react'
import { ActivityIndicator } from 'react-native'
import { HeaderComponent } from 'src/components/Header'
import { ImageProfile } from 'src/components/ImageProfile'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body2, Body3 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { AuthContext } from 'src/containers/App/AuthContext'
import { useGetUserByToken } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
import { formatPhoneNumber } from 'src/utils/Functions'
import { BottomSheetProfile } from './BottomSheet'
import {
  Container,
  ContainerDescription,
  ContainerHeader,
  ContainerImage,
  Description,
  Header,
  UserHeader,
} from './Styled'

export const Profile = () => {
  const { userToken } = useContext(AuthContext)
  const { statusTokenUser, userDataToken } = useGetUserByToken(userToken)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present()
  }

  // const renderListAnimal = () => {
  //   if (userDataToken && userDataToken.animalId && userDataToken.animalId.length !== 0) {
  //     return <CardAnimal listItem={userDataToken.animalId} />
  //   }
  // }

  return (
    <Layout>
      <>
        <HeaderComponent title="Mon profil" toggleOverlay={handlePresentModal} />
        {statusTokenUser === FetchStatus.LOADING ? (
          <ActivityIndicator size="large" color={theme.colors.blue} />
        ) : (
          <Container>
            <UserHeader>
              <ContainerImage>
                <ImageProfile picture={userDataToken.picture} />
                <Body3>
                  {userDataToken.firstName} {userDataToken.lastName}
                </Body3>
                <Body3 color={theme.colors.grey2}>{formatPhoneNumber(userDataToken.phone)}</Body3>
                <Body3>{userDataToken.email}</Body3>
              </ContainerImage>
              <ContainerDescription>
                <Description>
                  <Spacing size="64" />
                  <ContainerHeader>
                    <Header>
                      <Body2 textAlign="center" lineHeight={0}>
                        En charge
                        {userDataToken.animalId && userDataToken.animalId.length > 1
                          ? 's'
                          : ''} : {(userDataToken.animalId && userDataToken.animalId.length) || 0}
                      </Body2>
                    </Header>
                  </ContainerHeader>
                </Description>
              </ContainerDescription>
              <Spacing size="8" />
            </UserHeader>
            {/* {renderListAnimal()} */}
          </Container>
        )}
        <BottomSheetProfile bottomSheetModalRef={bottomSheetModalRef} />
      </>
    </Layout>
  )
}
