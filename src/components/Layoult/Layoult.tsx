import React from 'react'
import NavBar from '../Head/navigation/NavBar'
import { Box } from '@chakra-ui/react'

const Layoult = ({ children, ...props }: { children: React.ReactNode }) => {
  
 
  return (
    <Box className="custom-border" >
      <Box>
        <NavBar  props={props.props} />
        {children}
      </Box>
    </Box>
  )
}

export default Layoult