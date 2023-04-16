import { StyleSheet } from 'react-native'
import { theme } from 'src/constant/Theme'
import styled from 'styled-components/native'

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 4,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.grey0,
  },
})

export const ContainerCheckbox = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const TextRed = styled.Text`
  color: ${theme.colors.red};
`
