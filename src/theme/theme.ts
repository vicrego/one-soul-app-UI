import { createTheme, experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { palette } from './palette';
//import { typography } from './typography';
//import { components } from './components';

const theme = createTheme({
  palette
  //typography,
  //components,
});

export default theme;