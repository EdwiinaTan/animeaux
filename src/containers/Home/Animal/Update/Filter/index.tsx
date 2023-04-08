import { Text } from 'react-native'
import { Spacing } from 'src/components/Layout/Spacing'
import { FilterUpdateAnimalProps } from './Type'

export const ButtonGroupAnimal: React.FC<FilterUpdateAnimalProps> = ({ animalTest, title }) => {
  return (
    <>
      <Text>{title}</Text>
      <Spacing size="8" />
      {animalTest}
    </>
  )
}
