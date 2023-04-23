import axios from 'axios'
import { AIRTABLE_API_KEY, AIRTABLE_APP_ID } from 'config'

export const header = {
  'content-type': 'application/json; charset=utf-8',
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
}

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

export const postAnimal = (data) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/animal/`
  return axios
    .post(
      url,
      { fields: { ...data } },
      {
        headers: header,
      }
    )
    .catch((err) => {
      console.log('err', err.response.data)
    })
}

export const getAnimalById = (recordId: string) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/animal/${recordId}/`
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

export const deleteAnimalById = (recordId: string) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/animal/${recordId}/`
  axios
    .delete(url, {
      headers: header,
    })
    .catch((err) => {
      console.log('err', err)
    })
}

// createdTime: new Date(),
// fields: data,
// id: recordId,
// const baseAirtable = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_APP_ID)
// baseAirtable('animal').update([
//     fields: {
//       name: 'Bloom',
//     },
// ])

//mauvais
export const updateAnimalById = (recordId: string, data) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/animal/${recordId}/`
  axios
    .patch(
      url,
      {
        fields: {
          ...data,
          hostFamilyId: [data.hostFamilyId],
          userId: [data.userId],
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

export const updateAnimalByIdTest = (data) => {
  const { id, values } = data
  const url = `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/animal/${id}/`
  return axios
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

export const updateAnimalByIdFetch = async (data) => {
  const { id, values } = data

  console.log('data', data)
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_APP_ID}/animal/${id}/`, {
    method: 'PATCH',
    headers: header,
    body: JSON.stringify({ fields: { ...values } }),
  })
  const result = res.json()
  return result
}
