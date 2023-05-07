import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useContext, useRef } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { CardAnimal } from 'src/components/Card/Animal'
import { HeaderComponent } from 'src/components/Header'
import { ImageProfile } from 'src/components/ImageProfile'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1, Body2, Body3 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { AuthContext } from 'src/containers/App/AuthContext'
import { useGetUserByToken } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
import { BottomSheetProfile } from './BottomSheet'
import { Container, ContainerDescription, ContainerImage, Description, UserHeader } from './Styled'

export const Profile = () => {
  const { userToken } = useContext(AuthContext)
  const { statusTokenUser, userDataToken } = useGetUserByToken(userToken)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present()
  }

  const renderListAnimal = () => {
    if (userDataToken && userDataToken.animalId && userDataToken.animalId.length !== 0) {
      return <CardAnimal listItem={userDataToken.animalId} />
    }
  }
  // console.log('zifhoifhze', userDataToken.phone)

  return (
    <Layout>
      <>
        <HeaderComponent title="Mon profil" toggleOverlay={handlePresentModal} />
        {statusTokenUser === FetchStatus.LOADING ? (
          <ActivityIndicator size="large" color={theme.colors.blue} />
        ) : (
          <ScrollView>
            <Container>
              <UserHeader>
                <ContainerImage>
                  <ImageProfile picture={userDataToken.picture} />
                  <Body2>
                    {userDataToken.firstName} {userDataToken.lastName}
                  </Body2>
                  {/* <Body3 color={theme.colors.grey2}>{userDataToken.phone}</Body3> */}
                  <Body3>{userDataToken.email}</Body3>
                </ContainerImage>
                <ContainerDescription>
                  <Description>
                    <Spacing size="64" />
                  </Description>
                </ContainerDescription>
              </UserHeader>
            </Container>
            {userDataToken && userDataToken.animalId && userDataToken.animalId.length > 0 && (
              <>
                <Spacing size="8" />
                <Body1 textAlign="center">
                  Animaux en charge ({userDataToken.animalId.length})
                </Body1>
                {renderListAnimal()}
              </>
            )}
          </ScrollView>
        )}
        <BottomSheetProfile bottomSheetModalRef={bottomSheetModalRef} />
      </>
    </Layout>
  )
}
