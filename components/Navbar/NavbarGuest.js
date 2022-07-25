import React from 'react'
import {
  Flex,
  Spacer,
  Box,
  Heading,
  ButtonGroup,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BsList } from 'react-icons/bs'
import NextLink from 'next/link'

export const NavbarGuest = ({ height, width }) => {
  const router = useRouter()
  const redirectTo = (url = '') => {
    router.push(url)
  }
  return (
    <>
      <Box display={{ base: 'none', md: 'initial' }}>
        <nav style={{ height, width }}>
          <Flex minWidth="max-content" alignItems="center" gap="2">
            <Box p="2">
              <NextLink href={'/'} passHref>
                <Link style={{ textDecoration: 'none' }}>
                  <Heading size="md">Asistencias Practicantes v1.0</Heading>
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
      </Box>
      <Flex display={{ base: 'initial', md: 'none' }} width="100%" mb={'20px'}>
        <nav style={{ display: 'flex', justifyContent: 'right' }}>
          <Menu>
            <MenuButton as={Button}>
              <BsList size={'25px'}></BsList>
            </MenuButton>
            <MenuList w={'200px'}>
              <MenuItem
                onClick={() => {
                  redirectTo('/')
                }}
              >
                Inicio
              </MenuItem>
              <MenuItem
                onClick={() => {
                  redirectTo('/login')
                }}
              >
                Iniciar sesión
              </MenuItem>
              <MenuItem
                onClick={() => {
                  redirectTo('/register')
                }}
              >
                registrarse
              </MenuItem>
            </MenuList>
          </Menu>
        </nav>
      </Flex>
    </>
  )
}
