import { Formik, Form,Field } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from "./styles.module.css"
import axios from 'axios'
import { useAuth } from '../../provider/authProvider'
import { object, string, TypeOf } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { BorderStyle, Visibility, VisibilityOff } from '@mui/icons-material'
import LoaderLogo, { LoaderLogoRemover } from '../common/LoaderLogo'
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import { log } from 'console'


type ContactFormInputs = TypeOf<typeof contactFormSchema>
console.log("signIn")
const contactFormSchema = object({
  username: string({
    required_error: "Please enter your name",
  })//*.min(6).max(36)*/
  ,
  password: string(),
});

const SignIn = () => {

  const [status, setStatus] = useState<any>();
  //const [userId, setUserId] = useState("");
  const [userLogged, setUserLogged] = useState(false);
    
  const { logUserIn } = useAuth();
  
  useEffect(() => {
    console.log("userlogged 1", userLogged);
    logUserIn();
    setUserLogged(true);
    console.log("userlogged 2", userLogged);
  }, [/*userId*/]);

/*
  useEffect(() => {
    (async () => {
      logUserIn()
      setUserLogged(true);  
      /*
      setUserLogged(false); // hide loader, regardless of result
      if (isLogged) {
        navigate("/dashboard");
      }
      */
  //  })();
  //}, []);

  let url: string;

  const navigate = useNavigate();

  if(import.meta.env.VITE_ENV === "development"){
    url = `${import.meta.env.VITE_API_URL_DEVELOPMENT}/auth/login`;
  } else {
    url = `${import.meta.env.VITE_API_URL_PRODUCTION}/auth/login`;
  }

  function login(username: any, password: any) {
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: url
    }).then((res) => {
      //setUserId(res.data.userId);
      setStatus(res.status)
      if (res.status === 200) {
        setStatus({
          sent: true,
          msg: "Sign In Successful!"
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
  
  let formStyle = {
    color: "black",
    backgroundColor: "#CBCCF7",
    borderRadius: "5px",
    width: "250px",
    padding: "13px"
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Box sx={{marginLeft: "auto", marginRight: "auto"}}>

      {((useAuth().isAuthenticated === true)) ?
        (
          <LoaderLogo/>
        ) : (
          <LoaderLogoRemover/>
        )
      }
      
      {/*
      {!userLogged ?
        (
          <LoaderLogo/>
        ) : (
          <LoaderLogoRemover/>
        )
      }
        */}
      { ((useAuth().isAuthenticated === false)) &&     
      (
        <Stack className={styles.wrapperStyle} sx={{color: "white", fontFamily: "mono", alignItems: "center"}}>
          
          <Stack sx={{margin: 9}}>
            <Box sx={{ marginLeft: "auto", marginRight: "auto"}}>
              <img style={{width: "15rem"}} src="./logo-initializer.jpeg" />
            </Box>
            <Typography /*as='h4'*/ fontFamily={'inherit'} >SIGN IN</Typography>
            <Box /*bg="white"*/ sx={{/*p: 6*/ w: "400px", rounded: "md"}} >
              <Formik<ContactFormInputs>
                initialValues={{ username: "", password: ""/*, rememberMe: false*/ }}
                onSubmit={(value: any, actions: any) => {
                  console.log("value", value)
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
                  <Stack spacing={1.7} alignItems={"center"}>
                    <Field
                      placeholder="username"
                      style={{
                        color: formStyle.color,
                        backgroundColor: formStyle.backgroundColor, 
                        //borderRadius: formStyle.borderRadius, 
                        width: formStyle.width, 
                        padding: formStyle.padding,
                        border: "none"
                      }}
                      //variant="subtle"
                      name="username" 
                    />
                    {status && status.msg && (
                      <Box /*w={200}*/>
                        <Typography 
                          style={{
                            color: 'red', 
                            marginTop: "15px", 
                            fontSize: 13
                          }}
                          className={`alert ${
                            status.sent ? "alert-success" : "alert-error"
                          }`}
                        >
                          {status.msg}
                        </Typography>
                      </Box>
                    )}
                    
                      <Stack 
                        direction={"row"} 
                        sx={{
                          //width: "100%",
                          borderRadius: formStyle.borderRadius, 
                          //width: formStyle.width,
                          //padding: formStyle.padding,
                        }}
                      >
                       
                        <Field 
                          placeholder='password'
                          type={showPassword ? 'text' : 'password'}
                          name="password" 
                          //variant="filled"
                          
                          style={{
                            color: formStyle.color,
                            backgroundColor: formStyle.backgroundColor, 
                            padding: formStyle.padding,
                            width: formStyle.width,
                            border: "none",
                          }}
                    
                        /> 
                       {/*
                        <Box 
                          sx={{
                            backgroundColor: "rgb(59, 59, 59)",//formStyle.backgroundColor, 
                            //width: "20%",
                          }}>
                        
                          <IconButton
                            sx={{
                              justifyContent: "center", 
                              color: "white",
                              padding: 0,
                              //padding: formStyle.padding,
                            }}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="start"
                            aria-label="toggle password visibility"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </Box>
                        */}
                        {/*
                      </Stack>
                      */}
                      {/*
                      <Box sx={{alignSelf: "center"}}>
                        <InputAdornment position="end" style={{color: "gray"}} >
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      </Box>
                      */}
                      
                    </Stack>
                    

                   
                    
                    <Button
                      type="submit"
                      className="button-19"
                      sx={{display: "block", marginTop: "20px", color: "white"}}
                      disabled={isSubmitting}
                    >
                      Submit 
                    </Button>
                    <Box sx={{textColor: "white"}}>
                      {isSubmitting && <span style={{color: "black"}}>Sending...</span>}
                    </Box>
                  </Stack>
                </Form>
                )}}
              </Formik>
            </Box>
          </Stack>
          <Box>
            <Typography>Don't have an account?</Typography>
            <Link
              //component={"button"}
              //as={NavLink}
              to="/signUp"
              
            >
              Sign Up
            </Link>
          </Box>
        </Stack>
      )}
      
      
    </Box>
    )
}

export default SignIn