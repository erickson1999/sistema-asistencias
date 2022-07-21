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
export const LicensePracticing = () => {
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
                  width: '65%',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ fontSize: '9px' }}>Nombre completo:</Text>

                <View style={{ paddingLeft: '1px' }}>
                  <Text style={styles.Text}>Erickson Raul</Text>
                </View>
                <View style={{ marginBottom: '5px', paddingLeft: '1px' }}>
                  <Text style={styles.Text}>Quispe Churata</Text>
                </View>

                <Text style={{ fontSize: '9px' }}>Nº de documento:</Text>
                <View style={{ marginBottom: '5px', paddingLeft: '1px' }}>
                  <Text style={styles.Text}>70521769</Text>
                </View>

                <Text style={{ fontSize: '9px' }}>Área:</Text>
                <View style={{ display: 'flex', paddingLeft: '1px' }}>
                  <Text style={styles.Text}>Informática</Text>
                </View>
              </View>

              <View
                style={{
                  height: '100%',
                  width: '35%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Image
                  style={{
                    height: '80px',
                    width: '80px'
                  }}
                  src="/qrcode-temp/qrcode.png"
                  alt="qrcode"
                ></Image>
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
      </Page>
    </Document>
  )
}
