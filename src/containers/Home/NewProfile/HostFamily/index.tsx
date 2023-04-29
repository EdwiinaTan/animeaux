import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, FormikValues } from 'formik'
import { useState } from 'react'
import { postHostFamily } from 'src/client/HostFamily'
import { HostFamilyProfile } from 'src/components/Form/HostFamily'
import { validationHostFamily } from 'src/components/Form/HostFamily/Utils'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { CardStyle, ContainerStyle, Keyboard } from 'src/constant/Theme/Styled'
import { HostFamilyRequest } from 'src/types/HostFamily/Type'

export const AddHostFamily = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const [selected, setSelected] = useState<string[]>([])

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues: HostFamilyRequest = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postalCode: '',
    city: '',
    address: '',
    animalId: [''],
    criteria: '',
    description: '',
    onBreak: '',
  }

  const mutation = useMutation({
    mutationFn: postHostFamily,
    onSuccess: () => {
      onClickGoBack()
      queryClient.invalidateQueries(['hostFamilies'])
      SnackbarToastComponent({
        title: 'L’ajout d’une FA a bien été prise en compte',
      })
    },
    onError: (err) => {
      SnackbarToastComponent({
        type: 'error',
        title: 'Erreur',
      })
      console.log('err', err)
    },
  })

  const addHostFamily = (values: HostFamilyRequest) => {
    let data
    if (selected.length > 0) {
      data = {
        ...values,
        animalId: selected,
      }
    } else {
      data = {
        ...values,
        animalId: [values.animalId],
      }
    }

    mutation.mutate(data)
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={onClickGoBack} title="Ajouter une famille d’accueil" />
      <Keyboard behavior="padding" enabled>
        <ContainerStyle>
          <CardStyle>
            <Formik
              validationSchema={validationHostFamily}
              initialValues={initialValues}
              onSubmit={(values: HostFamilyRequest) => {
                addHostFamily(values)
              }}
            >
              {(field: FormikValues) => (
                <HostFamilyProfile field={field} setSelected={setSelected} />
              )}
            </Formik>
          </CardStyle>
          <Spacing size="24" />
        </ContainerStyle>
      </Keyboard>
    </Layout>
  )
}
