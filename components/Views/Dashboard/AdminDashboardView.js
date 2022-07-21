import React from 'react'
import { LayoutAdmin } from '../../../layouts/LayoutAdmin'
import { TakeAttendanceView } from './TakeAttendanceView'
export const AdminDashboardView = () => {
  return (
    <LayoutAdmin>
      <TakeAttendanceView></TakeAttendanceView>
    </LayoutAdmin>
  )
}
