import { Box, Button, Heading, Input, Link as ChakraLink, Text, InputGroup, Stack } from '@chakra-ui/react'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./styles.module.css"

const SignIn = () => {

  type Values = {
    userName: string;  
    email: string;
    password: string;
  }

  return (
    <Stack className={styles.styleForm} >
      <Stack>
        <Heading>Sign In</Heading>
        <Formik
          initialValues={{ userName: "", email: "", password: "" }}
          onSubmit={console.log}
        >
          {(props: FormikProps<Values>) => (
            <form onSubmit={props.handleSubmit}>
              <Stack spacing={1}>
                <Text mb='8px'>User Name: </Text>
                <Input name="userName" />
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
        <Text>Don't have an account?</Text>
        <ChakraLink
          as={NavLink}
          to="/signUp"
        >
          Sign Up
        </ChakraLink>
      </Box>
    </Stack>
  )
}

export default SignIn