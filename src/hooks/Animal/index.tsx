import { useQuery } from '@tanstack/react-query'
import { getAnimalById, getAnimals } from 'src/client/Animal'
import { AnimalClient, AnimalType } from 'src/types/Animal/Type'
import { ReturnAnimal, ReturnAnimals } from './Type'

export const useGetAnimalById = (dataId: string): ReturnAnimal => {
  const { status: statusAnimal, data: animalData } = useQuery<AnimalType, Error>({
    enabled: dataId !== null,
    queryKey: ['animal', dataId],
    queryFn: () => getAnimalById(dataId || ''),
  })

  return {
    statusAnimal,
    animalData,
  }
}

export const useGetAnimals = (): ReturnAnimals => {
  const { status: statusAnimal, data: animalData } = useQuery<AnimalClient[], Error>({
    queryKey: ['animals'],
    queryFn: getAnimals,
  })

  return {
    statusAnimal,
    animalData,
  }
}

// const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_APP_ID)
// interface Test {
//   dataTest: AnimalType[]
// }

// export const useAirtableAnimal = (): Test => {
//   const [dataTest, setData] = useState<AnimalType[]>([])

//   useEffect(() => {
//     base('animal')
//       .select()
//       .eachPage(
//         function page(records: any, fetchNextPage) {
//           if (records) {
//             records.map((record: AnimalClient) => {
//               setData((prevState) => [...prevState, record.fields])
//             })
//           }
//           fetchNextPage()
//         },
//         function done(err) {
//           if (err) {
//             console.error(err)
//             return
//           }
//         }
//       )
//   }, [])
//   return { dataTest }
// }
