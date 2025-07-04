import { Button, Flex, HStack, Stack, Table, useDisclosure, VStack } from '@chakra-ui/react';
import { Alert, Box, Grid, Modal, Snackbar, SnackbarOrigin, styled, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SimpleModal from '../common/SimpleModal';
import { useAuth } from '../../provider/authProvider';
import CloseIcon from '@mui/icons-material/Close';
import { KeyboardArrowRight } from '@mui/icons-material';

interface State extends SnackbarOrigin {
    open: boolean;
}
  

const AccountSetting = ({isOpenAccountSettings, onOpenAccountSettings, onCloseAccountSettings}: any) => {
    
    const { userData, setUserData } = useAuth();
    const {refreshUser} = useAuth();
   console.log("userData", userData)
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
    
    const handleSuccess = (newState: SnackbarOrigin) => () => {
        setToast({ ...newState, open: true });
    };
    const handleError = (newState: SnackbarOrigin) => () => {
        setToast({ ...newState, open: true });
    };

    
    //Refresh userData based on user's update
    useEffect(() =>{
        const refresh = async () => { 
            let data = await refreshUser();
            if(data && submited){
                console.log("data", data);
                setUserData(data);
                handleSuccess({ vertical: 'bottom', horizontal: 'center' })();
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
        width: "100%",
        height: "100%",
        background: 'white',
        color: 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 5,
        borderRadius: "30px",
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
        <Box >
            <Modal
                open={isOpenAccountSettings}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                //sx={{backgroundColor: "red"}}
            >
                
                <Box sx={styles}>
                    <CloseIcon onClick={() => {
                        onCloseAccountSettings();
                        //setOpen(false);
                        //setFirstTimeEntry(false); 
                    }}/>
                    <Box sx={{paddingTop: 2, paddingBottom: 1}}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Account Settings
                        </Typography>
                    </Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> 
                        <>
                            <Grid sx={{display: 'flex', alignItems: "center"}} item xs={4}>
                                <Typography id="modal-modal-description">
                                    Username: 
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                    <Typography id="modal-modal-description">{userData?.data?.username}</Typography>    
                            </Grid>
                            <Grid item xs={3}>
                                <Button onClick={onOpenUsername}><KeyboardArrowRight/></Button>
                            </Grid>
                            <SimpleModal isOpen={isOpenUsername} onOpen={onOpenUsername} onClose={onCloseUsername} styles={styles} category={"username"} userData={userData} defaultValue={userData?.data?.username} setSubmited={setSubmited}/>
                        </>
                        <>
                            <Grid sx={{display: 'flex', alignItems: "center"}} item xs={4}>
                                <Typography id="modal-modal-description">
                                    Email:
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography sx={{width: "100%"}} id="modal-modal-description">
                                    {userData?.data?.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Button onClick={onOpenEmail}><KeyboardArrowRight/></Button>  
                            </Grid>                                               
                            <SimpleModal isOpen={isOpenEmail} onOpen={onOpenEmail} onClose={onCloseEmail} styles={styles} category={"email"} userData={userData} defaultValue={userData?.data?.email} setSubmited={setSubmited}/>
                        </>
                        <>
                            <Grid sx={{display: 'flex', alignItems: "center"}} item xs={4}>
                                <Typography id="modal-modal-description"> 
                                    Password: {/*userData?.data?.username*/}
                                </Typography>
                            </Grid> 
                            <Grid item xs={5}>
                                <Typography sx={{width: "100%"}} id="modal-modal-description">
                                    <span>••••••••••</span>
                                </Typography>
                            </Grid>         
                            <Grid item xs={3}>
                                <Button onClick={onOpenPassword}><KeyboardArrowRight/></Button>  
                            </Grid> 
                            <SimpleModal isOpen={isOpenPassword} onOpen={onOpenPassword} onClose={onClosePassword} styles={styles} category={"password"} userData={userData} setSubmited={setSubmited}/>
                        </>    
                    </Grid>   
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        autoHideDuration={5000}
                        onClose={handleClose}
                        open={open}
                        key={vertical + horizontal}            
                    >
                        <Alert
                            
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            "Updated Successfully."
                        </Alert>
                    </Snackbar>             
                </Box>
            </Modal>
        </Box>
    )

}

export default AccountSetting