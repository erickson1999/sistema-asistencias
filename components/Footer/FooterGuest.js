import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

const currentTime = new Date()
export const FooterGuest = ({ width, height }) => {
  return (
    <footer style={{ height, width }}>
      <Flex
        h="100%"
        w="100%"
        justify="center"
        align="end"
        wrap={'wrap'}
        textAlign="center"
      >
        <Box>
          <span>
            © Copyright{' '}
            <a
              target="_blank"
              href="https://ericksonqc-dev.vercel.app"
              style={{ color: 'darkviolet' }}
            >
              ericksonqc-dev
            </a>{' '}
            {currentTime.getFullYear()}. Todos los derechos reservados
          </span>
        </Box>
      </Flex>
    </footer>
  )
}
