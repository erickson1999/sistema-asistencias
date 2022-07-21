import React from 'react'
import FormLogin from '../../components/Forms/FormLogin'
import { LayoutGuest } from '../../layouts/LayoutGuest'
import { useReturnRoute } from '../../hooks/useReturnRoute'
const LoginPage = () => {
  const { render } = useReturnRoute()

  return render ? (
    <LayoutGuest>
      <FormLogin />
    </LayoutGuest>
  ) : (
    <></>
  )
}

export default LoginPage
