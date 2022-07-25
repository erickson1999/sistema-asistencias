import React, { useEffect } from 'react'
import { AdminPractitionersProfileView } from '../../../../components/Views/Practitioners/AdminPractitionerProfileView'
import useGetUserbyId from '../../../../hooks/useGetUserbyId'
import { AlertChakra } from '../../../../components/Alerts/AlertChakra'
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin'
import QRCode from 'qrcode'
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
  QRCode.toFile(
    `assets/qrcode-temp/${ctx.params.userId}.png`,
    ctx.params.userId,
    {
      color: {
        dark: '#000',
        light: '#fff'
      },
      rendererOpts: {}
    },
    function (err) {
      if (err) throw err
      console.error('Create qr code success')
    }
  )
  return { props: { userId: ctx.params.userId } }
}
