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
import { blue, pink, red } from '@mui/material/colors'

//const theme = extendTheme();

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
/*
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: blue[600],
          
        },
        secondary: {
          main: red[600]
        }
      },
    },
    dark: {
      palette: {
        primary: {
          main: blue[400],
        },
      },
    },
  },
});
*/

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <CssVarsProvider /*theme={theme}*/ >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CssVarsProvider>
    </ChakraProvider>
  </React.StrictMode>
)
