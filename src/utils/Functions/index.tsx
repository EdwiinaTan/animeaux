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
