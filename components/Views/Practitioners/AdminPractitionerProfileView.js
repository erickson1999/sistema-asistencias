import React from 'react'
import { LayoutAdmin } from '../../../layouts/LayoutAdmin'
import { TakePractitionerProfile } from './TakePractitionerProfile'

export const AdminPractitionersProfileView = ({ userData }) => {
  return (
    <LayoutAdmin>
      <TakePractitionerProfile userData={userData}></TakePractitionerProfile>
    </LayoutAdmin>
  )
}
