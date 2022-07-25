import { useState } from 'react'
import axios from 'axios'
export const useSearcher = (
  initForm = null,
  configs = null,
  validationsForm = null
) => {
  const defaultConfigs = ['baseURL', 'querys']

  if (!initForm) {
    throw new Error('useSearcher: initForm is required')
  }
  if (!configs) {
    throw new Error('useSearcher: configs is required')
  }
  if (!validationsForm) {
    throw new Error('useSearcher: validationsForm is required')
  }

  const keysOfConfigs = Object.keys(configs)

  //verification if object includes all keys of configs

  defaultConfigs.forEach((config) => {
    const result = keysOfConfigs.includes(config)
    if (!result) {
      throw new Error(`useSearcher: configs must have ${config}`)
    }
  })

  //STATES
  const [form, setForm] = useState(initForm)
  const [error, setError] = useState(null)
  const [searchItems, setSearchItems] = useState(null)

  const handlerChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    const validForm = validationsForm(form)
    let urlWithQuery = `${configs.baseURL}?${form.searchOption}=${form.query}`
    if (validForm) {
      axios
        .get(urlWithQuery, { headers: configs.headers })
        .then((res) => {
          setError(null)
          setSearchItems(res.data.msg)
        })
        .catch((err) => {
          setError(err.response.data.msg)
        })
    }
  }

  return {
    error,
    setError,
    setSearchItems,
    searchItems,
    handlerChange,
    handlerSubmit
  }
}
