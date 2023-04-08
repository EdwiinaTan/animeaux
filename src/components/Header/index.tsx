import { Text } from 'react-native'
import { Header } from 'react-native-elements'
import { theme } from 'src/constant/Theme'
import { CustomLeft } from './CustomLeft'
import { CustomRight } from './CustomRight'
import { HeaderComponentProps } from './Type'

export const HeaderComponent: React.FC<HeaderComponentProps> = ({
  onClickGoBack,
  title,
  toggleOverlay,
}) => {
  return (
    <>
      <Header
        containerStyle={{
          backgroundColor: theme.lightColors?.background,
        }}
      >
        <CustomLeft onClickGoBack={onClickGoBack} />
        <Text style={{ fontSize: 24, textAlign: 'center' }}>{title}</Text>
        <CustomRight toggleOverlay={toggleOverlay} />
      </Header>
    </>
  )
}
