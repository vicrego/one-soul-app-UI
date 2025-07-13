import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter,
} from "react-router-dom";

import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';

const theme = extendTheme();

/*
useEffect(() => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 300); // allow fade-out if animated
  }
}, []);
*/
console.log("main")

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <CssVarsProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CssVarsProvider>
    </ChakraProvider>
  </React.StrictMode>
)
