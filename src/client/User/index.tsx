import axios from 'axios'
import { AIRTABLE_APP_ID } from 'config'
import { header } from '../Utils'

export const getUsers = async () => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/user/`
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

export const getUserById = async (recordId: string) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/user/${recordId}/`
  return await axios
    .get(url, {
      headers: header,
    })
    .then((result) => {
      if (!result) {
        return 'errur'
      } else {
        return result.data.fields
      }
    })
    .catch((err) => {
      console.log('err', err)
      throw err
    })
}

export const postUser = async (data) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/user/`
  return await axios
    .post(
      url,
      { fields: { ...data } },
      {
        headers: header,
      }
    )
    .catch((err) => {
      console.log('err', err)
    })
}
