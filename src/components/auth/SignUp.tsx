import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SignUpImage from '../../assets/images/signup-image.jpg'
import axios from 'axios'
import { useAuth } from '../../provider/authProvider'
import { object, string, TypeOf, z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'


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
 
  const [usernameError, setUsernameError] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { logUserIn } = useAuth();

  let url: string;

  if(import.meta.env.VITE_ENV === "development"){
    url = `${import.meta.env.VITE_API_URL_DEVELOPMENT}/auth/register`;
  } else {
    url = `${import.meta.env.VITE_API_URL_PRODUCTION}/auth/register`;
  }

  function register(username: string, email: string, password: any) {
    axios({
      method: "POST",
      data: {
        username: username,
        email: email,
        password: password,
      },
      withCredentials: true,
      url: url
    }).then((res) => {
      logUserIn();  
    }).catch((err) => {
      setUsernameError(err.response.data.message);
    });
  }

  let formStyle = {
    color: "black",
    backgroundColor: "#CBCCF7",
    //backgroundColor: "#7a1111",
    borderRadius: "5px",
    width: "250px",
    padding: "9px"
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Stack sx={{color: "white"}}>
      <Stack sx={{minHeight: '100vh'}} direction={{ base: 'column', md: 'row' }}>
        <Stack sx={{p: 8, flex: 1, justifyContent: "center"}}>
          <Stack spacing={4} sx={{maxWidth: 'md', width: 'full'}}>
            <Typography /*as='h4'*/ fontFamily={'inherit'} >SIGN UP</Typography>
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
                <Stack spacing={1.5} alignItems={"center"}>
                  <Field  
                    style={{
                      color: formStyle.color,
                      backgroundColor: formStyle.backgroundColor, 
                      borderRadius: formStyle.borderRadius, 
                      width: formStyle.width, 
                      padding: formStyle.padding,
                    }}
                    placeholder="username"                 
                    name="username" 
                  /> {!!errors.username && (
                    <Typography className="form-text" sx={{color: "red"}}>
                      {errors.username}
                    </Typography>
                  )}
                  {usernameError != "" && (
                    <Typography className="form-text" sx={{color: "red"}}>
                      {usernameError}
                    </Typography>
                  )}
                  <Field  
                    style={{
                      color: formStyle.color,
                      backgroundColor: formStyle.backgroundColor, 
                      borderRadius: formStyle.borderRadius, 
                      width: formStyle.width, 
                      padding: formStyle.padding,
                    }}
                    placeholder="email"                 
                    name="email" 
                  /> {!!errors.email && (
                    <Typography className="form-text" sx={{color: "red"}}>
                      {errors.email}
                    </Typography>
                  )}
                    <Field
                      name="password" 
                      type={showPassword ? 'text' : 'password'}
                      placeholder='password'
                      variant="filled"
                      style={{
                        color: formStyle.color,
                        backgroundColor: formStyle.backgroundColor, 
                        padding: formStyle.padding,
                        borderRadius: formStyle.borderRadius,
                        width: formStyle.width
                      }}
                    /> 
                     
                  {!!errors.password && (
                    <Typography className="form-text" sx={{color: "red"}}>
                      {errors.password}
                    </Typography>
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
            {/*
              <Stack
                sx={{justifyContent: 'space-between', alignContent: 'start'}}
                direction={{ base: 'column', sm: 'row' }}
              >
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <Typography color={'blue.500'}>Forgot password?</Typography>
              </Stack>
              */}
              <Box>
                <Typography>Already have an account?</Typography>
                <Link
                  to="/signIn"
                >
                  Sign In
                </Link>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack flex={1}>
          <img
            style={{height: "100%", width: "100%", objectFit: "cover"}}
            alt={'Login Image'}
            src={SignUpImage}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default SignUp