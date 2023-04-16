import { useQuery } from '@tanstack/react-query'
import Airtable from 'airtable'
import { AIRTABLE_API_KEY, AIRTABLE_APP_ID } from 'config'
import { useEffect, useState } from 'react'
import { getAnimals } from 'src/client/Animal'
import { AnimalClient, AnimalType } from 'src/types/Animal/Type'
import { ReturnAnimal } from './Type'

export const useGetAnimals = (): ReturnAnimal => {
  const { status: statusAnimal, data: animalData } = useQuery<AnimalClient[]>({
    queryKey: ['animals'],
    queryFn: getAnimals,
  })

  return {
    statusAnimal,
    animalData,
  }
}
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_APP_ID)

export interface Test {
  dataTest: AnimalType[]
}

export const useAirtableAnimal = (): Test => {
  const [dataTest, setData] = useState<AnimalType[]>([])

  useEffect(() => {
    base('animal')
      .select()
      .eachPage(
        function page(records: any, fetchNextPage) {
          if (records) {
            records.map((record: AnimalClient) => {
              setData((prevState) => [...prevState, record.fields])
            })
          }
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            console.error(err)
            return
          }
        }
      )
  }, [])
  return { dataTest }
}
