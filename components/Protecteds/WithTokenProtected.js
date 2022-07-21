import React, { useState } from 'react'

const WithTokenProtected = ({ children }) => {
  const [loading, setLoading] = useState('')

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
    }
  }

  return <>{children}</>
}

export default WithTokenProtected
