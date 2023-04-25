import { NoPictureSvg } from 'assets/svg/noPicture'
import { ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'
import { ImageProfileProps } from './Type'

export const ImageProfile: React.FC<ImageProfileProps> = ({ picture }) => {
  return picture ? (
    <Image
      source={{ uri: picture[0].url }}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
      }}
      PlaceholderContent={<ActivityIndicator />}
    />
  ) : (
    <NoPictureSvg />
  )
}
