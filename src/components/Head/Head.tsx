import { Box, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import NavBar from './navigation/NavBar'

const Head = () => {
  return (
    <Box id="head">
      <Box>
        <NavBar/>
      </Box> 
    </Box>
  )
}

export default Head