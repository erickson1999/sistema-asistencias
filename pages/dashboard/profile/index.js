import { useEffect } from 'react'
import { FormUpdateProfileUser } from '../../../components/Forms/FormUpdateProfileUser'
import { useGetUserByToken } from '../../../hooks/useGetUserByToken'
import { Spinner, Flex } from '@chakra-ui/react'
import { ButtonDownloadCarnet } from '../../../components/Buttons/ButtonDownloadCarnet'
import { useProtectedRouteByToken } from '../../../hooks/useProtectedRouteByToken'
import { LayoutAdmin } from '../../../layouts/LayoutAdmin'
import { LayoutPracticing } from '../../../layouts/LayoutPracticing'
import { LayoutAssistant } from '../../../layouts/LayoutAssistant'
import axios from 'axios'
const index = () => {
  const { loading, error, user } = useGetUserByToken()
  const { role } = useProtectedRouteByToken()
  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .post(`/api/files/create/qr-license/${user._id}`)
  //       .then((res) => {
  //         console.log({ res })
  //       })
  //       .catch((err) => {})
  //   }
  // }, [user])

  return loading ? (
    <Flex w={'full'}>
      <Spinner></Spinner>
    </Flex>
  ) : error ? (
    <></>
  ) : (
    <>
      {role === 'none' && <></>}
      {role === 'practicing' && (
        <LayoutPracticing>
          <ButtonDownloadCarnet userData={user}></ButtonDownloadCarnet>
          <FormUpdateProfileUser userData={user}></FormUpdateProfileUser>
        </LayoutPracticing>
      )}
      {role === 'assistant' && (
        <LayoutAssistant>
          <ButtonDownloadCarnet userData={user}></ButtonDownloadCarnet>
          <FormUpdateProfileUser userData={user}></FormUpdateProfileUser>
        </LayoutAssistant>
      )}
      {role === 'admin' && (
        <LayoutAdmin>
          <ButtonDownloadCarnet userData={user}></ButtonDownloadCarnet>
          <FormUpdateProfileUser userData={user}></FormUpdateProfileUser>
        </LayoutAdmin>
      )}
    </>
  )
}

export default index
