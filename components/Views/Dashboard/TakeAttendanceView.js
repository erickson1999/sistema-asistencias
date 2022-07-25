import React, { useState, useEffect, useRef } from 'react'
import {
  Flex,
  Box,
  Input,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import { AiOutlineScan } from 'react-icons/ai'
import { AlertChakra } from '../../Alerts/AlertChakra'
import { FaRegKeyboard } from 'react-icons/fa'
import { TableAttendancesAll } from '../../Tables/TableAttendancesAll'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getTokenOfLS } from '../../../libs/getTokenOfLS'
import InfiniteScroll from 'react-infinite-scroller'
import { useScrollLoading } from '../../../hooks/useScrollLoading'
const initError = { status: '', title: '', description: '' }
const timeOut = 1500

export const TakeAttendanceView = () => {
  const [withScan, setWithScan] = useState(true)
  const [idUser, setIdUser] = useState('')
  const [nDocument, setNDocument] = useState('')
  const [attendances, setAttendances] = useState([])
  const [error, setError] = useState({
    status: '',
    title: '',
    description: ''
  })
  const [errorApi, setErrorApi] = useState('')
  const [errorLoading, setErrorLoading] = useState(initError)
  const [isLoading, setIsLoading] = useState(true)
  const refIdUser = useRef()
  const refNDocument = useRef()
  const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$')
  const router = useRouter()

  const generateAlertsTemporary = (data, timeout = 2000) => {
    const { status, title, description } = data
    setError({ status, title, description })
    const time = setTimeout(() => {
      setError(initError)
      clearTimeout(time)
    }, timeout)
  }
  const handlerSubmit = (e) => {
    const token = getTokenOfLS()
    if (!token) {
      router.push('/login')
    }
    e.preventDefault()
    if (withScan) {
      if (!idUser) {
        generateAlertsTemporary(
          { status: 'info', title: 'Ingrese un id' },
          1500
        )
        refIdUser.current.focus()
        return
      }
      if (idUser.length === 24 && checkForHexRegExp.test(idUser)) {
        axios
          .post(
            `/api/attendances/${idUser}`,
            {},
            {
              headers: {
                'type-identification': 'id',
                'x-access-token': token
              }
            }
          )
          .then((res) => {
            setAttendances([res.data.msg, ...attendances])
            setIdUser('')
            setErrorLoading(initError)
            refIdUser.current.focus()
          })
          .catch((err) => {
            refIdUser.current.focus()
            setErrorApi(
              err.response.data.msg ||
                'Upss parece que ocurrio un error al registrar intentalo mas tarde'
            )
            const time = setTimeout(() => {
              setErrorApi('')
              clearTimeout(time)
            }, timeOut)
            setIdUser('')
          })
      } else {
        generateAlertsTemporary(
          {
            status: 'warning',
            title: 'El id ingresado no es válido'
          },
          1500
        )
        setIdUser('')
        refIdUser.current.focus()
        return
      }
    } else {
      if (!nDocument) {
        generateAlertsTemporary(
          { status: 'info', title: 'Ingrese un número de documento' },
          1500
        )
        refIdUser.current.focus()
        return
      }

      axios
        .post(
          `/api/attendances/${nDocument}`,
          {},
          {
            headers: {
              'type-identification': 'ndocument',
              'x-access-token': token
            }
          }
        )
        .then((res) => {
          setAttendances([res.data.msg, ...attendances])
          setNDocument('')
          setErrorLoading(initError)
          refNDocument.current.focus()
        })
        .catch((err) => {
          setNDocument('')
          setErrorApi(
            err.response.data.msg ||
              'Upss parece que ocurrio un error al registrar intentalo mas tarde'
          )
          const time = setTimeout(() => {
            setErrorApi('')
            clearTimeout(time)
          }, timeOut)

          refNDocument.current.focus()
        })
    }
  }

  const handlerClick = () => {
    if (withScan) {
      refNDocument.current.focus()
    } else {
      refIdUser.current.focus()
    }
    setWithScan(!withScan)
  }

  //infinite scroll
  const [hasMore, setHasMore] = useState(true)
  const [nPage, setNPage] = useState(1)
  const loadMore = () => {
    const token = getTokenOfLS()
    if (!token) {
      router.push('/login')
    }
    refIdUser.current.focus()
    axios
      .get(`/api/attendances?page=${nPage}&sort=-1`, {
        headers: { 'x-access-token': token }
      })
      .then((res) => {
        const listAttendances = res.data.msg
        if (res.data.nextPage) {
          setNPage(res.data.nextPage)
        } else {
          setHasMore(false)
        }
        if (listAttendances.length == 0) {
          setErrorLoading({
            status: 'info',
            title: '¡Ups! parece que no existen asistencias'
          })
        }
        setAttendances([...attendances, ...listAttendances])
        setIsLoading(false)
      })
      .catch((err) => {
        setError({
          status: 'error',
          title: '¡Upss! parece que ocurrio un error'
        })
        setIsLoading(false)
      })
  }
  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={hasMore}
      loader={
        <Flex w="full" justify="center" key={0}>
          <Spinner />
        </Flex>
      }
    >
      <Flex
        w={'100%'}
        h={'auto'}
        justify="center"
        align="center"
        direction={'column'}
        rowGap={'10px'}
      >
        <Box>
          <Button type={'text'} colorScheme="teal" onClick={handlerClick}>
            {withScan ? (
              <>
                MANUAL
                <FaRegKeyboard style={{ margin: '0 0 0 5px' }} size={'30px'} />
              </>
            ) : (
              <>
                SCAN
                <AiOutlineScan style={{ margin: '0 0 0 5px' }} size={'30px'} />
              </>
            )}
          </Button>
        </Box>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            rowGap: '10px',
            alignItems: 'center'
          }}
          onSubmit={handlerSubmit}
        >
          <Flex
            rowGap={'10px'}
            direction={'column'}
            w={{ sm: '70%', md: '40%', lg: '30%', xl: '20%' }}
          >
            <Flex alignItems={'center'} columnGap="10px">
              <AiOutlineScan style={{ margin: '0 0 0 5px' }} size={'30px'} />
              <Input
                w={'100%'}
                ref={refIdUser}
                placeholder="Id de usuario"
                name={'inputScan'}
                type={'password'}
                id={'inputScan'}
                value={idUser}
                readOnly={!withScan}
                style={
                  !withScan
                    ? { cursor: 'not-allowed', background: '#F8F8F8	' }
                    : {}
                }
                onChange={(e) => setIdUser(e.target.value)}
              />
            </Flex>
            <Flex alignItems={'center'} columnGap="10px">
              <FaRegKeyboard style={{ margin: '0 0 0 5px' }} size={'30px'} />
              <Input
                w={'100%'}
                placeholder="Nº de identificación"
                type="number"
                ref={refNDocument}
                name={'inputWriting'}
                id={'inputWriting'}
                value={nDocument}
                readOnly={withScan}
                style={
                  withScan
                    ? { cursor: 'not-allowed', background: '#F8F8F8	' }
                    : {}
                }
                onChange={(e) => setNDocument(e.target.value)}
              />
            </Flex>

            <Button w={'100%'} type="submit">
              Registrar
            </Button>
          </Flex>
        </form>
      </Flex>
      {error.status && (
        <Alert my={'10px'} rounded={'10px'} status={error.status}>
          <AlertIcon></AlertIcon>
          {error.title && <AlertTitle>{error.title && error.title}</AlertTitle>}
          {error.description && (
            <AlertDescription>{error.description}</AlertDescription>
          )}
        </Alert>
      )}

      {errorApi && (
        <AlertChakra
          my="10px"
          data={{ status: 'warning', description: errorApi }}
        ></AlertChakra>
      )}

      {isLoading ? (
        <></>
      ) : errorLoading.status ? (
        <Alert rounded={'10px'}>
          <AlertIcon></AlertIcon>
          {errorLoading.title && <AlertTitle>{errorLoading.title}</AlertTitle>}
          {errorLoading.description && (
            <AlertDescription>{errorLoading.description}</AlertDescription>
          )}
        </Alert>
      ) : (
        <TableAttendancesAll from={'dashboard'} attendances={attendances} />
      )}
    </InfiniteScroll>
  )
}
