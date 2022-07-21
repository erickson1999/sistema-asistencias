import React from 'react'
import { LayoutGuest } from '../../layouts/LayoutGuest'
import { FormRegister } from '../../components/Forms/FormRegister'
import { useReturnRoute } from '../../hooks/useReturnRoute'
const RegisterPage = () => {
  const { render } = useReturnRoute(null)

  return render ? (
    <LayoutGuest>
      <FormRegister></FormRegister>
    </LayoutGuest>
  ) : (
    <></>
  )
}

export default RegisterPage
