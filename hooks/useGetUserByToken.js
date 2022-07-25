import { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetTokenByLS } from './useGetTokenByLS'
export const useGetUserByToken = () => {
  const { token } = useGetTokenByLS()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (token) {
      axios
        .get(`/api/token/${token}`, {
          headers: { 'x-access-token': token }
        })
        .then((res) => {
          setLoading(false)
          setUser(res.data.msg)
        })
        .catch((res) => {
          console.log(res)
          setLoading(false)
          setError(res.response.data.msg)
        })
    }
  }, [token])

  return { loading, error, user }
}
