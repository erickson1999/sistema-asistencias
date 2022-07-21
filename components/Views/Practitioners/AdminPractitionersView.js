import React, { useEffect } from 'react'
import { LayoutAdmin } from '../../../layouts/LayoutAdmin'
import { TablePractitionersAll } from '../../Tables/TablePractitionersAll'
import { useGetAllPractitioners } from '../../../hooks/useGetAllPractitioners'
import NextLink from 'next/link'
import {
  Button,
  Flex,
  Divider,
  Input,
  FormControl,
  FormLabel,
  Select
} from '@chakra-ui/react'
import { useSearcher } from '../../../hooks/useSearcher'
import { useRouter } from 'next/router'

const validationsForm = (form) => {
  if (!form.searchOption) {
    return false
  }
  if (!form.query) {
    return false
  }
  return true
}
export const AdminPractitionersView = () => {
  const router = useRouter()
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
  }
  const initForm = { searchOption: 'names', query: '' }

  const configsSearcher = {
    baseURL: '/api/users',
    querys: ['names', 'last_names'],
    headers: { 'x-access-token': localStorage.getItem('token') }
  }

  //STATES
  const { practitioners } = useGetAllPractitioners()
  const { errors, setSearchItems, searchItems, handlerChange, handlerSubmit } =
    useSearcher(initForm, configsSearcher, validationsForm)

  const restoreAllPractitioners = () => {
    setSearchItems(null)
  }
  return (
    <>
      {practitioners ? (
        <LayoutAdmin>
          <form onSubmit={handlerSubmit} style={{ marginBottom: '10px' }}>
            <FormLabel>Filtro:</FormLabel>
            <Flex alignItems={'center'} columnGap={'10px'} w={'100%'}>
              <FormControl>
                <Select name="searchOption" onChange={handlerChange}>
                  <option value="names">Nombres</option>
                  <option value="last_names">Apellidos</option>
                  <option value="n_document">Nº documento</option>
                  <option value="origin_institution">Institución de origen</option>
                </Select>
              </FormControl>
              <Input
                name="query"
                onChange={handlerChange}
                placeholder="Ingrese el valor de busqueda..."
              />
              <Button type="submit" w={'30%'}>
                Filtrar
              </Button>
              <Button w={'30%'} onClick={restoreAllPractitioners}>
                limpiar
              </Button>
            </Flex>
          </form>
          <Flex width={'100%'} justify="right">
            <NextLink href={'/practitioners/register'}>
              <Button colorScheme={'teal'}>Registrar usuario</Button>
            </NextLink>
          </Flex>
          <Divider my={'10px'}></Divider>
          <TablePractitionersAll
            practitioners={searchItems ? searchItems : practitioners}
          ></TablePractitionersAll>
        </LayoutAdmin>
      ) : (
        <></>
      )}
    </>
  )
}
