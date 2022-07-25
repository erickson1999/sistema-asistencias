import React, { useState } from 'react'
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useForm } from '../../hooks/useForm'
import { validationsFormRegister } from '../../libs/validations'
import { initsFormRegister } from '../../libs/inits'
import axios from 'axios'
import { AlertChakra } from '../Alerts/AlertChakra'
export const FormRegister = () => {
  const router = useRouter()
  const { errors, form, handlerChange, handlerSubmit, dataForCompleteForm } =
    useForm(initsFormRegister, validationsFormRegister, execute)
  const [errorApi, setErrorApi] = useState('')

  function execute(form) {
    axios
      .post('/api/auth/register', form, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token':
            router.route === '/practitioners/register'
              ? localStorage.getItem('token')
              : ''
        }
      })
      .then(function (res) {
        if (res.data.ok) {
          if (router.route == '/practitioners/register') {
            router.push('/practitioners')
          }

          if (router.route == '/register') {
            localStorage.setItem('token', res.data.token)
            router.push('/dashboard')
          }
        }
      })
      .catch(function (error) {
        setErrorApi(error.response.data.msg)
      })
  }

  return (
    <Flex width={'100%'} height="100%" justify="center" align="center">
      <form
        onSubmit={handlerSubmit}
        style={{ display: 'flex', width: '100%', flexDirection: 'column' }}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          w={'full'}
          columnGap={'20px'}
          justify={'center'}
          align={'center'}
        >
          <Box w={{ base: '80%', md: '25%' }}>
            <FormControl mb={3}>
              <FormLabel htmlFor="n_document" mb={0}>
                Nº documento
              </FormLabel>
              <Input
                placeholder="Nº documento"
                id="n_document"
                name="n_document"
                type="number"
                onChange={handlerChange}
                value={form.n_document}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel htmlFor="password" mb={0}>
                Contraseña
              </FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="***********"
                name="password"
                onChange={handlerChange}
                value={form.password}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel htmlFor="names" mb={0}>
                Nombres
              </FormLabel>
              <Input
                placeholder="Nombres completos"
                id="names"
                name="names"
                type="text"
                style={{
                  background: dataForCompleteForm.dni ? '#F9F9F9' : 'none'
                }}
                onChange={handlerChange}
                readOnly={dataForCompleteForm.dni ? true : false}
                cursor={dataForCompleteForm.dni ? 'not-allowed' : 'default'}
                value={form.names}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel htmlFor="last_names" mb={0}>
                Apellidos
              </FormLabel>
              <Input
                placeholder="Apellidos"
                id="last_names"
                name="last_names"
                type="text"
                onChange={handlerChange}
                readOnly={dataForCompleteForm.dni ? true : false}
                style={{
                  background: dataForCompleteForm.dni ? '#F9F9F9' : 'none'
                }}
                cursor={dataForCompleteForm.dni ? 'not-allowed' : 'default'}
                value={form.last_names}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel htmlFor="date_birth" mb={0}>
                Fecha de nacimiento
              </FormLabel>
              <Input
                placeholder="Fecha de nacimiento"
                id="date_birth"
                name="date_birth"
                type="date"
                onChange={handlerChange}
                value={form.date_birth}
              />
            </FormControl>
          </Box>

          <Box w={{ base: '80%', md: '25%' }}>
            <FormControl mb={3}>
              <FormLabel htmlFor="origin_institution" mb={0}>
                Institución de origen
              </FormLabel>
              <Input
                placeholder="Institución de origen"
                id="origin_institution"
                name="origin_institution"
                type="text"
                onChange={handlerChange}
                value={form.origin_institution}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel htmlFor="phone" mb={0}>
                Número telefónico
              </FormLabel>
              <Input
                placeholder="celular o teléfono"
                id="phone"
                name="phone"
                type="number"
                onChange={handlerChange}
                value={form.phone}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel htmlFor="season_start" mb={0}>
                Inicio de prácticas
              </FormLabel>
              <Input
                placeholder="Fecha de inicio"
                id="season_start"
                name="season_start"
                type="date"
                onChange={handlerChange}
                value={form.season_start}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel htmlFor="season_end" mb={0}>
                Fin de prácticas
              </FormLabel>
              <Input
                placeholder="Fecha fin"
                id="season_end"
                name="season_end"
                type="date"
                onChange={handlerChange}
                value={form.season_end}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel htmlFor="shift_name" mb={0}>
                Turno de prácticas
              </FormLabel>
              <Select
                name="shift_name"
                value={form.shift_name}
                onChange={handlerChange}
              >
                <option defaultChecked value="morning">
                  Mañana
                </option>
                <option value="afternoon">Tarde</option>
                <option value="complete">Completo</option>
              </Select>
            </FormControl>
          </Box>
        </Flex>

        {router.route === '/practitioners/register' && (
          <Flex
            w={'full'}
            direction={'column'}
            align={'center'}
            justify={'center'}
          >
            <Box w={{ base: '80%', md: '25%' }}>
              <FormLabel>Rol</FormLabel>
              <Select name="role" value={form.role} onChange={handlerChange}>
                <option defaultChecked value="practicing">
                  practicante
                </option>
                <option value="assistant">asistente</option>
                <option value="admin">administrador</option>
              </Select>
            </Box>
          </Flex>
        )}

        {errors.length > 0 && (
          <AlertChakra
            my="10px"
            data={{ status: 'warning', description: errors[0].message }}
          />
        )}
        {errorApi && (
          <AlertChakra
            my="10px"
            data={{ status: 'warning', description: errorApi }}
          />
        )}
        <Button
          colorScheme="teal"
          variant="outline"
          width="full"
          my={'20px'}
          w={'150px'}
          mx={'auto'}
          type="submit"
        >
          {router.route === '/practitioners/register'
            ? 'Registrar'
            : 'Registrarme'}
        </Button>
      </form>
    </Flex>
  )
}
