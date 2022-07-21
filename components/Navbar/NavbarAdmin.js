import React from 'react'
import {
  Flex,
  Link,
  Box,
  ButtonGroup,
  Spacer,
  Heading,
  Button
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { ButtonSignOff } from '../Buttons/ButtonSignOff'
export const NavbarAdmin = ({ height, width }) => {
  return (
    <nav style={{ height, width }}>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <NextLink href={'/dashboard'} passHref>
            <Link style={{ textDecoration: 'none' }}>
              <Heading size="md">Asistencias Practicantes</Heading>
            </Link>
          </NextLink>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <NextLink href={'/practitioners'}>
            <Button colorScheme="teal">practicantes</Button>
          </NextLink>
          <NextLink href={'/dashboard'}>
            <Button colorScheme="teal">configuraciones</Button>
          </NextLink>
          <NextLink href="/activate">
            <Button colorScheme="teal">activar</Button>
          </NextLink>
          <ButtonSignOff></ButtonSignOff>
        </ButtonGroup>
      </Flex>
    </nav>
  )
}
