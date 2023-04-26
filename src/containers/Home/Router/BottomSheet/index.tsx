import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AnimalShelterSvg } from 'assets/svg/animalShelter'
import { HostFamilySvg } from 'assets/svg/hostFamily'
import { useCallback } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Spacing } from 'src/components/Layout/Spacing'
import { Title2 } from 'src/components/Typo'
import { AddRouteParams } from '../Type'
import { BottomSheetRouterProps } from './Type'

export const BottomSheetAdd: React.FC<BottomSheetRouterProps> = ({ bottomSheetModalRef }) => {
  const snapPoints = ['37%']
  const navigation = useNavigation<NativeStackNavigationProp<AddRouteParams>>()

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
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

  const onClickAddAnimal = (): void => {
    bottomSheetModalRef.current.close()
    navigation.navigate('addAnimal')
  }

  const onClickAddHostFamily = (): void => {
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
          <AnimalShelterSvg />
          <Spacing size="8" />
          <Title2 textAlign="center">Ajouter</Title2>
          <Title2 textAlign="center">un animal</Title2>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickAddHostFamily}>
          <HostFamilySvg />
          <Spacing size="8" />
          <Title2 textAlign="center">Ajouter </Title2>
          <Title2 textAlign="center">une famille </Title2>
          <Title2 textAlign="center">d'accueil</Title2>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  )
}
