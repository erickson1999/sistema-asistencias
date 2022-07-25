import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetTokenByLS } from './useGetTokenByLS'
import { useRouter } from 'next/router'
export const useGetAttendancesById = (userId) => {
  const router = useRouter()

  const [attendances, setAttendances] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useGetTokenByLS()

  useEffect(() => {
    if (token) {
      axios
        .get(`/api/attendances/${userId}`, {
          headers: { 'type-identification': 'id', 'x-access-token': token }
        })
        .then((res) => {
          setLoading(false)
          setAttendances(res.data.msg.reverse())
        })
        .catch((err) => {
          setLoading(false)
          setError(err.response.data.msg)
          // const timer = setTimeout(() => {
          //   router.push('/practitioners')
          //   clearTimeout(timer)
          // }, 3000)
        })
    }
  }, [token])

  return { loading, attendances, error }
}
