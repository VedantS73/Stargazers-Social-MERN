import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import '../App.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  
function Register() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const userData = {
      username: formData.get('username'),
      password: formData.get('password'),
    };  
    try {
      const response = await axios.post('http://localhost:3001/api/users/register', userData);
      setRegisterSuccess(true)
      setTimeout(() => {
        setRegisterSuccess(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error('Error registering user:', error);
      setSnackbarOpen(true); // Open the snackbar
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop : '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '90vh',   // Set a fixed height for the container
          }}
        >
          <Typography component="h1" variant="h5">
            Register to StarGazers
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}   mt={3} >

            <Grid item xs={6}>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
            >
              Register
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/Login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* Snackbar for invalid details */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="error"
        >
          Error submitting form. Please enter valid details.
        </MuiAlert>
      </Snackbar>
      {/* Snackbar for register scuccess */}
      <Snackbar
        open={registerSuccess}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          User Registration Successful
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default Register