import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetTokenByLS } from './useGetTokenByLS'
import { validateId } from '../utils/validateId'
import { useRouter } from 'next/router'

const useGetUserbyId = (userId = null) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { token } = useGetTokenByLS()

  useEffect(() => {
    if (!userId) {
      router.push('/practitioners')
    }
    if (token) {
      axios
        .get(`/api/users/${userId}`, { headers: { 'x-access-token': token } })
        .then((res) => {
          setLoading(false)
          setUser(res.data.msg)
        })
        .catch((err) => {
          setLoading(false)
          setError(err.response.data.msg)
          const timer = setTimeout(() => {
            router.push('/practitioners')
            clearTimeout(timer)
          }, 3000)
        })
    }
  }, [token])

  return { loading, error, user }
}

export default useGetUserbyId
