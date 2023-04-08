import { AnimalType } from 'src/types/Animal/Type'

export interface BottomSheetProps {
  bottomSheetModalRef: React.MutableRefObject<any>
  params: {
    animalDetails: AnimalType
  }
}
