import axios from 'axios'
import { AIRTABLE_API_KEY, AIRTABLE_APP_ID } from 'config'

export const header = {
  'content-type': 'application/json; charset=utf-8',
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
}

export const getUsers = () => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/user/`
  return axios
    .get(url, {
      headers: header,
    })
    .then((result) => result.data.records)
    .catch((err) => {
      console.log('err', err)
      throw err
    })
}

export const getUserById = (recordId: string) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/user/${recordId}/`
  return axios
    .get(url, {
      headers: header,
    })
    .then((result) => result.data.fields)
    .catch((err) => {
      console.log('err', err)
      throw err
    })
}
