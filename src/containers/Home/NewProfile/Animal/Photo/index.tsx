import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Button, Image as ImageElement } from 'react-native-elements'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1 } from 'src/components/Typo'
import { CardStyle } from 'src/constant/Theme/Styled'

interface test {
  getImage: any
  setGetImage: any
}

export const AddAnimalPhoto: React.FC<test> = ({ getImage, setGetImage }) => {
  const [image, setImage] = useState(null)
  const [imagePush, setImagePush] = useState(null)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)

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
      setImage(result.assets[0].uri)
      setImagePush(result.assets[0])
      setGetImage(result.assets[0])
    }
  }

  const resetPicture = () => {
    setImagePush('')
    setImage('')
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
