import React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, PaletteOptions} from '@mui/material/styles';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

declare module '@mui/material/styles' {
  interface ThemeOptions {
    palette?: PaletteOptions,
    baseLine: number,
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#0F0F0F',
      contrastText: '#FFE81F',
    },
  },
  typography: {
    fontFamily: 'inherit'
  },
  baseLine: 8
});

export const ThemeProvider: React.FC<Props> = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      {props.children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider