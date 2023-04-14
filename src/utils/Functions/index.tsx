import moment from 'moment'
import 'moment/locale/fr'
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
