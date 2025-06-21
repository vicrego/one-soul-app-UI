import { HStack, Link as ChakraLink, Flex, Spacer, Button, Stack, ButtonGroup, Heading, useDisclosure, Box, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Center, WrapItem, Avatar, Menu, MenuButton, MenuList, MenuDivider, MenuItem, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import {NavLink, useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useAuth } from '../../../provider/authProvider';
import { Modal, Typography } from '@mui/material';


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
    }
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
    })/*.catch(err => {
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
    });*/
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'white',
    color: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <Flex style={styles.container(headerMediaQuery)} sx={{position: "sticky", zIndex: 2}} alignItems='center'>
      <Stack>
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
      </Stack>
      <Spacer />
      {!isSmallLogoWidth &&
        <Heading size='lg' sx={{color: "white"}} fontSize={logoMediaQueryWidth ? '20px' : '25px'} lineHeight='1'>OneSoul Academy</Heading>
      }
      <Spacer />
      <HStack marginRight={8}>
        <Menu>
          <MenuButton 
            as={Button}     
            minW={0}
          >
          <Avatar sx={{backgroundColor: "purple", p: "2"}} name={userName} />
          </MenuButton>
          <MenuList alignItems={'center'} sx={{backgroundColor: "white", p: 3, borderRadius: 6, w: 300}}>
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
            <MenuDivider />
            <VStack p={3}>
              <MenuItem onClick={onOpenAccountSettings}>Account Settings</MenuItem>
              <MenuItem onClick={onOpenLogout}>Logout</MenuItem>
            </VStack>
          </MenuList>
        </Menu>
      </HStack>
      <Modal
          open={isOpenAccountSettings}
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Account Settings
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Username: {userData?.data?.username}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Email: {userData?.data?.email}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Password: {/*userData?.data?.username*/}
            </Typography>
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