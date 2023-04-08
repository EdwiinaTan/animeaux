import { View } from 'react-native'
import { CheckboxComponent } from 'src/components/Checkbox'
import { CheckboxesProps } from './Type'

export const Checkboxes: React.FC<CheckboxesProps> = ({ isActive, setIsActive }) => {
  return (
    // <ScrollView
    //   horizontal
    //   showsHorizontalScrollIndicator={false}
    //   style={{ paddingLeft: 6, marginRight: 16 }}
    // >
    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <CheckboxComponent title="Tous" isActive={isActive} setIsActive={setIsActive} name={'paw'} />
      <CheckboxComponent title="Chien" isActive={isActive} setIsActive={setIsActive} name={'dog'} />
      <CheckboxComponent title="Chat" isActive={isActive} setIsActive={setIsActive} name={'cat'} />
      <CheckboxComponent
        title="Rongeur"
        isActive={isActive}
        setIsActive={setIsActive}
        name={'rabbit'}
      />
      <CheckboxComponent
        title="Oiseau"
        isActive={isActive}
        setIsActive={setIsActive}
        name={'bird'}
      />
      <CheckboxComponent
        title="Reptile"
        isActive={isActive}
        setIsActive={setIsActive}
        name={'snake'}
      />
    </View>
  )
}
