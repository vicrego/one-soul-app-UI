import React from 'react'
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider >
    <React.StrictMode>
      <BrowserRouter>
        <CssVarsProvider theme={theme}>
          <App />
        </CssVarsProvider>
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>
)
