import { useState } from 'react'
import { getTokenOfLS } from '../libs/getTokenOfLS'
import axios from 'axios'
export const useScrollLoading = (baseURL = null, queries = null) => {
  if (!baseURL) {
    throw new Error('baseURL is required')
  }
  //CONST
  const BASE_URL = baseURL
  const TOKEN = getTokenOfLS()

  //states
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [nPage, setNPage] = useState(1)

  const formatQueries = (queries) => {
    let query = ''
    for (const key in queries) {
      if (queries[key] === undefined) {
        delete queries[key]
      } else {
        query += `${key}=${queries[key]}&`
      }
    }
    return query.slice(0, -1)
  }

  //functions
  if (!TOKEN) return { items }
  const loadMore = () => {
    axios
      .get(`${BASE_URL}?page=${nPage}&${formatQueries(queries)}`, {
        headers: { 'x-access-token': TOKEN }
      })
      .then((res) => {
        setItems([...items, ...res.data.msg])
        res.data.nextPage ? setNPage(res.data.nextPage) : setHasMore(false)
      })
      .catch((err) => {
        setHasMore(false)
        setError(err)
      })
  }

  return { error, items, hasMore, loadMore }
}
