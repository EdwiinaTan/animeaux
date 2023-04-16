import { Header } from 'react-native-elements'
import { theme } from 'src/constant/Theme'
import { Title1 } from '../Typo'
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
          backgroundColor: theme.colors.background,
        }}
      >
        <CustomLeft onClickGoBack={onClickGoBack} />
        <Title1 align="center">{title}</Title1>
        <CustomRight toggleOverlay={toggleOverlay} />
      </Header>
    </>
  )
}
