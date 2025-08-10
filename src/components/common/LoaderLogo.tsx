import { Box } from '@mui/material';
import React, { useEffect } from 'react'

const LoaderLogo = () => {
    
    const styles = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "rgb(6, 6, 22)"
    };
    return (
      <Box sx={styles}>
        <img src="./logo-initializer.jpeg" alt="Loading Logo" width={400} />
      </Box>
    );
}

export const LoaderLogoRemover = () => {
    useEffect(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        setTimeout(() => preloader.remove(), 500);
      }
    }, []);
    return null; 
  }
  

export default LoaderLogo