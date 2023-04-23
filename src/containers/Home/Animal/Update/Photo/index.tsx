import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { QueryClient, useMutation } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { Button } from 'react-native-elements'
import { updateAnimalByIdTest } from 'src/client/Animal'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Body1 } from 'src/components/Typo'
import { AnimalType } from 'src/types/Animal/Type'
import { AnimalRouteParams } from '../../Router/type'

export const AnimalPhoto = () => {
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
      base64: true,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setImagePush(result.assets[0])
    }
  }

  const queryClient = new QueryClient()

  const mutation = useMutation({
    mutationFn: updateAnimalByIdTest,
    onSuccess: (data) => {
      navigation.navigate('animalScreen')
      queryClient.setQueryData(['animals', { id: animalDetails.id }], (oldData: AnimalType) =>
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
    },
    onError: (err) => {
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

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier les photos de ${animalDetails.name}`}
      />
      {hasGalleryPermission ? (
        <>
          <Button title="VALIDER" onPress={updateAnimalPhoto} />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </View>
        </>
      ) : (
        <Body1 textAlign="center">
          Vous devez tout d'abord accepter l'autorisation pour envoyer des images
        </Body1>
      )}
    </Layout>
  )
}
