import { useRef } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { HeaderComponent } from 'src/components/Header'
import { ImageProfile } from 'src/components/ImageProfile'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1, Body2, Body3, Title1 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetUserById } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
import { UserAnimalInCharge } from './Animal'
import { Container, ContainerDescription, ContainerImage, Description, UserHeader } from './Styled'

export const Profile = () => {
  const { statusUser, userData } = useGetUserById('recVdZUQrD2QGM9ML')
  const listRef = useRef(null)

  return (
    <Layout>
      <HeaderComponent title="Mon profil" />
      {statusUser === FetchStatus.LOADING ? (
        <ActivityIndicator size="large" color={theme.colors.blue} />
      ) : (
        <Container>
          <UserHeader>
            <ContainerImage>
              <Spacing size="8" />
              <ImageProfile picture={userData.picture} />
              <Body3>{userData.email}</Body3>
            </ContainerImage>
            <ContainerDescription>
              <Description>
                <Spacing size="64" />
                <View
                  style={{
                    flexDirection: 'row',
                    width: '80%',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      alignContent: 'center',
                      width: '50%',
                    }}
                  >
                    <Body1 textAlign="center" lineHeight={0}>
                      8
                    </Body1>
                    <Body2 textAlign="center" lineHeight={0}>
                      En charge
                    </Body2>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      alignContent: 'center',
                      width: '50%',
                    }}
                  >
                    <Body1 textAlign="center" lineHeight={0}>
                      8
                    </Body1>
                    <Body2 textAlign="center" lineHeight={0}>
                      Notes
                    </Body2>
                  </View>
                </View>
              </Description>
            </ContainerDescription>
            <Spacing size="16" />
          </UserHeader>
          {userData && userData.animalId && userData.animalId.length !== 0 ? (
            <UserAnimalInCharge listItem={userData.animalId} />
          ) : (
            <Title1>Aucun animal en charge pour le moment</Title1>
          )}
        </Container>
      )}
    </Layout>
  )
}
