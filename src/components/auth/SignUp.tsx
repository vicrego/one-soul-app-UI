import { Box, Button, Link as ChakraLink, Checkbox, Flex, Heading, Image, Input, Spacer, Stack, Text } from '@chakra-ui/react'
import { Formik, FormikProps } from 'formik'
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import style from "./styles.module.css"
import SignUpImage from '../../assets/images/Signup-Image.jpg'
import axios from 'axios'

const SignUp = () => {
  //const location = useLocation();
  //let props = location.state;

  type Values = {
    username: string;
    //secondName: string;  
    email: string;
    password: string;
  }


  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  

  function register() {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:5050/auth/register",
    }).then((res) => {
      console.log(res.data);

    }).catch((err) => {
      console.log("err", err)
    });
  }

  
  return (
    /*<Layoult props={props.props}>*/
    <Stack sx={{color: "white"}}>
      {/*
      <Stack>
        <Heading sx={{marginBottom: 4}}>Sign Up</Heading>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={console.log}
        >
        {(props: FormikProps<Values>) => (
          <form onSubmit={props.handleSubmit}>
            <Stack spacing={1}>
              <Text mb='8px'>First Name: </Text>
              <Input  
                placeholder="username"                 
                onChange={(e) => {
                  console.log("username", e.target.value)
                  setRegisterUsername(e.target.value);
                }} 
                name="username" 
              />
              <Input  
                placeholder="email"                 
                onChange={(e) => {
                  console.log("email", e.target.value)
                  setRegisterEmail(e.target.value);
                }} 
                name="email" 
              />
              <Input mb='8px'
                placeholder="password"
                onChange={(e) => {
                  console.log("pass", e.target.value)
                  setRegisterPassword(e.target.value);
                }}
              />
              <Button type="submit" onClick={register}>Submit</Button>
            </Stack>
          </form>
        )}
        </Formik>
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
      */}

      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Sign in to your account</Heading>
            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              onSubmit={console.log}
            >
            {(props: FormikProps<Values>) => (
              <form onSubmit={props.handleSubmit}>
                <Stack spacing={1}>
                  <Text mb='8px'>First Name: </Text>
                  <Input  
                    color={"black"}
                    placeholder="username"                 
                    onChange={(e) => {
                      console.log("username", e.target.value)
                      setRegisterUsername(e.target.value);
                    }} 
                    name="username" 
                  />
                  <Input  
                    color={"black"}
                    placeholder="email"                 
                    onChange={(e) => {
                      console.log("email", e.target.value)
                      setRegisterEmail(e.target.value);
                    }} 
                    name="email" 
                  />
                  <Input mb='8px'
                    color={"black"}
                    placeholder="password"
                    onChange={(e) => {
                      console.log("pass", e.target.value)
                      setRegisterPassword(e.target.value);
                    }}
                  />
                  <Button type="submit" onClick={register}>Submit</Button>
                </Stack>
              </form>
            )}
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
            src={
              SignUpImage
              //'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
          />
        </Flex>
      </Stack>



    </Stack>
    /*</Layoult>*/
  )
}

export default SignUp