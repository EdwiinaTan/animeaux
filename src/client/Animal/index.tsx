import axios from 'axios'
import { AIRTABLE_APP_ID } from 'config'
import { header } from '../Utils'

export const getAnimals = async () => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/animal/`
  return await axios
    .get(url, {
      headers: header,
    })
    .then((result) => result.data.records)
    .catch((err) => {
      console.log('err', err)
      throw err
    })
}

export const postAnimal = async (data) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/animal/`
  return await axios
    .post(
      url,
      { fields: { ...data } },
      {
        headers: header,
      }
    )
    .then((result) => console.log('resu', result.data))
    .catch((err) => {
      console.log('err', err)
    })
}

export const getAnimalById = async (recordId: string) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/animal/${recordId}/`
  return await axios
    .get(url, {
      headers: header,
    })
    .then((result) => result.data.fields)
    .catch((err) => {
      console.log('err', err)
      throw err
    })
}

export const getAnimalByIdUser = async (userId: string) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/animal?filterByFormula=userId="${userId}"`
  return await axios
    .get(url, {
      headers: header,
    })
    .then((result) => {
      if (!result) {
        return 'err'
      } else {
        console.log('re', result.data.records)
        return result.data.records
      }
    })
    .catch((err) => {
      console.log('err', err)
      throw err
    })
}

export const deleteAnimalById = async (recordId: string) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/animal/${recordId}/`
  await axios
    .delete(url, {
      headers: header,
    })
    .catch((err) => {
      console.log('err', err)
    })
}

export const updateAnimalById = async (data) => {
  const { id, values } = data
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/animal/${id}/`
  return await axios
    .patch(
      url,
      {
        fields: {
          ...values,
        },
      },
      {
        headers: header,
      }
    )
    .catch((err) => {
      console.log('err', err)
    })
}
