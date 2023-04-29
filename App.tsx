import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'react-native-elements'
import { theme } from 'src/constant/Theme'
import { AppContainer } from 'src/containers/App'
import AuthProvider from 'src/containers/App/AuthContext'

const queryClient = new QueryClient()

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BottomSheetModalProvider>
          <AuthProvider>
            <AppContainer />
          </AuthProvider>
        </BottomSheetModalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
