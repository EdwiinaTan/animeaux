import { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CardAnimal } from 'src/components/Card/Animal'
import { HeaderComponent } from 'src/components/Header'
import { ImageProfile } from 'src/components/ImageProfile'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1, Body2, Body3, Title1 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetUserById } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
import {
  Container,
  ContainerDescription,
  ContainerHeader,
  ContainerImage,
  Description,
  HeaderInner,
  UserHeader,
} from './Styled'

export const Profile = () => {
  const { statusUser, userData } = useGetUserById('recVdZUQrD2QGM9ML')
  const [currentIndex, setCurrentIndex] = useState(0)

  const onClickPage = (index: number) => {
    setCurrentIndex(index)
  }

  // bottomSheet edit/déconnexion + système de note
  return (
    <Layout>
      <HeaderComponent title="Mon profil" />
      {statusUser === FetchStatus.LOADING ? (
        <ActivityIndicator size="large" color={theme.colors.blue} />
      ) : (
        <Container>
          <UserHeader>
            <ContainerImage>
              <ImageProfile picture={userData.picture} />
              <Body3>{userData.email}</Body3>
            </ContainerImage>
            <ContainerDescription>
              <Description>
                <Spacing size="64" />
                <ContainerHeader>
                  <HeaderInner>
                    <TouchableOpacity onPress={() => onClickPage(0)}>
                      <Body1
                        textAlign="center"
                        lineHeight={0}
                        color={currentIndex === 0 ? theme.colors.blue : theme.colors.black}
                      >
                        {userData.animalId.length}
                      </Body1>
                      <Body2
                        textAlign="center"
                        lineHeight={0}
                        color={currentIndex === 0 ? theme.colors.blue : theme.colors.black}
                      >
                        En charge{userData.animalId.length > 1 ? 's' : ''}
                      </Body2>
                    </TouchableOpacity>
                  </HeaderInner>
                  <HeaderInner>
                    <TouchableOpacity onPress={() => onClickPage(1)}>
                      <Body1
                        textAlign="center"
                        lineHeight={0}
                        color={currentIndex === 1 ? theme.colors.blue : theme.colors.black}
                      >
                        8
                      </Body1>
                      <Body2
                        textAlign="center"
                        lineHeight={0}
                        color={currentIndex === 1 ? theme.colors.blue : theme.colors.black}
                      >
                        Notes
                      </Body2>
                    </TouchableOpacity>
                  </HeaderInner>
                </ContainerHeader>
              </Description>
            </ContainerDescription>
            <Spacing size="16" />
          </UserHeader>
          {userData && userData.animalId && userData.animalId.length !== 0 && currentIndex === 0 ? (
            <CardAnimal listItem={userData.animalId} />
          ) : (
            <Title1 textAlign="center">NOTES</Title1>
          )}
        </Container>
      )}
    </Layout>
  )
}
