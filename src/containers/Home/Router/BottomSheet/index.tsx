import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback } from 'react'
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Spacing } from 'src/components/Layout/Spacing'
import { AddRouteParams } from '../Type'
import { BottomSheetRouterProps } from './Type'

export const BottomSheetAdd: React.FC<BottomSheetRouterProps> = ({ bottomSheetModalRef }) => {
  const snapPoints = ['35%']
  const navigation = useNavigation<NativeStackNavigationProp<AddRouteParams>>()

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    []
  )

  const onClickAddAnimal = () => {
    bottomSheetModalRef.current.close()
    navigation.navigate('addAnimal')
  }

  const onClickAddHostFamily = () => {
    bottomSheetModalRef.current.close()
    navigation.navigate('addHostFamily')
  }

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 40 }}>
        <TouchableOpacity onPress={onClickAddAnimal}>
          <Image
            source={require('../../../../../assets/icons/animal-shelter.png')}
            style={{ width: 100, height: 100 }}
          />
          <Spacing size="8" />
          <Text style={{ textAlign: 'center' }}>Ajouter</Text>
          <Text style={{ textAlign: 'center' }}>un animal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickAddHostFamily}>
          <Image
            source={require('../../../../../assets/icons/home.png')}
            style={{ width: 100, height: 100 }}
          />
          <Spacing size="8" />
          <Text style={{ textAlign: 'center' }}>Ajouter </Text>
          <Text style={{ textAlign: 'center' }}>Une famille </Text>
          <Text style={{ textAlign: 'center' }}> d'accueil</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  )
}
