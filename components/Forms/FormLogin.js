import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useForm } from '../../hooks/useForm'
import { validationsFormLogin } from '../../libs/validations/validationsFormLogin'
import { initsFormLogin } from '../../libs/inits/initsFormLogin'
import { AlertChakra } from '../Alerts/AlertChakra'

const FormLogin = () => {
  const { errors, form, handlerChange, handlerSubmit } = useForm(
    initsFormLogin,
    validationsFormLogin,
    execute
  )
  const [errorApi, setErrorApi] = useState('')

  const router = useRouter()

  function execute(form) {
    axios
      .post('http://localhost:3000/api/auth/login', form, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(function (res) {
        if (res.data.ok) {
          router.push('/dashboard')
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.data.token)
        }
      })
      .catch(function (error) {
        setErrorApi(error.response.data.msg)
      })
  }
  return (
    <Flex align={'center'} justify={'center'} h={'100%'} w={'100%'}>
      <Box w={'20%'}>
        <form onSubmit={handlerSubmit}>
          <FormControl mb={3}>
            <FormLabel htmlFor="n_document" size="2xl">
              Nº de documento
            </FormLabel>
            <Input
              placeholder="Nº de documento"
              id="n_document"
              name="n_document"
              type="number"
              onChange={handlerChange}
              value={form.n_document}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="***********"
              name="password"
              onChange={handlerChange}
              value={form.password}
            />
            {errors.length > 0 && (
              <>
                <AlertChakra
                  data={{ status: 'warning', description: errors[0].message }}
                  my={'10px'}
                ></AlertChakra>
              </>
            )}

            {errorApi && (
              <AlertChakra
                data={{ status: 'warning', description: errorApi }}
                my={'10px'}
              ></AlertChakra>
            )}
          </FormControl>
          <Button
            colorScheme="teal"
            variant="outline"
            width="full"
            mt="3"
            type="submit"
          >
            Ingresar
          </Button>
        </form>
      </Box>
    </Flex>
  )
}

export default FormLogin
