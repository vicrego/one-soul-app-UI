import { HStack, Link as ChakraLink, Box, Flex, Spacer, Button, Center, Stack, ButtonGroup, Heading } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'


const NavBar = () => {
  return (
    <Flex mx="8" minWidth='max-content' alignItems='center' gap='2'>
    <Stack justifyContent="center">
      <HStack justifyContent={'center'} gap='6'>   
        <ChakraLink as={NavLink} to="/">
          <Heading as='h4' size='md'>HOME</Heading>
        </ChakraLink>
        <ChakraLink as={NavLink} to="/about">
          <Heading as='h4' size='md'>ABOUT</Heading>
        </ChakraLink>
      </HStack>
    </Stack>
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