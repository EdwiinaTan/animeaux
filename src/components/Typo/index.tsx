import { Text } from 'react-native'
import { StyleBody1, StyleBody2, StyleBody3, StyleTitle1, StyleTitle2, StyleTitle3 } from './Styled'
import { BodyProps, TypoProps } from './Type'

export const Title1: React.FC<BodyProps & TypoProps> = ({ children, ...styles }) => {
  const textStyle = [StyleTitle1.content, styles]
  return <Text style={textStyle}>{children}</Text>
}

export const Title2: React.FC<BodyProps & TypoProps> = ({ children, ...styles }) => {
  const textStyle = [StyleTitle2.content, styles]
  return <Text style={textStyle}>{children}</Text>
}

export const Title3: React.FC<BodyProps & TypoProps> = ({ children, ...styles }) => {
  const textStyle = [StyleTitle3.content, styles]
  return <Text style={textStyle}>{children}</Text>
}

export const Body1: React.FC<BodyProps & TypoProps> = ({ children, ...styles }) => {
  const textStyle = [StyleBody1.content, styles]
  return <Text style={textStyle}>{children}</Text>
}

export const Body2: React.FC<BodyProps & TypoProps> = ({ children, ...styles }) => {
  const textStyle = [StyleBody2.content, styles]
  return <Text style={textStyle}>{children}</Text>
}

export const Body3: React.FC<BodyProps & TypoProps> = ({ children, ...styles }) => {
  const textStyle = [StyleBody3.content, styles]
  return <Text style={textStyle}>{children}</Text>
}
