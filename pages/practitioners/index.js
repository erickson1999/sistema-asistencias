import React from 'react'
import { AdminPractitionersView } from '../../components/Views/Practitioners/AdminPractitionersView'
import { AssistantPractitionersView } from '../../components/Views/Practitioners/AssistantPractitionersView'
import { useProtectedRouteByToken } from '../../hooks/useProtectedRouteByToken'
const PractitionersPage = () => {
  const { role } = useProtectedRouteByToken(['practicing'])
  return (
    <>
      {role === 'none' && <></>}
      {role === 'admin' && <AdminPractitionersView />}
      {role === 'assistant' && <AssistantPractitionersView />}
    </>
  )
}

export default PractitionersPage
