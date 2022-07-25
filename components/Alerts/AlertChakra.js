import React, { useState, useEffect } from 'react'
import {
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react'

export const AlertChakra = ({
  data = {title:"", description:"", status:""},
  timeout = false,
  timer = 2000,
  ...props
}) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (timeout && timer) {
      const time = setTimeout(() => {
        setShow(false)
        clearTimeout(time)
      }, timer)
    }
  }, [])

  return (
    <>
      {show ? (
        <Alert
          {...props}
          rounded={'10px'}
          status={data.status ? data.status : 'error'}
        >
          <AlertIcon></AlertIcon>
          {data.title && <AlertTitle>{data.title}</AlertTitle>}
          {data.description && (
            <AlertDescription>{data.description}</AlertDescription>
          )}
        </Alert>
      ) : (
        <></>
      )}
    </>
  )
}
