import React from 'react'
import NavBar from '../Head/navigation/NavBar'
import { Box } from '@chakra-ui/react'

const Layoult = ({ children, ...props }: { children: React.ReactNode }) => {
  
  return (
    
    <Box 
      minHeight="99vh"
      maxHeight="99vh" 
      className="custom-border">
      <NavBar props={{props/*.props*/, loading: false}} />
      {children}
    </Box>
  )
}

export default Layoult