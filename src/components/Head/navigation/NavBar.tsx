import { HStack, Link as ChakraLink, Flex, Spacer, Button, Stack, ButtonGroup, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Box, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Center, WrapItem, Avatar, Menu, MenuButton, MenuList, MenuDivider, MenuItem, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import {NavLink, useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useAuth } from '../../../provider/authProvider';


type UserDataType = {
  data?: {
    username: string;
    email?: string;
  };
};

const NavBar = ({props}: any) => {
  const isSmallLogoWidth = useMediaQuery('(max-width:530px)');
  const logoMediaQueryWidth = useMediaQuery('(max-width:625px)');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<HTMLButtonElement | null>(null)
  const navigate = useNavigate();
  const { userData }: { userData: UserDataType | null } = useAuth();

  const userName = userData?.data?.username;
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
      //url: "http://localhost:5050/auth/logout", //DEVELOPMENT
      url: "https://one-soul-server.onrender.com/auth/logout" //PRODUCTION
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


  return (
    <Flex style={styles.container(headerMediaQuery)} sx={{position: "sticky", zIndex: 2}} alignItems='center'>
      <Stack>
        <HStack spacing={7}>   
          <ChakraLink 
            as={NavLink} 
            to="/home" 
            state={props.props} 
          >
            <Heading as='h4' size='md' sx={{color: "white"}}  _hover={{ color: "white" }}>
              <Text>HOME</Text>
            </Heading>
          </ChakraLink>
          <ChakraLink 
            as={NavLink} 
            to="/about"
            state={props.props}
          >
            <Heading as='h4' size='md' sx={{color: "white"}} _hover={{ color: "white" }}>
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
              <MenuItem>Account Settings</MenuItem>
              <MenuItem>
                <ButtonGroup position="static" gap='2'>
                  <Button onClick={onOpen} colorScheme='teal' >Logout</Button>
                </ButtonGroup>
              </MenuItem>
            </VStack>
          </MenuList>
        </Menu>
      </HStack>
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
    </Flex>
  )
}

export default NavBar