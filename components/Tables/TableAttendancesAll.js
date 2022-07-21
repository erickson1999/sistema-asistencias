import React from 'react'
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Flex,
  Divider
} from '@chakra-ui/react'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

export const TableAttendancesAll = ({ attendances, from }) => {
  const fullNameUser = `${attendances[0].user.names} ${attendances[0].user.last_names}`
  let temprano = 0
  let tarde = 0
  let falta = 0
  let permiso = 0
  attendances = attendances.map((attendance) => {
    let { status_attendance, type_attendance, updatedAt } = attendance

    switch (type_attendance) {
      case 'entry':
        type_attendance = 'Entrada'
        break
      case 'exit':
        type_attendance = 'Salida'
        break
      default:
        type_attendance = '--'
    }

    switch (status_attendance) {
      case 'temprano':
        status_attendance = 'Temprano'
        temprano += 1
        break
      case 'tarde':
        status_attendance = 'Tarde'
        tarde += 1
        break
      case 'falta':
        status_attendance = 'Falta'
        falta += 1
        break
      case 'permiso':
        status_attendance = 'Permiso'
        permiso += 1
        break
      case 'registrado':
        status_attendance = 'Registrado'
        break
      default:
        status_attendance = '--'
    }
    updatedAt = moment(updatedAt).format('LLL')

    return { ...attendance, type_attendance, updatedAt, status_attendance }
  })

  return (
    <>
      {from === 'dashboard' ? (
        <></>
      ) : (
        <Text fontSize="2xl">{fullNameUser}</Text>
      )}
      {from === 'dashboard' ? (
        <></>
      ) : (
        <Flex w={'50%'} mx={'auto'} justify={'space-between'}>
          <Text
            fontSize={'xl'}
            backgroundColor="green.200"
            padding={'5px'}
            borderRadius={'7px'}
          >
            Temprano: {temprano}
          </Text>
          <Text
            fontSize={'xl'}
            backgroundColor="orange.200"
            padding={'5px'}
            borderRadius={'7px'}
          >
            Tarde: {tarde}
          </Text>
          <Text
            fontSize={'xl'}
            backgroundColor="red.200"
            padding={'5px'}
            borderRadius={'7px'}
          >
            Falta: {falta}
          </Text>{' '}
          <Text
            fontSize={'xl'}
            backgroundColor="gray.200"
            padding={'5px'}
            borderRadius={'7px'}
          >
            Permiso: {permiso}
          </Text>
        </Flex>
      )}
    <Divider my={"10px"}></Divider>
      <TableContainer w="100%">
        <Table variant="striped" colorScheme="gray" overflowY={'scroll'}>
          <Thead>
            <Tr>
              {from === 'dashboard' ? <Th>Nombre completo</Th> : <></>}
              <Th>Fecha y hora</Th>
              <Th>Registrado por</Th>
              <Th>Entrada/Salida</Th>
              <Th>Estado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {attendances.map((attendance, index) => {
              return (
                index <= 9 && (
                  <Tr key={uuid()}>
                    {from === 'dashboard' ? (
                      <Td>
                        {`${attendance.user.names} ${attendance.user.last_names}`}
                      </Td>
                    ) : (
                      <></>
                    )}
                    <Td>{attendance.updatedAt}</Td>
                    <Td>
                      {attendance.registered_by
                        ? `${attendance.registered_by.names} ${attendance.registered_by.last_names}`
                        : '--'}
                    </Td>
                    <Td>{attendance.type_attendance}</Td>
                    <Td
                      textColor={
                        attendance.status_attendance == 'Temprano'
                          ? 'green.500'
                          : attendance.status_attendance == 'Tarde'
                          ? 'orange.500'
                          : attendance.status_attendance == 'Falta'
                          ? 'red.500'
                          : 'gray.600'
                      }
                    >
                      {attendance.status_attendance}
                    </Td>
                  </Tr>
                )
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
