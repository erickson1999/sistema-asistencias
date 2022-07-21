import dbConnect from '../libs/dbConnectLibs'
import userModels from '../models/userModels'
import { LayoutGuest } from '../layouts/LayoutGuest'
import superjson from 'superjson'
import { LicensePracticing } from '../components/Licenses/LicensePracticing'
import { PDFViewer } from '@react-pdf/renderer/'
import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'

import QRCode from 'qrcode'

const Index = ({ usuarios }) => {
  if (typeof window == 'undefined') {
  }

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? (
    //   <LayoutGuest>
    //     <div className="mx-auto flex h-full w-11/12 flex-wrap">
    //       {/* {usuarios.map((usuario) => (
    //   <div key={usuario._id} className="h-40 w-1/5 p-2 hover:cursor-pointer">
    //     <div className="flex h-36 flex-col items-center justify-center rounded border p-1 hover:bg-yellow-50">
    //       <p>
    //         <span>Nombres: </span>
    //         {usuario.names}
    //       </p>
    //       <p>
    //         <span>Apellidos: </span>
    //         {usuario.last_names}
    //       </p>
    //       <p>{usuario.n_documeno}</p>
    //     </div>
    //   </div>
    // ))} */}
    //     </div>
    //   </LayoutGuest>
    <>
      <PDFViewer width={'100%'} height="100%">
        <LicensePracticing />
      </PDFViewer>
    </>
  ) : (
    ''
  )
}

export async function getServerSideProps() {
  QRCode.toFile(
    'assets/qrcode-temp/qrcode.png',
    '62bfb5525b85819a8bd9522a',
    {
      color: {
        dark: '#000',
        light: '#fff'
      },
      rendererOpts: {}
    },
    function (err) {
      if (err) throw err
      console.log('done')
    }
  )

  await dbConnect()
  const result = await userModels.find({})
  const usuarios = result.map((doc) => {
    const usuario = superjson.stringify(doc)
    const usuarioJson = superjson.parse(usuario)
    usuarioJson._id = usuarioJson._id.toString()
    return usuarioJson
  })
  return { props: { usuarios } }
}

export default Index
