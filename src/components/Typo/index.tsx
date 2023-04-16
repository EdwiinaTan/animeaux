import { StyleSheet, Text } from 'react-native'
import { BodyProps, TypoProps } from './Type'

const StyleBody1 = StyleSheet.create({
  content: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
})

export const Body1: React.FC<BodyProps & TypoProps> = ({ children, ...styles }) => {
  const textStyle = [StyleBody1.content, styles]
  return <Text style={textStyle}>{children}</Text>
}
