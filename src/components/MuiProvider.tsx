'use client';

import * as React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#7DF9FF' }, // tweak to match the video
    secondary: { main: '#00C2FF' },
    background: { default: '#0b0f14', paper: '#0e141b' }
  },
  typography: {
    fontFamily: `'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  shape: { borderRadius: 14 }
});

export default function MuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
