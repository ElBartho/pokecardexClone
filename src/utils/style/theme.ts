import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#F3F3F3',
    },
    secondary: {
      main: '#EFEFEF',
    },
    text: {
      primary: '#212529',
      secondary: '#055EB0',
    },
    mode: 'light',
  },
});

export default theme;
