import { Box, Button, Link as ChakraLink, Heading, Input, Spacer, Stack, Text } from '@chakra-ui/react'
import { Formik, FormikProps } from 'formik'
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import style from "./styles.module.css"
import Layoult from '../Layoult/Layoult'
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
    });
  }

  
  return (
    /*<Layoult props={props.props}>*/
      <Stack className={style.styleForm}  sx={{color: "white", fontFamily: "mono", marginTop: 10}}>
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
      </Stack>
    /*</Layoult>*/
  )
}

export default SignUp