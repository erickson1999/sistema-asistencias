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
    console.log({ form })
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    const validForm = validationsForm(form)
    // if (validForm) {
    //   let urlSearch = null
    //   configs.querys.forEach((query) => {
    //     if (form[query]) {
    //       urlSearch = urlSearch
    //         ? `${urlSearch}&${query}=${form[query]}`
    //         : `${configs.baseURL}?${query}=${form[query]}`
    //     }
    //   })
    //   axios.get(urlSearch, { headers: configs.headers }).then((res) => {
    //     console.log({ data: res.data.msg })
    //   })
    // }
    let urlWithQuery = `${configs.baseURL}?${form.searchOption}=${form.query}`
    if (validForm) {
      axios
        .get(urlWithQuery, { headers: configs.headers })
        .then((res) => {
          setSearchItems(res.data.msg)
        })
        .catch((err) => {
          setError(err.response.data.msg)
        })
    }
  }

  return { error, setSearchItems, searchItems, handlerChange, handlerSubmit }
}
