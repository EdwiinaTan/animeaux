import Toast from 'react-native-toast-message'
import { SnackbarToastProps } from './Type'

export const SnackbarToastComponent = ({
  type = 'success', // error, info
  title,
  subTitle,
}: SnackbarToastProps) => {
  return Toast.show({
    type: type,
    text1: title,
    text2: subTitle,
    autoHide: true,
    visibilityTime: 2500,
    position: 'top',
    topOffset: 50,
  })
}
