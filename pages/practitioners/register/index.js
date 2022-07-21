import React from 'react'
import { LayoutAdmin } from '../../../layouts/LayoutAdmin'
import { FormRegister } from '../../../components/Forms/FormRegister'

import { useProtectedRouteByToken } from '../../../hooks/useProtectedRouteByToken'
const DashboardRegisterPage = () => {
  const { role } = useProtectedRouteByToken(['practicing', 'assistant'])
  return (
    <>
      {role === 'none' && <></>}
      {role === 'admin' && (
        <>
          <LayoutAdmin>
            <FormRegister></FormRegister>
          </LayoutAdmin>
        </>
      )}
    </>
  )
}

export default DashboardRegisterPage
