import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
export const useReturnRoute = (redirectTo = '/login') => {
  const [render, setRender] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setRender(true)
      localStorage.removeItem('token')
      if (redirectTo) {
        router.push(redirectTo)
      }
    } else {
      axios
        .get(`http://localhost:3000/api/token/${token}`)
        .then((res) => {
          if (res.data.msg) {
            router.push('/dashboard')
          } else {
            setRender(true)
            localStorage.removeItem('token')
          }
        })
        .catch(() => {
          setRender(true)
          localStorage.removeItem('token')
        })
    }
  }, [])

  return { render }
}
