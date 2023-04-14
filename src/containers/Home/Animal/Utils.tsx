import { Skeleton } from '@rneui/themed'
import { Text } from 'react-native'
import { IconMaterialCommunityIcons } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { AnimalGenderEnum } from 'src/types/Animal/enum'
import { AnimalType } from 'src/types/Animal/Type'
import { HostFamilyType } from 'src/types/HostFamily/Type'
import { FetchStatus } from 'src/types/Status'

export const renderAnimalGender = (animal: AnimalType) => {
  if (animal.gender === AnimalGenderEnum.FEMALE) {
    return <IconMaterialCommunityIcons name="gender-female" size={18} color={theme.colors.red} />
  }
  return <IconMaterialCommunityIcons name="gender-male" size={16} color={theme.colors.blue} />
}

export const renderHostFamily = (statusHostFamily: FetchStatus, hostFamilyData: HostFamilyType) => {
  switch (statusHostFamily) {
    case FetchStatus.ERROR:
      return <Text>Pas de FA</Text>
    case FetchStatus.LOADING:
      return <Skeleton animation="pulse" width={200} height={12} />
    case FetchStatus.SUCCESS:
      return (
        <Text>
          FA : {hostFamilyData.firstname} {hostFamilyData.lastname}
        </Text>
      )
    default:
      return <Text>Pas de FA</Text>
  }
}
