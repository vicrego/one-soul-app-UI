import React from 'react'
import NavBar from '../Head/navigation/NavBar'
import { Box } from '@chakra-ui/react'


interface MyComponentProps {
  children: React.ReactNode;
  props: any
}

const Layoult: React.FC<MyComponentProps> = ({ children, ...props }: { children: React.ReactNode }) => {
 
  return (
    <Box 
      minHeight="99vh"
      maxHeight="99vh" 
      className="custom-border">
      <NavBar props={{props, loading: false}} />
      {children}
    </Box>
  )
}

export default Layoult