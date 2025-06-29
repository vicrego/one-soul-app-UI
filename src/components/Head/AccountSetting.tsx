import { Button, Flex, HStack, Stack, Table, useDisclosure, VStack } from '@chakra-ui/react';
import { Alert, Box, Grid, Modal, Snackbar, SnackbarOrigin, styled, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SimpleModal from '../common/SimpleModal';
import { useAuth } from '../../provider/authProvider';
import { set } from 'zod';
import zIndex from '@mui/material/styles/zIndex';

interface State extends SnackbarOrigin {
    open: boolean;
  }
  

const AccountSetting = ({isOpenAccountSettings, onOpenAccountSettings, onCloseAccountSettings}: any) => {
    
    const { userData, setUserData } = useAuth();
    const {refreshUser} = useAuth();
   
    const { 
        isOpen: isOpenUsername, 
        onOpen: onOpenUsername, 
        onClose: onCloseUsername,
    } = useDisclosure()

    const { 
        isOpen: isOpenEmail, 
        onOpen: onOpenEmail, 
        onClose: onCloseEmail,
    } = useDisclosure()

    const { 
        isOpen: isOpenPassword, 
        onOpen: onOpenPassword, 
        onClose: onClosePassword,
    } = useDisclosure()

    const [submited, setSubmited] = useState(false);
    
    const handleClick = (newState: SnackbarOrigin) => () => {
        setToast({ ...newState, open: true });
    };

    
    //Refresh userData based on user's update
    useEffect(() =>{
        const refresh = async () => { 
            let data = await refreshUser();
            if(data && submited){
                console.log("data", data);
                setUserData(data);
                handleClick({ vertical: 'bottom', horizontal: 'center' })();
                setSubmited(false);
            }
            return data;
        }
        refresh();
   }, [submited]);

    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
        background: 'white',
        color: 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 5,
        borderRadius: "5px",
        
    };

    const [toast, setToast] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open }: any = toast;


    const handleClose = () => {
        setToast({ ...toast, open: false });
    };
    
    const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
        zIndex: 20000,
      }));
    
    return (
        <Box>
            <Modal
                open={isOpenAccountSettings}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Account Settings
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>  
                        <Grid sx={{display: 'flex', alignItems: "center"}} item xs={4}>
                            <Typography id="modal-modal-description">
                                Username: 
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <HStack>
                                <Typography id="modal-modal-description">{userData?.data?.username}</Typography>
                                <Button onClick={onOpenUsername}>{">"}</Button>
                            </HStack>
                        </Grid>
                        <SimpleModal isOpen={isOpenUsername} onOpen={onOpenUsername} onClose={onCloseUsername} styles={styles} category={"username"} userData={userData} defaultValue={userData?.data?.username} setSubmited={setSubmited}/>
                        <Grid sx={{display: 'flex', alignItems: "center"}} item xs={4}>
                            <Typography id="modal-modal-description">
                                Email:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{backgroundColor: "blue"}}>
                            <HStack sx={{backgroundColor: "red"}}>
                                <Typography sx={{width: "100%"}} id="modal-modal-description">
                                    {userData?.data?.email}
                                </Typography>
                                <Button onClick={onOpenEmail}>{">"}</Button>                                                 
                            </HStack>
                        </Grid>
                        <SimpleModal isOpen={isOpenEmail} onOpen={onOpenEmail} onClose={onCloseEmail} styles={styles} category={"email"} userData={userData} defaultValue={userData?.data?.email} setSubmited={setSubmited}/>
                        <Grid sx={{display: 'flex', alignItems: "center"}} item xs={6}>
                            <Typography id="modal-modal-description"> 
                                Password: {/*userData?.data?.username*/}
                            </Typography>
                        </Grid>          
                        <Grid>
                            <SimpleModal isOpen={isOpenPassword} onOpen={onOpenPassword} onClose={onClosePassword} styles={styles} category={"password"} userData={userData} setSubmited={setSubmited}/>
                        </Grid>    
                        <Button onClick={onOpenPassword}>{">"}</Button>  
                    </Grid>
                
                    <Flex>
                        <Button variant="contained" sx={{marginLeft: "auto"}} 
                        onClick={() => {
                            onCloseAccountSettings();
                            //setOpen(false);
                            //setFirstTimeEntry(false); 
                        }}
                        >
                        I'm Ready!
                        </Button>
                    </Flex>
                </Box>
            </Modal>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={6000}
                open={open}
                key={vertical + horizontal}
                
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    "Updated Successfully."
                </Alert>
            </Snackbar>
        
        </Box>
    )

}

export default AccountSetting