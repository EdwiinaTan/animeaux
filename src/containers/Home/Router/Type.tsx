export interface BottomSheetRouterProps {
  bottomSheetModalRef: React.MutableRefObject<any>
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
