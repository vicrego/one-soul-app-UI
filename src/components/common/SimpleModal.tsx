import { Box, Button, FormControl, FormLabel, Text, VStack } from '@chakra-ui/react'
import { CategoryOutlined, Email, Password } from '@mui/icons-material'
import { Modal, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { Formik, Form,Field } from 'formik'
import React, { useState } from 'react'
import { any, object, string, TypeOf } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { z } from "zod";


const SimpleModal = ({isOpen, onOpen, onClose, styles, category, userData, defaultValue}: any) => {

      const schemaMap: Record<string, z.ZodTypeAny> = {
        username: z.string({ required_error: "Please enter your username" }).min(6).max(36),
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
      };
      
      const contactFormSchema = z.object({
        [category]: schemaMap[category] || z.string().min(1),
      });


    let url = "";
    
    if(import.meta.env.VITE_ENV === "development"){
        url = `${import.meta.env.VITE_API_URL_DEVELOPMENT}`;
    } else {
        url = `${import.meta.env.VITE_API_URL_PRODUCTION}/auth/update${category}`;
    };
    
    const [status, setStatus] = useState<any>();
    const [userId, setUserId] = useState("");


    function update(category: any, updatedValue: any) {
        
        if(category === "username"){
            axios({
                method: "PUT",
                data: {
                    user: userData,
                    value: updatedValue
                },
                withCredentials: true,
                url: `${url}/auth/updateUsername`
            }).then((res) => {
                console.log("res", res)
            }).catch(err => {
        
            });    
        } else if (category === "email"){
            axios({
                method: "PUT",
                data: {
                    user: userData,
                    value: updatedValue
                },
                withCredentials: true,
                url: `${url}/auth/updateEmail`
            }).then((res) => {
        
            }).catch(err => {
        
            });
        } else if (category === "password"){
            axios({
                method: "PUT",
                data: {
                    user: userData,
                    value: updatedValue
                },
                withCredentials: true,
                url: `${url}/auth/updatePassword`
            }).then((res) => {
        
            }).catch(err => {
        
            });
        }
    }

    
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Stack sx={{ ...styles, width: "82%", pt: 2, pb: 10, gap: 2 }}>
            <Button variant="contained" sx={{marginRight: "auto"}} onClick={() => {onClose()}}>Back</Button>
            <Formik<{ [key: string]: string }>
                initialValues={{ [category]: defaultValue}}
                onSubmit={async (values: any, actions: any) => {      
                        console.log("value", values);
                        const updatedValue = values[category];
                        update(category, updatedValue);
                        actions.resetForm();
                        onClose();
                    }
                }
                validationSchema={toFormikValidationSchema(contactFormSchema)}
              >
              {({ values, handleChange, isSubmitting, errors }) => {
                return (
                <Form>
                    <FormControl>
                        <Typography id="modal-modal-title" variant="h6" component="h2">Edit {category}</Typography>
                        <TextField 
                            name={category} 
                            label={category} 
                            value={values[category] || ""}
                            onChange={handleChange}
                            sx={{width: "100%"}} 
                            size='small' 
                            id="outlined-basic" 
                            variant="outlined" 
                        /> {!!errors[category] && (
                            <Text className="form-text" sx={{color: "red", width: 250}}>
                              {errors[category]}
                            </Text>
                        )}
                      
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
                </Form>
                )}}
              </Formik>
            </Stack>
            
        </Modal>
    )
}

export default SimpleModal