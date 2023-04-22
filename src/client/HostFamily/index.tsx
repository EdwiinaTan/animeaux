import axios from 'axios'
import { AIRTABLE_API_KEY, AIRTABLE_APP_ID } from 'config'

export const header = {
  'content-type': 'application/json; charset=utf-8',
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
}

export const getHostFamilies = () => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/hostFamily/`
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

export const postHostFamily = (data) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/hostFamily/`
  return axios
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

export const postHostFamilyFetch = (data) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/hostFamily/`
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((res) => res.json())
}

export const getHostFamilyById = (recordId: string) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/hostFamily/${recordId}/`
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

export const deleteHostFamilyById = (recordId: string) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/hostFamily/${recordId}/`
  axios
    .delete(url, {
      headers: header,
    })
    .catch((err) => {
      console.log('err', err)
    })
}

export const updateHostFamilyById = (recordId: string, data) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/hostFamily/${recordId}/`
  axios
    .patch(
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
