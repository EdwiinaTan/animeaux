import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AWS from 'aws-sdk'
import { ACCESS_KEY, BUCKET_NAME, BUCKET_REGION, SECRET_ACCESS_KEY } from 'config'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Button, Image as ImageElement } from 'react-native-elements'
import { updateAnimalById } from 'src/client/Animal'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { Body1 } from 'src/components/Typo'
import { CardStyle, ContainerStyle } from 'src/constant/Theme/Styled'
import { UserType } from 'src/types/User/Type'
import { v4 as uuidv4 } from 'uuid'
import { ProfileRouteParams } from '../../Router/type'

export const UpdateProfilePhoto = () => {
  const route = useRoute<RouteProp<ProfileRouteParams>>()
  const {
    params: { user },
  } = route as { params: { user: UserType } }
  const navigation = useNavigation<NativeStackNavigationProp<ProfileRouteParams>>()
  const [image, setImage] = useState(null)
  const [imagePush, setImagePush] = useState(null)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [imageAws, setImageAws] = useState<any>()
  const [getUuid, setGetUuid] = useState('')
  const queryClient = useQueryClient()

  // Configurer les informations d'identification AWS
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: BUCKET_REGION,
  })

  // Créer l'instance d'AWS bucket S3
  const s3 = new AWS.S3()

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

    if (!result.canceled) {
      const key = uuidv4()

      const response = await fetch(result.assets[0].uri)
      const blob = await response.blob()

      setImage(result.assets[0].uri)
      setImagePush(result.assets[0])

      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: blob,
        ContentType: 'image/jpeg',
      }
      setGetUuid(key)

      // Envoi un POST pour uploader l'objet
      s3.putObject(uploadParams, function (err, data) {
        if (err) {
          console.log('Error uploading file:', JSON.stringify(err))
        } else {
          console.log('File uploaded successfully:', JSON.stringify(data))
        }
      })
    }
  }

  const resetPicture = () => {
    setImagePush('')
    setImage('')
    setImageAws('')

    const params = {
      Bucket: BUCKET_NAME,
      Key: getUuid,
    }

    // Supprimer l'objet dans le bucket s3
    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log('Error deleting object:', err)
      } else {
        console.log('Object deleted successfully:', data)
      }
    })
  }

  const resetPictureByPicture = () => {
    setImagePush('')
    setImage('')
    setImageAws('')
    const data = {
      picture: [{ url: '' }],
    }
    mutation.mutateAsync({ id: user.id, values: data })
  }

  const getPicture = async () => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: getUuid,
    }
    // Récupérer l'objet avec le lien url d'aws
    s3.getSignedUrlPromise('getObject', params)
      .then((url) => {
        setImageAws(url)
        console.log(`L'URL signée pour l'objet est : ${url}`)
      })
      .catch((err) => {
        console.log(`Erreur lors de la génération de l'URL signée pour l'objet: ${err}`)
      })
  }

  const mutation = useMutation({
    mutationFn: updateAnimalById,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', { id: user.id }], (oldData: UserType) =>
        oldData
          ? {
              ...oldData,
              picture: {
                ...oldData.picture,
                data,
              },
            }
          : oldData
      )
      queryClient.invalidateQueries({ queryKey: ['getUserToken'] })
      queryClient.invalidateQueries({ queryKey: ['user', user.id] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
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
    const data = {
      picture: [{ url: imageAws }],
    }
    mutation.mutateAsync({ id: user.id, values: data })
    navigation.navigate('profileScreen')
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={onClickGoBack} title="Éditer ma photo" />
      <ContainerStyle>
        <CardStyle>
          {hasGalleryPermission ? (
            <>
              {user && user.picture && user.picture[0] && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <View key={`pictureEdit_${user.id}`} style={{ paddingTop: 8 }}>
                    <ImageElement
                      source={{ uri: user.picture[0].url }}
                      style={{ width: 150, height: 150, borderRadius: 8 }}
                      PlaceholderContent={<ActivityIndicator />}
                    />
                  </View>
                </View>
              )}
              {/* <Spacing size="16" /> */}
              {!imagePush && !user.picture && (
                <Button title="Ajouter une photo" onPress={pickImage} />
              )}
              {user.picture && (
                <Button title="Supprimer la photo" onPress={resetPictureByPicture} />
              )}
              {image && (
                <View style={{ alignItems: 'center' }}>
                  <ImageElement
                    source={{ uri: image }}
                    style={{ width: 200, height: 200, borderRadius: 8 }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
              )}
              {imagePush && !imageAws && (
                <>
                  <Spacing size="16" />
                  <Button title="Êtes-vous sûre d'utiliser cette photo ?" onPress={getPicture} />
                  <Spacing size="16" />
                </>
              )}
              {imagePush && !imageAws && (
                <>
                  <Spacing size="8" />
                  <Button title="Supprimer l'image" onPress={resetPicture} />
                </>
              )}
              {imageAws && (
                <>
                  <Spacing size="16" />
                  <Button title="Valider l'image" onPress={updateAnimalPhoto} />
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
