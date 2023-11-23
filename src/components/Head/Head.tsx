import { Box, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import NavBar from './navigation/NavBar'

const Head = () => {
  return (
    <Box id="head">
      <Box>
        <NavBar/>
      </Box>
      <h1>One Soul Academy</h1>
    </Box>
  )
}

export default Head