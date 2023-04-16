import { Path, Svg } from 'react-native-svg'

export const AddressSvg = (): React.ReactElement => {
  return (
    <Svg width="30px" height="30px" viewBox="0 0 1024 1024">
      <Path
        d="M640 213.333333L384 128 128 213.333333v682.666667l256-85.333333 256 85.333333 256-85.333333V128z"
        fill="#FFECB3"
      />
      <Path d="M384 128v682.666667l256 85.333333V213.333333z" fill="#FFE082" />
      <Path
        d="M640 320c-82.496 0-149.333333 70.250667-149.333333 156.821333S640 768 640 768s149.333333-204.629333 149.333333-291.178667S722.496 320 640 320z"
        fill="#F44336"
      />
      <Path d="M640 469.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#FFEBEE" />
    </Svg>
  )
}
