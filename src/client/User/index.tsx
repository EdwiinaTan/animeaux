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
  console
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/user/${recordId}/`
  return await axios
    .get(url, {
      headers: header,
    })
    .then((result) => {
      if (!result) {
        return 'err'
      } else {
        return result.data.fields
      }
    })
    .catch((err) => {
      console.log('err', err)
      throw err
    })
}

export const getUserByIdToken = async (token: string) => {
  //api.airtable.com/v0/dzadzadza/user?filterByFormula=email%3D%22srun.singdavid%40gmail.com%22
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/user?filterByFormula=token${encodeURI(
    `="${token}"`
  )}`
  return await axios
    .get(url, {
      headers: header,
    })
    .then((result) => {
      if (!result) {
        return 'err'
      } else {
        return result.data.records[0].fields
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

export const updateUserById = async (data) => {
  const { id, values } = data
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/user/${id}/`
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
