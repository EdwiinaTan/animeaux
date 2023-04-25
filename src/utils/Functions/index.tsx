import { Skeleton } from '@rneui/themed'
import moment from 'moment'
import 'moment/locale/fr'
import { Body1 } from 'src/components/Typo'
import { IconMaterialCommunityIcons } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { AnimalGenderEnum } from 'src/types/Animal/enum'
import { AnimalType } from 'src/types/Animal/Type'
import { HostFamilyType } from 'src/types/HostFamily/Type'
import { FetchStatus } from 'src/types/Status'
moment.locale('fr')

export const uppercaseWord = (word: string): string => {
  return word && word.charAt(0).toUpperCase() + word.slice(1)
}

export const renderDateFormat = (date: string): string => {
  return uppercaseWord(moment(date).format('dddd LL'))
}

export const renderDateFormatL = (date: string): string => {
  return uppercaseWord(moment(date).format('L'))
}

export const startsWithVowel = (word: string): string => {
  const vowels = 'aeiouAEIOU'

  if (vowels.indexOf(word[0]) !== -1) {
    return `profil d’${word}`
  }
  return `profil de ${word}`
}

export const animalAge = (birthday: string): string => {
  let date = ''
  const dateA = moment(new Date())
  const dateB = moment(birthday)
  dateA.diff(dateB, 'years') === 1 ? (date = 'an') : (date = 'ans')

  if (dateA.diff(dateB, 'years') === 0) {
    return `${dateA.diff(dateB, 'month')} mois`
  }
  return `${dateA.diff(dateB, 'years')} ${date}`
}

export const waitTimeOut = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export const formatPhoneNumber = (phoneNumber: string) => {
  phoneNumber = phoneNumber.replace(/\D/g, '')
  if (phoneNumber == '' || phoneNumber == null) {
    return ''
  }
  const formattedPhoneNumber = phoneNumber.replace(
    /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
    '$1 $2 $3 $4 $5'
  )
  return formattedPhoneNumber
}

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
