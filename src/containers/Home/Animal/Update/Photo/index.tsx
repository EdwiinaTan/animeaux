import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { Button } from 'react-native-elements'
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

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier les photos de ${animalDetails.name}`}
      />
      {hasGalleryPermission ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
      ) : (
        <Body1 textAlign="center">
          Vous devez tout d'abord accepter l'autorisation pour envoyer des images
        </Body1>
      )}
    </Layout>
  )
}
