import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Flex,
  Box
} from '@chakra-ui/react'
import { useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import { AlertChakra } from '../Alerts/AlertChakra'
export const FormUpdateProfileUser = ({ userData, from }) => {
  console.log({ userData })
  const mapUserData = (userData) => {
    if (!userData) return null
    let { date_birth, ...remainingData } = userData
    const formatter = moment(date_birth).toDate()
    const date = moment(formatter).format('YYYY-MM-DD')
    date_birth = date
    return {
      date_birth: date,
      ...remainingData
    }
  }

  useEffect(() => {
    if (userData) {
      setFormUser(mapUserData(userData))
    }
  }, [userData])

  const handlerChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value })
  }
  const handlerSubmit = (e) => {
    e.preventDefault()
    if (forUpdate) return
    axios
      .put(`/api/users/${userData._id}`, formUser, {
        headers: { 'x-access-token': localStorage.getItem('token') }
      })
      .then((res) => {
        if (res.data.ok) {
          setForUpdate(true)
          setSuccessUpdate(true)
          setTimeout(() => {
            setSuccessUpdate(null)
          }, 2000)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const [forUpdate, setForUpdate] = useState(true)
  const [formUser, setFormUser] = useState(mapUserData(userData))
  const [successUpdate, setSuccessUpdate] = useState(null)
  const stylesInput = forUpdate
    ? { backgroundColor: '#f8f8f8', cursor: 'not-allowed' }
    : {}

  return formUser ? (
    <>
      <Flex my={'10px'} w={'100%'} justify={'center'}>
        <Box>
          <Button
            onClick={() => {
              setForUpdate(!forUpdate)
            }}
          >
            {forUpdate ? 'Editar' : 'Cancelar edición'}
          </Button>
        </Box>
      </Flex>

      <Flex direction={'column'} w={'100%'} align={'center'}>
        <Box w={{ base: '80%', md: '50%', lg: '30%', xl: '20%' }}>
          <form style={{ width: '100%' }} onSubmit={handlerSubmit}>
            <Flex direction={'column'} gap={'15px'} mb={'10px'}>
              <FormControl>
                <FormLabel mb={'0'}>Nº documento:</FormLabel>
                <Input
                  value={formUser.n_document}
                  name="n_document"
                  type="number"
                  onChange={handlerChange}
                  readOnly={forUpdate}
                  style={stylesInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel mb={'0'}>Nombres:</FormLabel>
                <Input
                  value={formUser.names}
                  name="names"
                  type="text"
                  onChange={handlerChange}
                  readOnly={forUpdate}
                  style={stylesInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel mb={'0'}>Apellidos:</FormLabel>
                <Input
                  value={formUser.last_names}
                  name="last_names"
                  type="text"
                  onChange={handlerChange}
                  readOnly={forUpdate}
                  style={stylesInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel mb={'0'}>Fecha de nacimiento:</FormLabel>
                <Input
                  value={formUser.date_birth}
                  name="date_birth"
                  type="date"
                  onChange={handlerChange}
                  readOnly={forUpdate}
                  style={stylesInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel mb={'0'}>Nº telefónico:</FormLabel>
                <Input
                  value={formUser.phone}
                  name="phone"
                  type="number"
                  onChange={handlerChange}
                  readOnly={forUpdate}
                  style={stylesInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel mb={'0'}>Institución de origen:</FormLabel>
                <Input
                  value={formUser.origin_institution}
                  name="origin_institution"
                  type="text"
                  onChange={handlerChange}
                  readOnly={forUpdate}
                  style={stylesInput}
                />
              </FormControl>
            </Flex>
            <Flex w={'full'} justify={'center'}>
              <Button w={{ base: '100%', md: '50%' }} type="submit">
                Guardar cambios
              </Button>
            </Flex>
            {successUpdate && (
              <AlertChakra
                mt={'10px'}
                data={{
                  status: 'success',
                  description: 'Datos actualizados correctamente'
                }}
                timeout={true}
                timer={3000}
              ></AlertChakra>
            )}
          </form>
        </Box>
      </Flex>
    </>
  ) : (
    <Flex w={'full'} justify={'center'}>
      <Spinner></Spinner>
    </Flex>
  )
}
