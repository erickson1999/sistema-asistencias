import { useState, useEffect } from 'react'
import { useGetTokenByLS } from './useGetTokenByLS'
import axios from 'axios'
export const useGetAllPractitioners = () => {
  //STATES
  const [practitioners, setPractitioners] = useState(null)
  const [error, setError] = useState(null)

  const baseURL = '/api/users'
  const { token } = useGetTokenByLS()

  useEffect(() => {
    if (token) {
      axios
        .get(baseURL, { headers: { 'x-access-token': token } })
        .then((res) => {
          setPractitioners(res.data.msg.reverse())
        })
        .catch((err) => {
          setError(err)
        })
    }
  }, [token])

  return { error, practitioners }
}
