import { HStack, Link as ChakraLink, Flex, Spacer, Button, Stack,Heading, useDisclosure, Box, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Center, Avatar, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import {NavLink, useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useAuth } from '../../../provider/authProvider';
import AccountSetting from '../AccountSetting';
import { Divider, Grid, Menu, MenuItem, MenuList } from '@mui/material';


type UserDataType = {
  data?: {
    username: string;
    email?: string;
  };
};

const NavBar = ({props}: any) => {
  const isSmallLogoWidth = useMediaQuery('(max-width:530px)');
  const logoMediaQueryWidth = useMediaQuery('(max-width:625px)');
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


  const cancelRef = React.useRef<HTMLButtonElement | null>(null)
  const navigate = useNavigate();
  const { userData }: { userData: UserDataType | null } = useAuth();

  const userName = userData?.data?.username;
  //const logoMediaQueryHeight = useMediaQuery('(max-height:530px)');
  
  const headerMediaQuery = useMediaQuery('(min-width:394px)');
  
  const styles = {
    container: (headerMediaQuery : any) => ({
      padding: headerMediaQuery ? '3px 10px' : '10px 30px',
    }),
    heading: {
      as: 'h4',
      size: 'md',
      color: 'white',
      _hover: {
        color: 'white'
      }
    },
  };

  let url: string;

  if(import.meta.env.VITE_ENV === "development"){
    url = `${import.meta.env.VITE_API_URL_DEVELOPMENT}/auth/logout`;
  } else {
    url = `${import.meta.env.VITE_API_URL_PRODUCTION}/auth/logout`;
  }

  function logout(event: any) {
    //event.preventDefault();
    axios({
      method: "POST",
      withCredentials: true,
      url: url
    }).then(() => {
      navigate("/signIn");
    })
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Flex style={styles.container(headerMediaQuery)} sx={{position: "sticky", zIndex: 2}} alignItems='center'>    
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <HStack spacing={7}>   
            <ChakraLink 
              as={NavLink} 
              to="/home" 
              state={props.props} 
            >
              <Heading as='h4' size={styles.heading.size} sx={{color: styles.heading.color}} _hover={{ color: styles.heading._hover.color }}>
                <Text>HOME</Text>
              </Heading>
            </ChakraLink>
            <ChakraLink 
              as={NavLink} 
              to="/about"
              state={props.props}
            >
              <Heading as='h4' size={styles.heading.size} sx={{color: styles.heading.color}} _hover={{ color: styles.heading._hover.color }}>
                ABOUT
              </Heading>
            </ChakraLink>
          </HStack>
        </Grid>
        <Grid item xs={4}>
          {/*<Spacer />*/}
          {!isSmallLogoWidth &&
            <Heading size='lg' sx={{color: "white"}} fontSize={logoMediaQueryWidth ? '20px' : '25px'} lineHeight='1'>OneSelf Academy</Heading>
          }
          {/*<Spacer />*/}
        </Grid>
        <Grid sx={{}} item xs={4}>
          <Spacer/>
          <Button 
            marginLeft={20}
            onClick={handleClickMenu} 
            minW={1}
          >
            <Avatar sx={{backgroundColor: "purple", p: "2", px: 8, color: "white"}} name={userName} />
          </Button>
        </Grid>
      </Grid>
      
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        
      > 
        <MenuList sx={{pb: 10, width: "20rem"}}>
        <VStack >
          <br />
          <Center>
            <Avatar
              sx={{width: "150px"}}                
              src={'https://avatars.dicebear.com/api/male/usern§ame.svg'}
            />
          </Center>
          <br />
          <Center>
            <p>{userName}</p>
          </Center>
          <br />
          <Divider  sx={{ borderColor: 'black' }}/>
          <VStack sx={{alignItems: "left", width: "90%"}} p={0} gap={0}>
            <MenuItem sx={{minHeight: 0}} onClick={onOpenAccountSettings} >Account Settings</MenuItem>
            <MenuItem sx={{minHeight: 0}} onClick={onOpenLogout} >Logout</MenuItem>
          </VStack>
          </VStack>
        </MenuList>
      </Menu>
      
      <AccountSetting 
        isOpenAccountSettings={isOpenAccountSettings} 
        onOpenAccountSettings={onOpenAccountSettings} 
        onCloseAccountSettings={onCloseAccountSettings} 
      />
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
              <Button sx={{backgroundColor: "lightGray", padding: "7px 15px", borderRadius: 10}} ref={cancelRef} onClick={onCloseLogout}>
                No
              </Button>
              <Button onClick={logout} sx={{backgroundColor: "red", padding: "7px 15px", borderRadius: 10, color: "white"}} colorScheme='red' ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </Box>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  )
}

export default NavBar