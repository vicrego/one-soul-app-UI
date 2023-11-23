import { Box, Button, Link as ChakraLink, Heading, Input, Spacer, Stack, Text } from '@chakra-ui/react'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { NavLink } from 'react-router-dom'
import style from "./styles.module.css"

const SignUp = () => {
  type Values = {
    firstName: string;
    secondName: string;  
    email: string;
    password: string;
  }
  return (
    <Stack className={style.styleForm}>
      <Stack>
        <Heading>Sign Up</Heading>
        <Formik
        initialValues={{ firstName: "", secondName: "", email: "", password: "" }}
        onSubmit={console.log}
        >
        {(props: FormikProps<Values>) => (
          <form onSubmit={props.handleSubmit}>
            <Stack spacing={1}>
              <Text mb='8px'>First Name: </Text>
              <Input name="firstName" />
              <Text mb='8px'>Second Name: </Text>
              <Input name="secondName" />
              <Text mb='8px'>Email: </Text>
              <Input name="email" />
              <Text mb='8px'>Password</Text>
              <Input name="password" />
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        )}
        </Formik>
      </Stack>
      <Box>
        <Text>Already have an account?</Text>
        <ChakraLink
            as={NavLink}
            to="/signIn"
          >
          Sign In
        </ChakraLink>
      </Box>
    </Stack>
  )
}

export default SignUp