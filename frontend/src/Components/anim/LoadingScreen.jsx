import React, { useEffect, useState } from 'react';
import lottie from 'lottie-web';
import animationData from './animation_ln7mq9e1.json';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const LoadingScreen = () => {
  useEffect(() => {
    // Initialize Lottie animation
    const animationContainer = document.getElementById('lottie-container');

    if (animationContainer) {
      lottie.loadAnimation({
        container: animationContainer,
        renderer: 'svg', // Use 'svg' or 'canvas' depending on your preference
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <div id="lottie-container" style={{ width: '100%', height: '100vh', overflow: 'hidden'}}>
          {/* This is where the Lottie animation will be rendered */}
        </div>
    </ThemeProvider>
  );
};

export default LoadingScreen;
