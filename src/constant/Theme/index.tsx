import { createTheme } from '@rneui/themed'

export const theme = createTheme({
  lightColors: {
    primary: '#55BCBE',
    secondary: 'transparent',
    white: '#ffffff',
    background: '#F1F5F9',
    black: '#000000',
    success: '#9BCF9B',
    greyOutline: '#D8DDE3',
    grey0: '#F7C549',
    grey1: '#DA4133',
    grey2: '#3376BA',
    grey3: '#5CB25B',
    grey4: '#dce1e7',
  },
  mode: 'light',
  components: {
    Button: {
      raised: true,
    },
    Text: {
      style: {},
    },
  },
})
