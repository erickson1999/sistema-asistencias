import React, { useState } from 'react'
import { TablePractitionersAll } from '../../Tables/TablePractitionersAll'
import { useScrollLoading } from '../../../hooks/useScrollLoading'
import NextLink from 'next/link'
import InfiniteScroll from 'react-infinite-scroller'
import {
  Button,
  Divider,
  Input,
  FormControl,
  FormLabel,
  Select,
  Spinner,
  Flex,
  Box
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
export const TakePractitioners = () => {
  const [queries, setQueries] = useState({})
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
  const {
    error: errorUseCrollLoading,
    items: practitioners,
    hasMore,
    loadMore
  } = useScrollLoading('api/users/', { sort: -1, ...queries })

  const {
    error,
    setError,
    setSearchItems,
    searchItems,
    handlerChange,
    handlerSubmit
  } = useSearcher(initForm, configsSearcher, validationsForm)

  const restoreAllPractitioners = () => {
    setError(null)
    setSearchItems(null)
  }

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loadMore={loadMore}
      loader={
        <Flex key={0} w={'100%'} justify={'center'}>
          <Spinner></Spinner>
        </Flex>
      }
    >
      {practitioners.length > 0 ? (
        <>
          <Flex w={'100%'} justify={'center'}>
            <Box w={{ base: '90%', md: '80%', lg: '60%', xl: '40%' }}>
              <form
                onSubmit={handlerSubmit}
                style={{ marginBottom: '10px', width: '100%' }}
              >
                <FormLabel>Filtro:</FormLabel>
                <Flex
                  gap={'10px'}
                  alignItems={'center'}
                  direction={{ base: 'column', md: 'row' }}
                  columnGap={'10px'}
                  w={'100%'}
                >
                  <FormControl>
                    <Select name="searchOption" onChange={handlerChange}>
                      <option value="names">Nombres</option>
                      <option value="last_names">Apellidos</option>
                      <option value="n_document">Nº documento</option>
                      <option value="origin_institution">
                        Institución de origen
                      </option>
                    </Select>
                  </FormControl>
                  <Input
                    name="query"
                    onChange={handlerChange}
                    placeholder="Ingrese el valor de busqueda..."
                  />
                  <Button type="submit" w={{ base: '80%', md: '30%' }}>
                    Filtrar
                  </Button>
                  <Button
                    w={{ base: '80%', md: '30%' }}
                    onClick={restoreAllPractitioners}
                  >
                    limpiar
                  </Button>
                </Flex>
              </form>
            </Box>
          </Flex>
          <Flex width={'100%'} justify="right">
            <NextLink href={'/practitioners/register'}>
              <Button colorScheme={'teal'}>Registrar usuario</Button>
            </NextLink>
          </Flex>
          <Divider my={'10px'}></Divider>
          {error ? (
            <h1>{error}</h1>
          ) : (
            <TablePractitionersAll
              practitioners={searchItems ? searchItems : practitioners}
            ></TablePractitionersAll>
          )}
        </>
      ) : (
        <></>
      )}
    </InfiniteScroll>
  )
}
