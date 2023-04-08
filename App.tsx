import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { ThemeProvider } from '@rneui/themed'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { theme } from 'src/constant/Theme'
import { AppContainer } from 'src/containers/App'

const queryClient = new QueryClient()

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BottomSheetModalProvider>
          <AppContainer />
        </BottomSheetModalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
