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
  inputDate: {
    width: '86%',
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

export const ContainerCalendar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
