import { Box, Button, Heading, Input, Link as ChakraLink, Text, InputGroup, Stack, useToast, FormErrorMessage, FormLabel, FormControl, VStack, InputRightElement, Checkbox } from '@chakra-ui/react'
import { Formik, FormikProps, FormikHelpers as FormikActions, Form, FormikHelpers, ErrorMessage, Field } from 'formik'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./styles.module.css"
import axios from 'axios'
import { useAuth } from '../../provider/authProvider'
import { object, string, TypeOf } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'


type ContactFormInputs = TypeOf<typeof contactFormSchema>

const contactFormSchema = object({
  
  username: string({
    required_error: "Please enter your name",
  }).min(6).max(36),
  password: string(),
});

const SignIn = () => {

  const [status, setStatus] = useState<any>();
  const [userId, setUserId] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show)
    
  const { logUserIn } = useAuth();
  
  useEffect(() => {
    logUserIn();
  }, [userId]);
  
  const toast = useToast();


  function login(username: any, password: any) {
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
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
      setUserId(res.data.userId);
      /*if(userId === ""){
        console.log("Missing Id")
      } else {
        
      }*/
      setStatus(res.status)
      if (res.status === 200) {
        setStatus({
          sent: true,
          msg: "Message has been sent! Thanks!"
        })
      }
      logUserIn();
    }).catch(err => {
      if (err.response === undefined) {
        setStatus({
          sent: false,
          msg: `Error! Something unusual has happened. Please try again later.`
        });
      }
      if (err.response.status === 400) {
        setStatus({
          sent: false,
          msg: `Username or Password is wrong. Please try again.`
        });
      } 
      if (err.response.status === 404) {
        setStatus({
          sent: false,
          msg: `Error! Request failed with status code ${err.response.status}. Please try again later.`
        });
      } 
    });
  }
  
  return (
    <Box>
      { ((useAuth().isAuthenticated === false)) &&     
      (
        <Stack className={styles.styleForm} sx={{color: "white", fontFamily: "mono", alignItems: "center"}}>
          <Stack>
            <Heading sx={{margin: 10}}>Sign In</Heading>
            <Box bg="white" p={6} w={"300px"} rounded="md">
              <Formik<ContactFormInputs>
                initialValues={{ username: "", password: ""/*, rememberMe: false*/ }}
                onSubmit={(value: any, actions: any) => {
                  let username = value.username;
                  let password = value.password;
                  login(username, password);
                  actions.resetForm();
                  }
                }
                validationSchema={toFormikValidationSchema(contactFormSchema)}
              >
              {({ isSubmitting, errors }) => {
                return (
                <Form>
                  <VStack>
                    <FormControl>
                      <FormLabel htmlFor="username" sx={{color: "black"}}>Username</FormLabel>     
                        <Field  
                          placeholder="username"
                          style={{color: "black", backgroundColor: "#CBCCF7", borderRadius: "5px", padding: "6px"}}
                          variant="subtle"
                          name="username" 
                        />{!!errors.username && (
                          <Text className="form-text" sx={{color: "red"}}>
                            {errors.username}
                          </Text>
                        )}
                      <FormLabel htmlFor="password" sx={{color: "black"}}>Password</FormLabel>
                      <InputGroup margin={'auto'} style={{alignItems: 'center'}} >
                        <Field 
                          placeholder='password'
                          style={{color: "black", backgroundColor: "#CBCCF7", borderRadius: "5px", padding: "6px"}}
                          type={show ? 'text' : 'password'}
                          name="password" 
                          variant="filled"
                        /> 
                        <InputRightElement width='4.5rem' style={{height: "100%", textAlign: "center"}}>
                          <Button onClick={handleClick} style={{backgroundColor: "white", color: "gray", padding: 3, borderRadius: 10}}>
                            {show ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup> {!!errors.password && (
                          <Text className="form-text" sx={{color: "red"}}>
                            {errors.password}
                          </Text>
                        )}   
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
                      {/*<Checkbox
                        //as={Checkbox}
                        id="rememberMe"
                        name="rememberMe"
                        colorScheme="purple"
                        style={{color: "black"}}
                      >
                        Remember me?
                      </Checkbox>
                      */}  
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
                )}}
              </Formik>
            </Box>
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
      )}
    </Box>
    )
}

export default SignIn