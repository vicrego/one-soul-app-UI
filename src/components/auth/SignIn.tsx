import { Box, Button, Heading, Input, Link as ChakraLink, Text, InputGroup, Stack, useToast } from '@chakra-ui/react'
import { Formik, FormikProps, FormikHelpers as FormikActions, Form, FormikHelpers } from 'formik'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styles from "./styles.module.css"
import Layoult from '../Layoult/Layoult'
import axios from 'axios'
import { useAuth } from '../../provider/authProvider'


const SignIn = () => {

  type Values = {
    username: string;  
    password: string;
  }
  const navigate = useNavigate();

  const { logUserIn } = useAuth();

  //const { setUser } = useContext(AuthContext); // Get setUser from AuthContext



  const [state, setState] = useState<any>();
  let [user, setUser] = useState(null);
  
  

  const toast = useToast();





  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  function login() {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:5050/auth/login",
    }).then((res) => {
      /*toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })*/
     logUserIn();
      
      //setUser(res.data.user);
      navigate("/");
      console.log(res.data);
     
    });
  }


  return (
      <Stack className={styles.styleForm} sx={{color: "white", fontFamily: "mono", marginTop: 10}}>
        <Stack>
          <Heading sx={{marginBottom: 4}}>Sign In</Heading>
          <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(value, action) => {
            console.log("Values", value);
            action.resetForm();
          }}
          /*
          onSubmit={(
            values: Values,
            { setStatus, resetForm }: FormikActions<Values>            
          ) =>  {
            axios({
              method: "post",
              url: "http://localhost:5050/auth/login",
              data: { values }
            })
              .then(res => {
                setStatus(res.status)
                if (res.status === 200) {
                  resetForm()
                  setStatus({
                    sent: true,
                    msg: "Message has been sent! Thanks!"
                  })
                }
                // Set other status if you like
              })
              .catch(err => {
                resetForm()
                setStatus({
                  sent: false,
                  msg: `Error! ${err}. Please try again later.`
                })
              })
          }}
              */
          >
          {({ isSubmitting, status }) => (
            <Form onSubmit={login}>
              <Input  
                placeholder="username"                 
                onChange={(e) => {
                  setLoginUsername(e.target.value);
                }} 
                name="username" 
              />
              <Input  
                placeholder="password"                 
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }} 
                name="username" 
              />
              {status && status.msg && (
                <p
                  className={`alert ${
                    status.sent ? "alert-success" : "alert-error"
                  }`}
                >
                  {status.msg}
                </p>
              )}
              <Button
                type="submit"
                style={{
                  display: "block"
                }}
                disabled={isSubmitting}
                onClick={login}
              >
                Submit {isSubmitting && <span>Sending...</span>}
              </Button>
            </Form>
            )}
          </Formik>

          {/*
          <Formik
            initialValues={initialValues}
            onSubmit={(
              values: Values,
              { setStatus, resetForm }: FormikActions<Values>
            ) => {
              axios({
                method: "post",
                url: "http://localhost:5050/auth/login/password",
                data: { values }
              })
                .then(res => {
                  setStatus(res.status)
                  if (res.status === 200) {
                    resetForm()
                    setStatus({
                      sent: true,
                      msg: "Message has been sent! Thanks!"
                    })
                  }
                  // Set other status if you like
                })
                .catch(err => {
                  resetForm()
                  setStatus({
                    sent: false,
                    msg: `Error! ${err}. Please try again later.`
                  })
                })
            }}
          >
            {(props: FormikProps<Values>) => (
              <form onSubmit={props.handleSubmit}>
                <Stack spacing={1} >
                  <Text mb='8px'>User Name: </Text>
                  <Input  name="username" onChange={handleChange} />
                  <Text mb='8px'>Password</Text>
                  <Input name="password" onChange={handleChange} />
                  <Button type="submit" >Submit</Button>
                </Stack>
              </form>
            )}
          </Formik>*/}
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