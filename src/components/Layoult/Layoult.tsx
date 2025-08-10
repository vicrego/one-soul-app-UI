import React from 'react'
import NavBar from '../Head/navigation/NavBar'
import { Box } from '@mui/material';


interface MyComponentProps {
  children: React.ReactNode;
  props: any
}

const Layoult: React.FC<MyComponentProps> = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <Box 
      maxHeight="99vh" 
      className="custom-border">
      <NavBar props={{props, loading: false}} />
      {children}
    </Box>
  )
}

export default Layoult