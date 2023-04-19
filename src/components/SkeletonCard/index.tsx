import { Skeleton } from '@rneui/themed'
import { Card } from 'react-native-elements'
import { ContainerImage, Description } from 'src/containers/Home/Animal/Card/Styled'
import { Spacing } from '../Layout/Spacing'
import { Container } from './Styled'

export const SkeletonCard = () => {
  return (
    <Card
      containerStyle={{
        borderRadius: 8,
        borderColor: 'transparent',
        position: 'relative',
      }}
    >
      <Container>
        <ContainerImage>
          <Skeleton animation="pulse" width={100} height={100} style={{ borderRadius: 8 }} />
        </ContainerImage>
        <Description>
          <Skeleton animation="pulse" width={200} height={12} />
          <Spacing size="4" />
          <Skeleton animation="pulse" width={200} height={12} />
          <Spacing size="4" />
          <Skeleton animation="pulse" width={200} height={12} />
          <Spacing size="4" />
          <Skeleton animation="pulse" width={200} height={12} />
        </Description>
      </Container>
    </Card>
  )
}
