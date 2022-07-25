import React from 'react'
import {
  Flex,
  Link,
  Box,
  ButtonGroup,
  Spacer,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'

import { BsList } from 'react-icons/bs'

import NextLink from 'next/link'
import { ButtonSignOff } from '../Buttons/ButtonSignOff'
import { useRouter } from 'next/router'
export const NavbarAdmin = ({ height, width }) => {
  const router = useRouter()
  const redirectTo = (url = '') => {
    router.push(url)
  }
  const DashboardNextLink = () => {
    return (
      <NextLink href={'/dashboard'}>
        <Button colorScheme="teal">dashboard</Button>
      </NextLink>
    )
  }
  const practitionersNextLink = (
    <NextLink href={'/practitioners'}>
      <Button colorScheme="teal">practicantes</Button>
    </NextLink>
  )

  return (
    <>
      <Box display={{ base: 'none', md: 'initial' }}>
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
              <DashboardNextLink></DashboardNextLink>
              {practitionersNextLink}
              <ButtonSignOff></ButtonSignOff>
            </ButtonGroup>
          </Flex>
        </nav>
      </Box>
      <Flex display={{ base: 'initial', md: 'none' }} width="100%">
        <nav
          style={{
            display: 'flex',
            justifyContent: 'right',
            marginBottom: '10px'
          }}
        >
          <Menu>
            <MenuButton as={Button}>
              <BsList size={'25px'}></BsList>
            </MenuButton>
            <MenuList w={'200px'}>
              <MenuItem
                onClick={() => {
                  redirectTo('/dashboard')
                }}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                onClick={() => {
                  redirectTo('/practitioners')
                }}
              >
                Practicantes
              </MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.removeItem('token')
                  redirectTo('/')
                }}
              >
                Cerrar sesión
              </MenuItem>
            </MenuList>
          </Menu>
        </nav>
      </Flex>
    </>
  )
}
