import { SearchBar } from 'react-native-elements'
import { ContainerSearchBar } from './Styled'
import { SearchBarProps } from './Type'

export const SearchBarComponent: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  const updateSearch = (text: string): void => {
    setSearch(text)
  }

  return (
    <ContainerSearchBar>
      <SearchBar
        platform="android"
        onBlur={() => updateSearch}
        placeholder="Rechercher"
        onChangeText={(text: string) => setSearch(text)}
        value={search || ''}
        inputContainerStyle={{
          height: 24,
        }}
        inputStyle={{ marginLeft: 8, fontSize: 16 }}
        containerStyle={{
          borderRadius: 8,
          padding: 4,
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
    </ContainerSearchBar>
  )
}
