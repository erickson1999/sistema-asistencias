import React from 'react'
import { LayoutPracticing } from '../../../layouts/LayoutPracticing'
import { TableAttendancesAll } from '../../Tables/TableAttendancesAll'
import { useGetAttendancesById } from '../../../hooks/useGetAttendancesById'
import { Spinner } from '@chakra-ui/react'
import { AlertChakra } from '../../Alerts/AlertChakra'
export const PracticingDashboardView = ({ userData }) => {
  const { error, loading, attendances } = useGetAttendancesById(userData._id)

  return (
    <LayoutPracticing>
      {loading ? (
        <Spinner></Spinner>
      ) : error ? (
        <AlertChakra
          data={{ status: 'info', description: error }}
        ></AlertChakra>
      ) : (
        <TableAttendancesAll attendances={attendances}></TableAttendancesAll>
      )}
    </LayoutPracticing>
  )
}
