import '../css/globals.css'
import { extendTheme } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import moment from 'moment'
import 'moment/locale/es'
import '@fontsource/roboto'

function MyApp({ Component, pageProps }) {
  moment.locale('es')
  const theme = extendTheme({
    fonts: {
      heading: `'Roboto', sans-serif`,
      body: `'Roboto', sans-serif`
    }
  })
  return (
    <>
      <ChakraProvider theme={theme}>
        <main
          style={{
            height: '100vh',
            width: '98%',
            margin: '0 auto',
            padding: '10px 0px'
          }}
        >
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </>
  )
}

export default MyApp
