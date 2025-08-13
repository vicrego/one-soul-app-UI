import React, { useEffect, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useAuth } from '../../../provider/authProvider';
import AccountSetting from '../AccountSetting';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, Divider, Grid, IconButton, Menu, MenuItem, MenuList, Stack, Typography } from '@mui/material';
import { generalStyles } from '../../../Styles/generalStyles';


type UserDataType = {
  data?: {
    username: string;
    email?: string;
  };
};

const NavBar = ({props}: any) => {
  
  const navigate = useNavigate();
  
  const { userData }: { userData: UserDataType | null } = useAuth();
  const userName = userData?.data?.username;
  //const logoMediaQueryHeight = useMediaQuery('(max-height:530px)');
  
  let url: string;
  if(import.meta.env.VITE_ENV === "development"){
    url = `${import.meta.env.VITE_API_URL_DEVELOPMENT}/auth/logout`;
  } else {
    url = `${import.meta.env.VITE_API_URL_PRODUCTION}/auth/logout`;
  }

  function logout(event: any) {
    axios({
      method: "POST",
      withCredentials: true,
      url: url
    }).then(() => {
      navigate("/signIn");
    })
  }
  
  //CONFIG MODALS
  /*
  const { 
    isOpen: isOpenLogout, 
    onOpen: onOpenLogout, 
    onClose: onCloseLogout,
  } = useDisclosure()
  const { 
    isOpen: isOpenAccountSettings, 
    onOpen: onOpenAccountSettings, 
    onClose: onCloseAccountSettings
  } = useDisclosure()
*/

  const [isOpenLogout, setIsOpenLogout] = useState(false)
  const onOpenLogout = () => setIsOpenLogout(true)
  const onCloseLogout = () => setIsOpenLogout(false)
  
  const [isOpenAccountSettings, setIsOpenAccountSettings] = useState(false)
  const onOpenAccountSettings = () => setIsOpenAccountSettings(true)
  const onCloseAccountSettings = () => setIsOpenAccountSettings(false)



  //LOGOUT MODAL
  const cancelRef = React.useRef<HTMLButtonElement | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //STYLES
  const isSmallLogoWidth = useMediaQuery('(max-width:600px)');
  const logoMediaQueryWidth = useMediaQuery('(max-width:625px)');
  
  const headerMediaQuery = useMediaQuery('(min-width:394px)');
  const styles = {
    container: (headerMediaQuery : any) => ({
      padding: headerMediaQuery ? '3px 0px' : '10px 30px',
    }),
    heading: {
      variant: 'h4',
      size: 'md',
      color: 'white',
      _hover: {
        color: 'gray'
      }
    },
  };

  
  return (
    <Box style={styles.container(headerMediaQuery)} sx={{position: "sticky", zIndex: 2}} alignItems='center'>    
      <Grid  container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={2} sm={4} >
          <Stack direction={"row"} spacing={7}>   
            <Link 
              to="/home" 
              state={props.props} 
            >
              <Box 
              >
                <Typography 
                  sx={{
                    fontFamily: "initial", 
                    color: 'white', 
                    cursor: "pointer",
                    '&:hover': {
                      color: styles.heading._hover.color
                    }
                  }} 
                >
                  HOME
                </Typography>
              </Box>
            </Link>
            <Link 
              to="/about"
              state={props.props}
            >
              <Box sx={{
                '&:hover': {
                  color: styles.heading._hover.color
                }}} 
              >
                <Typography 
                  sx={{
                    fontFamily: "initial", 
                    color: 'white',
                    '&:hover': {
                      color: styles.heading._hover.color
                    }
                  }}
                  
                >
                    ABOUT
                  </Typography>
              </Box>
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={4} sm={4}>
          {!isSmallLogoWidth &&
            <Typography 
              sx={{
                color: "white", 
                fontFamily: "initial",
              }} 
            fontSize={logoMediaQueryWidth ? '20px' : '25px'} 
            lineHeight='1'
            >
              OneSelf Academy
            </Typography>
          }
        </Grid>
       
        <Grid item xs={6} sm={3.1} md={4} >
          <IconButton 
            //marginLeft={10}
            onClick={handleClickMenu} 

            //minW={1}
            sx={{minWidth: 1, marginLeft: 10, padding: 0}}
          >
            {/*<Avatar sx={{backgroundColor: "#7a1111", p: 2, px: 7, color: "white"}} />*/}
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                padding: 1, 
                backgroundColor: generalStyles.secondaryColor }}
            >
              {userName?.charAt(0)}
            </Avatar>
          </IconButton>
        </Grid>
        
      </Grid>
      
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
      > 
        <MenuList sx={{pb: 10, width: "20rem"}}>
        <Stack alignItems={"center"}>
          <br />
          
            <Avatar
              sx={{width: "150px"}}                
              src={'https://avatars.dicebear.com/api/male/usern§ame.svg'}
            />
          
          <br />
          
            <p>{userName}</p>
          
          <br />
          <Divider  sx={{ borderColor: 'black' }}/>
          <Stack sx={{alignItems: "left", width: "90%"}} p={0} gap={0}>
            <MenuItem sx={{minHeight: 0}} onClick={onOpenAccountSettings} >Account Settings</MenuItem>
            <MenuItem 
              sx={{minHeight: 0}} 
              onClick={() => {
                handleCloseMenu();
                onOpenLogout();
              }} >
              Logout
            </MenuItem>
          </Stack>
        </Stack>
        </MenuList>
      </Menu>
      
      <AccountSetting 
        isOpenAccountSettings={isOpenAccountSettings} 
        onOpenAccountSettings={onOpenAccountSettings} 
        onCloseAccountSettings={onCloseAccountSettings} 
      />
      {/*
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onCloseLogout}
        isOpen={isOpenLogout}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent sx={{backgroundColor: "rgba(17, 37, 124, 0.5)"}}>
          <Box sx={{backgroundColor: "white", w: 280, p: "17px 30px", marginTop: "100px", alignSelf: "center", textAlign: "center"}} >
            <Box sx={{display: "flex", paddingBottom: "20px"}}>
              <AlertDialogBody sx={{backgroundColor: "white", textAlign: "left", paddingRight: 10}}>
                Are you sure you want to logout? 
              </AlertDialogBody>
              <AlertDialogCloseButton />
            </Box>
            <AlertDialogFooter sx={{backgroundColor: "white", p: 0}}>
              <Button 
                sx={{
                  backgroundColor: "lightGray", 
                  padding: "7px 15px", 
                  borderRadius: 10,
                  color: 'white'

                }} 
                ref={cancelRef} 
                onClick={() => {
                  onCloseLogout();
                }}
              >
                No
              </Button>
              <Button onClick={logout} sx={{backgroundColor: "red", padding: "7px 15px", borderRadius: 10, color: "white", marginLeft: 3}}>
                Yes
              </Button>
            </AlertDialogFooter>
          </Box>
        </AlertDialogContent>
      </AlertDialog>
      */}
      <Dialog
        open={isOpenLogout}
        //TransitionComponent={Transition}
        keepMounted
        onClose={onCloseLogout}
        aria-describedby="alert-dialog-slide-description"
        
        //BackdropProps={{ invisible: false }}
      >
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'white',
              width: 280,
              //p: '17px 30px',
              //mt: '100px',
              textAlign: 'center',
            }}
          >
            <Box sx={{ pb: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ textAlign: 'left', pr: 2 }}>
                Are you sure you want to logout?
              </Typography>
              {/* MUI doesn't have a default close button here, but you can add one: */}
              <Button onClick={onCloseLogout}>✕</Button>
            </Box>

            <DialogActions sx={{ justifyContent: 'right', gap: 2 }}>
              <Button
                onClick={onCloseLogout}
                sx={{
                  backgroundColor: 'lightgray',
                  padding: '7px 15px',
                  borderRadius: 2,
                  color: 'white',
                }}
              >
                No
              </Button>
              <Button
                onClick={logout}
                sx={{
                  backgroundColor: 'red',
                  padding: '7px 15px',
                  borderRadius: 2,
                  color: 'white',
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

    </Box>
  )
}

export default NavBar