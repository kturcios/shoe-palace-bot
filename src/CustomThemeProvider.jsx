import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function CustomThemeProvider({ children }) {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>
  );
}
