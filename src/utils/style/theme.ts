import { outlinedInputClasses } from '@mui/material/OutlinedInput';
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
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderColor: '#055EB0',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#055EB0',
        },
        root: {
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: '#055EB0',
          },
        },
      },
    },
  },
});

export default theme;
