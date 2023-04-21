interface AddAnimalProps {
  values: any
  handleChange: any
  handleBlur: any
  handleSubmit: any
  renderDefaultOptionHostFamily?: () => {
    key: string
    value: string
  }
  renderDefaultOptionUser?: () => {
    key: string
    value: string
  }
  renderDefaultOptionPlace?: () => {
    key: string
    value: string
  }
  errors?: any
  touched?: any
}
