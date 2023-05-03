import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { QueryClient, useMutation } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Button, Divider, Image as ImageElement } from 'react-native-elements'
import { updateAnimalById } from 'src/client/Animal'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { Body1 } from 'src/components/Typo'
import { CardStyle, ContainerStyle } from 'src/constant/Theme/Styled'
import { AnimalType } from 'src/types/Animal/Type'
import { AnimalRouteParams } from '../../Router/type'

export const UpdateAnimalPhoto = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const [image, setImage] = useState(null)
  const [imagePush, setImagePush] = useState(null)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  useEffect(() => {
    const getGalleryPermission = async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted')
    }
    getGalleryPermission()
  }, [])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    // console.log(result)
    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setImagePush(result.assets[0])
    }
  }

  const queryClient = new QueryClient()

  const mutation = useMutation({
    mutationFn: updateAnimalById,
    onSuccess: (data) => {
      navigation.navigate('animalScreen')
      queryClient.setQueryData(['animal', { id: animalDetails.id }], (oldData: AnimalType) =>
        oldData
          ? {
              ...oldData,
              pictures: {
                ...oldData.pictures,
                data,
              },
            }
          : oldData
      )
      queryClient.invalidateQueries(['animals'])
      SnackbarToastComponent({
        title: 'La modification a bien été prise en compte',
      })
    },
    onError: (err) => {
      SnackbarToastComponent({
        type: 'error',
        title: 'Erreur',
      })
      console.log('err', err)
    },
  })

  const updateAnimalPhoto = () => {
    const picture = {
      filename: 'imagerieee',
      height: imagePush.height,
      id: `${animalDetails.id}aaa`,
      size: imagePush.fileSize,
      thumbnails: [],
      type: imagePush.type,
      url: imagePush.uri,
    }
    if (imagePush) {
      mutation.mutateAsync(picture)
    }
  }

  const renderPictures = () => {
    return animalDetails.pictures.map((picture, key) => {
      return (
        <View key={`pictureEdit_${key}`} style={{ paddingTop: 8 }}>
          <ImageElement
            source={{ uri: picture.url }}
            style={{ width: 150, height: 150, borderRadius: 8 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
      )
    })
  }

  const resetPicture = () => {
    setImagePush('')
    setImage('')
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier les photos de ${animalDetails.name}`}
      />
      <ContainerStyle>
        <CardStyle>
          {hasGalleryPermission ? (
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              >
                {renderPictures()}
              </View>
              <Spacing size="16" />
              {!imagePush ? (
                <Button title="Ajouter une photo" onPress={pickImage} />
              ) : (
                <Divider width={2} />
              )}
              {image && (
                <View style={{ alignItems: 'center' }}>
                  <Spacing size="16" />
                  <ImageElement
                    source={{ uri: image }}
                    style={{ width: 200, height: 200, borderRadius: 8 }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
              )}
              {imagePush && (
                <>
                  <Spacing size="16" />
                  <Button title="Valider l'image" onPress={updateAnimalPhoto} />
                  <Spacing size="8" />
                  <Button title="Supprimer l'image" onPress={resetPicture} />
                </>
              )}
            </>
          ) : (
            <Body1 textAlign="center">
              Vous devez tout d'abord accepter l'autorisation pour envoyer des images
            </Body1>
          )}
        </CardStyle>
      </ContainerStyle>
    </Layout>
  )
}
