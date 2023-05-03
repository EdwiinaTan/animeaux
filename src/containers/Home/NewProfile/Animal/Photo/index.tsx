import AWS from 'aws-sdk'
import { ACCESS_KEY, BUCKET_NAME, BUCKET_REGION, SECRET_ACCESS_KEY } from 'config'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Button, Image as ImageElement } from 'react-native-elements'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1 } from 'src/components/Typo'
import { CardStyle } from 'src/constant/Theme/Styled'
import { v4 as uuidv4 } from 'uuid'
import { AnimalPhotoProps } from './Type'

export const AddAnimalPhoto: React.FC<AnimalPhotoProps> = ({ getImage, setGetImage }) => {
  const [image, setImage] = useState(null)
  const [imagePush, setImagePush] = useState(null)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [getUuid, setGetUuid] = useState('')

  // Configurer les informations d'identification AWS
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: BUCKET_REGION,
  })

  // Créer l'instance d'AWS bucket S3
  const s3 = new AWS.S3()

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
      // console.log('blob', blob)

      setImage(result.assets[0].uri)
      setImagePush(result.assets[0])
      // setGetImage(result.assets[0])

      // Configurer les options de l'objet à uploader
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: blob,
        ContentType: 'image/jpeg',
      }
      setGetUuid(key)

      // console.log('uploadParams', uploadParams)
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

  const getPicture = async () => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: getUuid,
    }
    // Récupérer l'objet avec le lien url d'aws
    s3.getSignedUrlPromise('getObject', params)
      .then((url) => {
        setGetImage(url)
        console.log(`L'URL signée pour l'objet est : ${url}`)
      })
      .catch((err) => {
        console.log(`Erreur lors de la génération de l'URL signée pour l'objet: ${err}`)
      })
  }

  const resetPicture = () => {
    setImagePush('')
    setImage('')
    setGetImage('')

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

  return (
    <CardStyle>
      {hasGalleryPermission ? (
        <>
          {!imagePush && <Button title="Ajouter une photo" onPress={pickImage} />}
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
              <Spacing size="8" />
              <Button title="Êtes-vous sûre d'utiliser cette photo ?" onPress={getPicture} />
            </>
          )}
          {imagePush && (
            <>
              <Spacing size="16" />
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
  )
}
