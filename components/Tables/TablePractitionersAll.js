import React from 'react'
import { BsEye, BsListCheck } from 'react-icons/bs'
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from '@chakra-ui/react'
import moment from 'moment'
import { v4 as uuid } from 'uuid'
import NextLink from 'next/link'

export const TablePractitionersAll = ({ practitioners }) => {
  practitioners = practitioners.map((practicing) => {
    let season = practicing.season.find((season) => season.status == true)
    let newPracticing = {
      ...practicing,
      season: {
        season_start: moment(season.season_start).format('LL'),
        season_end: moment(season.season_end).format('LL')
      }
    }
    return newPracticing
  })
  console.log(practitioners)
  practitioners = practitioners.filter((practicing) => {
    if (practicing.status === true) {
      return true
    } else {
      false
    }
  })

  return (
    <>
      <TableContainer w="100%">
        <Table variant="striped" colorScheme="gray" overflowY={'scroll'}>
          <Thead>
            <Tr>
              <Th>Nombre completo</Th>
              <Th>Inicio Practicas</Th>
              <Th>Fin Prácticas</Th>
              <Th>Nota Asistencias</Th>
              <Th>Opciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {practitioners.map((practicing) => (
              <Tr key={uuid()}>
                <Td>{`${practicing.names} ${practicing.last_names}`}</Td>
                <Td>{practicing.season.season_start}</Td>
                <Td>{practicing.season.season_end}</Td>
                <Td>20</Td>
                <Td>
                  <NextLink  href={`/practitioners/${practicing._id}`}>
                    <a>
                      <BsListCheck size={'20px'} />
                    </a>
                  </NextLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
