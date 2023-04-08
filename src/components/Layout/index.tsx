// import { ImageBackground } from 'react-native'
import { ContainerLayout } from './Styled'
import { LayoutProp } from './Type'

export const Layout: React.FC<LayoutProp> = ({ children }) => {
  return (
    // <ImageBackground
    //   source={require('src/components/Layout/background.png')}
    //   resizeMode={'contain'}
    //   style={{ width: '100%', height: '100%' }}
    // >
    <ContainerLayout>{children}</ContainerLayout>
    // </ImageBackground>
  )
}
