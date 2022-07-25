import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer/'
import { LicensePracticing } from '../Licenses/LicensePracticing'
import { Button } from '@chakra-ui/react'
export const ButtonDownloadCarnet = ({ userData }) => {
  return (
    <PDFDownloadLink
      document={<LicensePracticing userData={userData}></LicensePracticing>}
      fileName={`Carnet - ${userData.names} ${userData.last_names}.pdf`}
    >
      <Button>Descargar carnet</Button>
    </PDFDownloadLink>
  )
}
