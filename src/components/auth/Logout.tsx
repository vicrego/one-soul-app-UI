import { Box, Button, Heading, Input, Link as ChakraLink, Text, InputGroup, Stack, useToast, FormErrorMessage, FormLabel, FormControl, VStack, InputRightElement, useDisclosure } from '@chakra-ui/react'
import { Formik, FormikProps, FormikHelpers as FormikActions, Form, FormikHelpers, ErrorMessage, Field } from 'formik'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styles from "./styles.module.css"
import Layoult from '../Layoult/Layoult'
import axios from 'axios'
import { useAuth } from '../../provider/authProvider'
import { toaster } from '../ui/toaster'
import { color } from 'framer-motion'
import { lightGreen, red } from '@mui/material/colors'
//import { PasswordStrengthMeter } from '../ui/password-input'


const Logout = () => {

  type Values = {
    username: string;  
    password: string;
  }
  const navigate = useNavigate();

  const { logUserIn } = useAuth();

  //const { setUser } = useContext(AuthContext); // Get setUser from AuthContext



  const [status, setStatus] = useState<any>();
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  

  const toast = useToast();





  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  

  function login(event: any) {
    //event.preventDefault();
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
      setStatus(res.status)
      if (res.status === 200) {
        setStatus({
          sent: true,
          msg: "Message has been sent! Thanks!"
        })
      }
      // Set other status if you like
      logUserIn();
      navigate("/");
      console.log(res.data);
    }).catch(err => {
      if (err.response.status === 400) {
        setStatus({
          sent: false,
          msg: `Username or Password is wrong. Please try again.`
        });
      };
      if (err.response.status === 404) {
        setStatus({
          sent: false,
          msg: `Error! Request failed with status code ${err.response.status}. Please try again later.`
        });
      }
    });
  }


  return (
    <Layoult>
      <Stack className={styles.styleForm} sx={{color: "white", fontFamily: "mono", alignItems: "center"}}>
       
       <Stack>
          <Heading sx={{margin: 10}}>Logout</Heading>
          <Box bg="white" p={6} w={"300px"} rounded="md">
            <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(value: any, actions: any) => {
              console.log("actions", actions.setErrors)
              login(value);
              actions.resetForm();
            }}
            >
            {({ isSubmitting }) => (
              <Form>
                <VStack>
                  <FormControl>
                    <FormLabel htmlFor="username" sx={{color: "black"}}>Username</FormLabel>
                    <Input  
                      placeholder="username"
                      sx={{color: "black", backgroundColor: "#CBCCF7", borderRadius: "5px", padding: "6px"}}
                      variant="subtle"
                      onChange={(e: any) => {
                        setLoginUsername(e.target.value);
                      }} 
                      name="username" 
                    />
                    <FormLabel htmlFor="password" sx={{color: "black"}}>Password</FormLabel>
                    <InputGroup margin={'auto'} style={{alignItems: 'center'}} >
                      <Input 
                        placeholder='password'
                        sx={{color: "black", backgroundColor: "#CBCCF7", borderRadius: "5px", padding: "6px"}}
                        onChange={(e: any) => {
                          setLoginPassword(e.target.value);
                        }} 
                        type={show ? 'text' : 'password'}
                        name="password" 
                        variant="filled"
                      />
                      <InputRightElement width='4.5rem' style={{height: "100%", textAlign: "center"}}>
                        <Button onClick={handleClick} style={{backgroundColor: "white", color: "gray", padding: 3, borderRadius: 10}}>
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>   
                    {status && status.msg && (
                      <Box w={200}>
                        <Text style={{color: 'red', marginTop: "15px", fontSize: 10}}
                          className={`alert ${
                            status.sent ? "alert-success" : "alert-error"
                          }`}
                        >
                          {status.msg}
                        </Text>
                      </Box>
                    )}
                    {console.log("status",status)}
                    
                    <Button
                      type="submit"
                      className="button-19"
                      sx={{display: "block", marginTop: "20px"}}
                      disabled={isSubmitting}
                    >
                      Submit 
                    </Button>
                    <Box sx={{textColor: "black"}}>
                      {isSubmitting && <span style={{color: "black"}}>Sending...</span>}
                    </Box>
                  </FormControl>
                </VStack>
              </Form>
              )}
            </Formik>
          </Box>
        </Stack>
        <Box>
          <Text>Don't have an account?</Text>
          {/*<ChakraLink
            as={NavLink}
            to="/signUp"
          >
            Sign Up
          </ChakraLink>*/}
        </Box>
      </Stack>
      </Layoult>
  )
}

export default Logout