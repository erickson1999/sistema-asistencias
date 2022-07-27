import React from 'react'
import { Document, Page, View, Text, Image, Font } from '@react-pdf/renderer'
const styles = {
  Text: {
    fontSize: '13px'
  }
}
Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v30/KFOiCnqEu92Fr1Mu51QrEz0dL_nz.woff2'
})
export const LicensePracticing = ({ userData }) => {
  console.log({ idCarnet: userData._id })
  const truncateFullName = (names, lastNames) => {
    names = names.split(' ')
    lastNames = lastNames.split(' ')
    return `${names[0]} ${lastNames[0]} ${lastNames[1]}`
  }
  const truncateNames = (names, limit = 1) => {
    names = names.split(' ')
    return `${names[0]}${names[1] ? ` ${names[1]}` : ''}`
  }

  return (
    <Document>
      <Page size="A4">
        <View
          style={{
            width: '8.5cm',
            height: '5.5cm',
            border: '2px solid #000',
            marginHorizontal: 'auto',
            padding: '1px',
            borderRadius: '2px'
          }}
        >
          <View
            style={{
              height: '12%',
              backgroundColor: '#00F5B4',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <Text style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Municipalidad Provincial de San Román
            </Text>
          </View>
          <View style={{ height: '76%', width: '100%' }}>
            <View
              style={{
                display: 'flex',
                height: '100%',
                flexDirection: 'row-reverse'
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '60%',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ fontSize: '9px' }}>Nombre completo:</Text>
                <View style={{ paddingLeft: '1px' }}>
                  <Text style={styles.Text}>
                    {truncateNames(userData.names)}
                  </Text>
                </View>
                <View style={{ marginBottom: '5px', paddingLeft: '1px' }}>
                  <Text style={styles.Text}>{userData.last_names}</Text>
                </View>

                <Text style={{ fontSize: '9px' }}>Nº de documento:</Text>
                <View style={{ marginBottom: '5px', paddingLeft: '1px' }}>
                  <Text style={styles.Text}>{userData.n_document}</Text>
                </View>

                <Text style={{ fontSize: '9px' }}>Área:</Text>
                <View style={{ display: 'flex', paddingLeft: '1px' }}>
                  <Text style={styles.Text}>Informática</Text>
                </View>
              </View>

              <View
                style={{
                  height: '100%',
                  width: '40%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ fontSize: '10px' }}>foto</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '12%',
              backgroundColor: '#00F5B4',
              textAlign: 'center'
            }}
          >
            <Text style={styles.Text}>Practicante</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: '5px',
            width: '8.5cm',
            height: '5.5cm',
            border: '2px solid #000',
            marginHorizontal: 'auto',
            padding: '1px',
            borderRadius: '2px'
          }}
        >
          <View
            style={{
              height: '12%',
              backgroundColor: '#00F5B4',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <Text style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Municipalidad Provincial de San Román
            </Text>
          </View>
          <View
            style={{
              height: '76%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              style={{
                height: '120px',
                width: '110px'
              }}
              src={`/api/files/images/qr-license/${userData._id}`}
              alt="qrcode"
            ></Image>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '12%',
              backgroundColor: '#00F5B4',
              textAlign: 'center'
            }}
          >
            <Text style={{ fontSize: '14px' }}>
              {truncateFullName(userData.names, userData.last_names)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
