import { FormUpdateProfileUser } from '../../Forms/FormUpdateProfileUser'
import { ButtonDownloadCarnet } from '../../Buttons/ButtonDownloadCarnet'
import { Flex } from '@chakra-ui/react'
export const TakePractitionerProfile = ({ userData }) => {
  //notes:
  //add seurity to this page

  return (
    <>
      <Flex w={'100%'} justify={"center"}>
        <ButtonDownloadCarnet userData={userData}></ButtonDownloadCarnet>
      </Flex>
      <FormUpdateProfileUser userData={userData}></FormUpdateProfileUser>
    </>
  )
}
