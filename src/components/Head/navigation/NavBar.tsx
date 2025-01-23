import { HStack, Link as ChakraLink, Flex, Spacer, Button, Stack, ButtonGroup, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Box, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Center } from '@chakra-ui/react'
import React from 'react'
import { Navigate, NavLink, redirect, useLocation, useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';


const NavBar = ({props}: any) => {
  const isSmallLogoWidth = useMediaQuery('(max-width:530px)');
  const logoMediaQueryWidth = useMediaQuery('(max-width:625px)');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const navigate = useNavigate();
  //const logoMediaQueryHeight = useMediaQuery('(max-height:530px)');
  
  const headerMediaQuery = useMediaQuery('(min-width:394px)');
  
  const styles = {
    container: (headerMediaQuery : any) => ({
      padding: headerMediaQuery ? '3px 10px' : '10px 30px',
    })
  };

  function logout(event: any) {
    //event.preventDefault();
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5050/auth/logout",
    }).then((res) => {
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


  return (
    <Box>
    <Flex style={styles.container(headerMediaQuery)}  alignItems='center' gap='2' id="head">
      <Stack justifyContent="center" >
        <HStack justifyContent={'center'} gap='6'>   
          <ChakraLink 
            as={NavLink} 
            to="/home" 
            state={props.props} 
          >
            <Heading as='h4' size='md' sx={{color: "white", fontFamily: "mono"}}  _hover={{ color: "white" }}>HOME</Heading>
          </ChakraLink>
          <ChakraLink 
            as={NavLink} 
            to="/about"
            state={props.props}
          >
            <Heading as='h4' size='md' sx={{color: "white", fontFamily: "mono"}} _hover={{ color: "white" }}>ABOUT</Heading>
          </ChakraLink>
        </HStack>
      </Stack>
      <Spacer />
      {!isSmallLogoWidth &&
        <Heading size='lg' sx={{color: "white", fontFamily: "mono"}} fontSize={logoMediaQueryWidth ? '12px' : '25px'} lineHeight='1'>OneSoul Academy</Heading>
      }
      <Spacer />
      <ButtonGroup position="static" gap='2'>
        {/*<ChakraLink as={NavLink} 
            to="/logout"
            state={props.props}
        >*/}
            <Button onClick={onOpen} colorScheme='teal' sx={{color: "white", fontFamily: "mono"}} _hover={{ color: "white" }}>Logout</Button>
          {/*</ChakraLink>  */}
      </ButtonGroup>

      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
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
              <Button sx={{backgroundColor: "lightGray", padding: "7px 15px", borderRadius: 10}} ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button onClick={logout} sx={{backgroundColor: "red", padding: "7px 15px", borderRadius: 10, color: "white"}} colorScheme='red' ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </Box>

        </AlertDialogContent>
      </AlertDialog>

{/*
      <ButtonGroup position="static" gap='2'>
        <ChakraLink as={NavLink} 
          to="/signup"
          state={props.props}
        >
          <Button colorScheme='teal' sx={{color: "white", fontFamily: "mono"}} _hover={{ color: "white" }}>Sign Up</Button>
        </ChakraLink>
        <ChakraLink 
          as={NavLink} 
          to="/signin"
          state={props.props}
        >
          <Button colorScheme='teal' sx={{color: "white", fontFamily: "mono"}} _hover={{ color: "white" }}>Sign in</Button>
        </ChakraLink>
      </ButtonGroup>
      */}
    </Flex>
    </Box>
  )
}

export default NavBar