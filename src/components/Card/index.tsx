import { Card as CardElement } from 'react-native-elements'
import { CardProps } from './Type'

export const Card: React.FC<CardProps> = ({ key, children }) => {
  return (
    <CardElement
      key={key}
      containerStyle={{
        borderRadius: 8,
        borderColor: 'transparent',
        position: 'relative',
        marginTop: 1,
        marginBottom: 16,
      }}
    >
      {children}
    </CardElement>
  )
}
