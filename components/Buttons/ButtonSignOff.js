import { Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

const handlerClick = () => {
  if (window !== 'undefined') {
    window.localStorage.removeItem('token')
  }
}

export const ButtonSignOff = () => {
  return (
    <NextLink href="/">
      <Button colorScheme="teal" onClick={handlerClick}>
        Cerrar sesión
      </Button>
    </NextLink>
  )
}
