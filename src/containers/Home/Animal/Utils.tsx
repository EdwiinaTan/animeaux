import { Skeleton } from '@rneui/themed'
import { Text } from 'react-native'
import { IconMaterialCommunityIcons } from 'src/constant/Icons'
import { AnimalGenderEnum } from 'src/types/Animal/enum'
import { AnimalType } from 'src/types/Animal/Type'
import { HostFamilyType } from 'src/types/HostFamily/Type'

export const renderAnimalGender = (animal: AnimalType) => {
  if (animal.gender === AnimalGenderEnum.FEMALE) {
    return <IconMaterialCommunityIcons name="gender-female" size={18} color="#F2887E" />
  }
  return <IconMaterialCommunityIcons name="gender-male" size={16} color="#3376BA" />
}

export const renderHostFamily = (statusHostFamily, hostFamilyData: HostFamilyType) => {
  switch (statusHostFamily) {
    case 'error':
      return <Text>Pas de FA</Text>
    case 'loading':
      return <Skeleton animation="pulse" width={200} height={12} />
    case 'success':
      return (
        <Text>
          FA : {hostFamilyData.firstname} {hostFamilyData.lastname}
        </Text>
      )
    default:
      return <Text>Pas de FA</Text>
  }
}
