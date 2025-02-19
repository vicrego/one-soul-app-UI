import { Box, Button, Link as ChakraLink, Checkbox, Flex, Heading, Image, Input, InputGroup, InputRightElement, Spacer, Stack, Text } from '@chakra-ui/react'
import { Field, Form, Formik, FormikProps } from 'formik'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import SignUpImage from '../../assets/images/signup-image.jpg'
import axios from 'axios'
import { useAuth } from '../../provider/authProvider'
import { object, string, TypeOf, z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'


type ContactFormInputs = TypeOf<typeof contactFormSchema>

const contactFormSchema = object({
  username: z.string({
    required_error: "Please enter your name",
  }).min(6).max(36),
  email: z.string().email("Please enter a valid email"),
  password: z.string()
  .min(8)
  .max(20)
  .refine((password) => /[A-Z]/.test(password), {
    message: "At least one uppercase character is needed.",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "At least one lowercase character is needed.",
  })
});


const SignUp = () => {
 
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show)
  const { logUserIn } = useAuth();

  function register(username: string, email: string, password: any) {
    axios({
      method: "POST",
      data: {
        username: username,
        email: email,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:5050/auth/register",
    }).then((res) => {
      logUserIn();
    }).catch((err) => {
      console.log("err", err)
    });
  }

  
  return (
    <Stack sx={{color: "white"}}>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Sign Up</Heading>
            <Formik<ContactFormInputs>
              initialValues={{ username: "", email: "", password: "" }}
              onSubmit={(value: any, actions: any) => {
                let username = value.username;
                let email = value.email;
                let password = value.password;
                register(username, email, password )
              }}
              validationSchema={toFormikValidationSchema(contactFormSchema)}
            >
            {({errors}) => {
              return (
              <Form>
                <Stack spacing={1} >
                  <Field  
                    style={{color: "black", backgroundColor: "#CBCCF7", borderRadius: "5px", padding: "6px"}}
                    placeholder="username"                 
                    name="username" 
                  /> {!!errors.username && (
                    <Text className="form-text" sx={{color: "red"}}>
                      {errors.username}
                    </Text>
                  )}
                  <Field  
                    style={{color: "black", backgroundColor: "#CBCCF7", borderRadius: "5px", padding: "6px"}}
                    placeholder="email"                 
                    name="email" 
                  /> {!!errors.email && (
                    <Text className="form-text" sx={{color: "red"}}>
                      {errors.email}
                    </Text>
                  )}
                  <InputGroup margin={'auto'} style={{alignItems: 'center'}} >
                    <Field
                      as={Input}
                      name="password" 
                      type={show ? 'text' : 'password'}
                      placeholder='password'
                      variant="filled"
                      style={{
                        color: "black", 
                        backgroundColor: "#CBCCF7", 
                        borderRadius: "5px", 
                        padding: "6px", 
                        width: "100%"
                      }}
                    /> 
                    <InputRightElement width='4.5rem' style={{height: "100%", textAlign: "center"}}>
                      <Button onClick={handleClick} style={{backgroundColor: "purple", color: "white", padding: 3, borderRadius: 10}}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup> {!!errors.password && (
                    <Text className="form-text" sx={{color: "red"}}>
                      {errors.password}
                    </Text>
                  )}
                  <Button
                    type="submit"
                    className="button-19"
                    sx={{alignSelf: "center", marginTop: "20px"}}
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}}
            </Formik>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.500'}>Forgot password?</Text>
              </Stack>
              <Box >
                <Text>Already have an account?</Text>
                <ChakraLink
                  as={NavLink}
                  to="/signIn"
                  //state={{props: props.props}}
                >
                  Sign In
                </ChakraLink>
              </Box>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={SignUpImage}
          />
        </Flex>
      </Stack>
    </Stack>
  )
}

export default SignUp