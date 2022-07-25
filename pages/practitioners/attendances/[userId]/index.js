import React from 'react'
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin'
import { TableAttendancesAll } from '../../../../components/Tables/TableAttendancesAll'
import { AlertChakra } from '../../../../components/Alerts/AlertChakra'
import { useGetAttendancesById } from '../../../../hooks/useGetAttendancesById'
const index = ({ userId }) => {
  const { attendances, loading, error } = useGetAttendancesById(userId)

  return (
    <>
      {loading ? (
        <></>
      ) : error ? (
        <LayoutAdmin>
          <AlertChakra
            data={{ status: 'warning', description: error }}
          ></AlertChakra>
        </LayoutAdmin>
      ) : (
        <LayoutAdmin>
          <TableAttendancesAll attendances={attendances} />
        </LayoutAdmin>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: { userId: context.params.userId }
  }
}

export default index
