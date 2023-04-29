import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useContext, useRef } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { CardAnimal } from 'src/components/Card/Animal'
import { HeaderComponent } from 'src/components/Header'
import { ImageProfile } from 'src/components/ImageProfile'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body2, Body3 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { AuthContext } from 'src/containers/App/AuthContext'
import { useGetUserById } from 'src/hooks/User'
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
  const { userId } = useContext(AuthContext)
  const { statusUser, userData } = useGetUserById(userId)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present()
  }

  return (
    <Layout>
      <>
        <HeaderComponent title="Mon profil" toggleOverlay={handlePresentModal} />
        {statusUser === FetchStatus.LOADING ? (
          <ActivityIndicator size="large" color={theme.colors.blue} />
        ) : (
          <Container>
            <UserHeader>
              <ContainerImage>
                <ImageProfile picture={userData.picture} />
                <Body3>
                  {userData.firstName} {userData.lastName}
                </Body3>
                <Body3 color={theme.colors.grey2}>{formatPhoneNumber(userData.phone)}</Body3>
                <Body3>{userData.email}</Body3>
              </ContainerImage>
              <ContainerDescription>
                <Description>
                  <Spacing size="64" />
                  <ContainerHeader>
                    <Header>
                      <Body2 textAlign="center" lineHeight={0}>
                        En charge{userData.animalId && userData.animalId.length > 1 ? 's' : ''} :{' '}
                        {(userData.animalId && userData.animalId.length) || 0}
                      </Body2>
                    </Header>
                  </ContainerHeader>
                </Description>
              </ContainerDescription>
              <Spacing size="8" />
            </UserHeader>
            <ScrollView>
              {userData.animalId && userData.animalId.length !== 0 && (
                <CardAnimal listItem={userData.animalId} />
              )}
            </ScrollView>
          </Container>
        )}
        <BottomSheetProfile bottomSheetModalRef={bottomSheetModalRef} />
      </>
    </Layout>
  )
}
