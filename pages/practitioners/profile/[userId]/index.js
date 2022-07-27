import React, { useEffect } from 'react'
import { AdminPractitionersProfileView } from '../../../../components/Views/Practitioners/AdminPractitionerProfileView'
import useGetUserbyId from '../../../../hooks/useGetUserbyId'
import { AlertChakra } from '../../../../components/Alerts/AlertChakra'
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin'
const Index = ({ userId }) => {
  const { loading, error, user } = useGetUserbyId(userId)

  return loading ? (
    <></>
  ) : error ? (
    <LayoutAdmin>
      <AlertChakra
        data={{ status: 'warning', description: error }}
      ></AlertChakra>
    </LayoutAdmin>
  ) : (
    <AdminPractitionersProfileView
      userData={user}
    ></AdminPractitionersProfileView>
  )
}
export default Index

export async function getServerSideProps(ctx) {
  return { props: { userId: ctx.params.userId } }
}
