import { AdminDashboardView } from '../../components/Views/Dashboard/AdminDashboardView'
import { AssitantDashboardView } from '../../components/Views/Dashboard/AssitantDashboardView'
import { PracticingDashboardView } from '../../components/Views/Dashboard/PracticingDashboardView'
import { useProtectedRouteByToken } from '../../hooks/useProtectedRouteByToken'
const DashBoardPage = () => {
  const { role, user } = useProtectedRouteByToken()
  return (
    <>
      {role === 'none' && <></>}
      {role === 'practicing' && (
        <PracticingDashboardView userData={user}> </PracticingDashboardView>
      )}
      {role === 'assistant' && <AssitantDashboardView> </AssitantDashboardView>}
      {role === 'admin' && <AdminDashboardView></AdminDashboardView>}
    </>
  )
}

export default DashBoardPage
