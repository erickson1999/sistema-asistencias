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

export const NavbarPracticing = ({ height, width }) => {
  return (
    <nav style={{ height, width }}>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <NextLink href={'/dashboard'} passHref>
            <Link style={{ textDecoration: 'none' }}>
              <Heading size="md">Asistencias Practicantes v1.0</Heading>
            </Link>
          </NextLink>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
        <NextLink href={'/dashboard/'}>
            <Button colorScheme="teal">dashboard</Button>
          </NextLink>
          <NextLink href={'/dashboard/profile/'}>
            <Button colorScheme="teal">profile</Button>
          </NextLink>
          <ButtonSignOff></ButtonSignOff>
        </ButtonGroup>
      </Flex>
    </nav>
  )
}
