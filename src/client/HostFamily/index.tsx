import axios from 'axios'
import { AIRTABLE_APP_ID } from 'config'
import { header } from '../Utils'

/**
 * GET Method
 */
export const getHostFamilies = async () => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/hostFamily/`
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

/**
 * POST Method
 */
export const postHostFamily = async (data) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/hostFamily/`
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

/**
 * GET by Id Method
 */
export const getHostFamilyById = async (recordId: string) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/hostFamily/${recordId}/`
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

/**
 * DELETE by Id Method
 */
export const deleteHostFamilyById = async (recordId: string) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/hostFamily/${recordId}/`
  await axios
    .delete(url, {
      headers: header,
    })
    .catch((err) => {
      console.log('err', err)
    })
}

/**
 * UPDATE Method
 */
export const updateHostFamilyById = async (data) => {
  const { id, values } = data
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/hostFamily/${id}/`
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
