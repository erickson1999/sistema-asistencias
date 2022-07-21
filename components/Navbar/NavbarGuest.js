import React from 'react'
import {
  Flex,
  Spacer,
  Box,
  Heading,
  ButtonGroup,
  Button,
  Link
} from '@chakra-ui/react'
import NextLink from 'next/link'

export const NavbarGuest = ({ height, width }) => {
  return (
    <nav style={{ height, width }}>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <NextLink href={'/'} passHref>
            <Link style={{ textDecoration: 'none' }}>
              <Heading size="md">Asistencias Practicantes</Heading>
            </Link>
          </NextLink>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <NextLink href={'/register'}>
            <Button colorScheme="teal">Registrarse</Button>
          </NextLink>
          <NextLink href={'/login'}>
            <Button colorScheme="teal">Login</Button>
          </NextLink>
        </ButtonGroup>
      </Flex>
    </nav>
  )
}
