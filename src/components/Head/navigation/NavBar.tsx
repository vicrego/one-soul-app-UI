import { HStack, Link as ChakraLink, Box, Flex, Spacer, Button, Center, Stack, ButtonGroup, Heading } from '@chakra-ui/react'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery';


const NavBar = ({props}: any) => {
  const isSmallLogoWidth = useMediaQuery('(max-width:530px)');
  const logoMediaQueryWidth = useMediaQuery('(max-width:625px)');
  
  //const logoMediaQueryHeight = useMediaQuery('(max-height:530px)');
  
  const headerMediaQuery = useMediaQuery('(min-width:394px)');
  
  const styles = {
    container: (headerMediaQuery : any) => ({
      padding: headerMediaQuery ? '3px 10px' : '10px 30px',
    })
  };
  return (
    <Flex style={styles.container(headerMediaQuery)}  alignItems='center' gap='2' id="head">
      <Stack justifyContent="center" >
        <HStack justifyContent={'center'} gap='6'>   
          <ChakraLink 
            as={NavLink} 
            to="/home" 
            state={props.props.props}
          >
            <Heading as='h4' size='md' _hover={{ color: "white" }}>HOME</Heading>
          </ChakraLink>
          <ChakraLink 
            as={NavLink} 
            to="/about"
            state={props.props}
          >
            <Heading as='h4' size='md' _hover={{ color: "white" }}>ABOUT</Heading>
          </ChakraLink>
        </HStack>
      </Stack>
      <Spacer />
      {!isSmallLogoWidth &&
        <Heading size='lg' fontSize={logoMediaQueryWidth ? '12px' : '25px'} lineHeight='1'>OneSoul Academy</Heading>
      }
      <Spacer />
      <ButtonGroup position="static" gap='2'>
        <ChakraLink as={NavLink} 
          to="/signup"
          state={props.props}
        >
          <Button colorScheme='teal' _hover={{ color: "white" }}>Sign Up</Button>
        </ChakraLink>
        <ChakraLink 
          as={NavLink} 
          to="/signin"
          state={props.props}
        >
          <Button colorScheme='teal' _hover={{ color: "white" }}>Sign in</Button>
        </ChakraLink>
      </ButtonGroup>
    </Flex>
  )
}

export default NavBar