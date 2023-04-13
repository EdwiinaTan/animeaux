import { Chip } from 'react-native-elements'
import { theme } from 'src/constant/Theme'
import { uppercaseWord } from 'src/utils/Functions'
import { ChipComponentProp } from './Type'

export const ChipComponent: React.FC<ChipComponentProp> = ({ value }) => {
  return (
    <Chip
      titleStyle={{ color: theme.colors.black }}
      title={uppercaseWord(value)}
      buttonStyle={{
        borderColor: theme.colors.black,
        padding: 4,
      }}
      type="outline"
    />
  )
}
