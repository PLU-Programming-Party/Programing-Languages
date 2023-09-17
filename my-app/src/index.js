import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#E31E24",
      light: "#FFF5F2",
      dark: "#3A001E",
    },
    secondary: {
      main: "#BB8378",
    },
    light: {
      main: "#FFF5F2"
    },
  },
  typography: {
    h1: {
      fontSize: "4rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.5px"
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.25px"
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: "0px"
    },
    h4: {
      fontSize: "1.5rem",      // Slightly smaller than h3
      fontWeight: 500,         // Keeping the weight consistent with h3
      lineHeight: 1.4,
      letterSpacing: "0px"
    },
    h5: {
      fontSize: "1.25rem",     // Slightly smaller than h4
      fontWeight: 400,         // A bit lighter in weight
      lineHeight: 1.5,
      letterSpacing: "0.1px"   // A tiny bit of letter spacing
    },
    h6: {
      fontSize: "1rem",        // About the same size as regular text, but bold
      fontWeight: 600,         // Bolder than regular text to differentiate
      lineHeight: 1.5,
      letterSpacing: "0.15px"  // A tiny bit of letter spacing
    },
    // ... any other typography adjustments you'd like to make
  },
})




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
