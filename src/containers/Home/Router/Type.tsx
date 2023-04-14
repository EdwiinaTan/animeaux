import { BottomSheetModal } from '@gorhom/bottom-sheet'

export interface BottomSheetRouterProps {
  bottomSheetModalRef: BottomSheetModal
  changeAdd: (value: string) => void
}

export type AddRouteParams = {
  addAnimal: undefined
  addHostFamily: undefined
}

export type RouteParams = {
  animal: undefined
  hostFamily: undefined
  add: undefined
  information: undefined
  profile: undefined
}
