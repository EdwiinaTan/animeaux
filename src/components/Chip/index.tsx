import { Chip } from 'react-native-elements'
import { theme } from 'src/constant/Theme'
import { uppercaseWord } from 'src/utils/Functions'
import { ChipComponentProp } from './Type'

export const ChipComponent: React.FC<ChipComponentProp> = ({ value }) => {
  return (
    <Chip
      titleStyle={{ color: theme.lightColors?.black }}
      title={uppercaseWord(value)}
      buttonStyle={{
        borderColor: theme.lightColors?.black,
        padding: 4,
      }}
      type="outline"
    />
  )
}
