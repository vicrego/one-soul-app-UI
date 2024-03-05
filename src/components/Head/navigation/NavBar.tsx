import { HStack, Link as ChakraLink, Box, Flex, Spacer, Button, Center, Stack, ButtonGroup, Heading } from '@chakra-ui/react'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery';


const NavBar = (props: any) => {
  const logoMediaQuery = useMediaQuery('(min-width:530px)');
  const headerMediaQuery = useMediaQuery('(min-width:394px)');
  //const headerMediaQueryLarge = ;
  
  const styles = {
    container: headerMediaQuery => ({
      padding: headerMediaQuery ? '3px 10px' : '10px 30px',
    })
  };
  console.log("props Navbar", props)
  return (
    <Flex style={styles.container(headerMediaQuery)}  alignItems='center' gap='2' id="head">
      <Stack justifyContent="center" >
        <HStack justifyContent={'center'} gap='6'>   
          <ChakraLink 
            as={NavLink} 
            to="/home" 
            state={props.props}
          >
            <Heading as='h4' size='md'>HOME</Heading>
          </ChakraLink>
          <ChakraLink as={NavLink} to="/about">
            <Heading as='h4' size='md'>ABOUT</Heading>
          </ChakraLink>
        </HStack>
      </Stack>
      <Spacer />
      {logoMediaQuery &&
        <Heading size='lg' fontSize='30px' lineHeight='1'>One Soul Academy</Heading>
      }
      <Spacer />
      <ButtonGroup position="static" gap='2'>
        <ChakraLink as={NavLink} to="/signup">
          <Button colorScheme='teal'>Sign Up</Button>
        </ChakraLink>
        <ChakraLink as={NavLink} to="/signin">
          <Button colorScheme='teal'>Log in</Button>
        </ChakraLink>
      </ButtonGroup>
    </Flex>
  )
}

export default NavBar