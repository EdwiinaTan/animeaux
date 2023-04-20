import { Skeleton } from '@rneui/themed'
import { Body1 } from 'src/components/Typo'
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

export const renderHostFamily = (statusHostFamily, hostFamilyData: HostFamilyType) => {
  switch (statusHostFamily) {
    case FetchStatus.ERROR:
      return <Body1>Pas de FA</Body1>
    case FetchStatus.LOADING:
      return <Skeleton animation="pulse" width={200} height={12} />
    case FetchStatus.SUCCESS:
      return (
        <Body1>
          FA : {hostFamilyData.firstName} {hostFamilyData.lastName}
        </Body1>
      )
    default:
      return <Body1>Pas de FA</Body1>
  }
}
