import { useState, useEffect } from 'react'
import { useGetTokenByLS } from './useGetTokenByLS'
import axios from 'axios'
export const useGetAllPractitioners = () => {
  const [practitioners, setPractitioners] = useState(null)
  const baseURL = 'http://localhost:3000/api/users'
  const { token } = useGetTokenByLS()

  useEffect(() => {
    if (token) {
      axios
        .get(baseURL, { headers: { 'x-access-token': token } })
        .then((res) => {
          console.log(res)
          setPractitioners(res.data.msg.reverse())
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [token])

  return { practitioners }
}
  