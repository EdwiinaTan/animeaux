import { useRef } from 'react'
import { SearchBar } from 'react-native-elements'
import { theme } from 'src/constant/Theme'
import { Container } from './Styled'
import { SearchBarProps } from './Type'

export const SearchBarComponent: React.FC<SearchBarProps> = ({ search, setSearch, text }) => {
  const ref = useRef(null)
  const updateSearch = (text: string): void => {
    setSearch(text)
  }

  return (
    <Container>
      <SearchBar
        platform="android"
        onBlur={() => updateSearch}
        placeholder={`Rechercher ${text}`}
        autoCorrect={false}
        ref={ref}
        onChangeText={(text: string) => setSearch(text)}
        value={search || ''}
        inputContainerStyle={{
          height: 24,
        }}
        inputStyle={{ marginLeft: 8, fontSize: 16 }}
        containerStyle={{
          borderRadius: 8,
          padding: 4,
          borderWidth: 1,
          borderColor: theme.colors.grey1,
        }}
        searchIcon={{
          name: 'search',
          style: {
            marginLeft: 4,
          },
        }}
        cancelIcon={{
          name: 'search',
          style: {
            marginLeft: 4,
          },
        }}
        clearIcon={{
          name: 'close',
          style: {
            marginRight: 4,
          },
        }}
      />
    </Container>
  )
}
