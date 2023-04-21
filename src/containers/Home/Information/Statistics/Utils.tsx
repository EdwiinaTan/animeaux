export const getLabelDataReduce = (formData: any[], field: string) => {
  if (formData) {
    return formData.reduce((accumulator, form) => {
      const item = form.fields[field]
      if (!accumulator[item]) {
        accumulator[item] = 1
      } else {
        accumulator[item]++
      }
      return accumulator
    }, {})
  }
}
