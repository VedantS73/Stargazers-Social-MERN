import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../App.css";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Login() {
  const navigate = useNavigate();
  const [username, SetUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // If login is successful, set a timer for the countdown
    if (loginSuccess) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
        if (countdown === 1) {
          clearInterval(countdownInterval); // Clear the countdown interval
          // Redirect to "/explore" after the countdown
          navigate("/explore");
        }
      }, 1000); // Update countdown every 1 second
      return () => clearInterval(countdownInterval); // Cleanup the interval on unmount
    }
  }, [loginSuccess, navigate, countdown]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/api/users/login", {
        name: username,
        pass: password,
      })
      .then((res) => {
        localStorage.setItem("jwtToken", res.data.jwttoken);
        if (res.data.admin) {
          // Redirect if user is an admin
        } else {
          setLoginSuccess(true); // Set login success state
          setTimeout(() => {
            setSnackbarOpen(false); // Close the snackbar after 2 seconds
            // Redirect after the snackbar closes
          }, 2000);
        }
      })
      .catch((err) => {
        // console.log("error is ", err);
        setSnackbarOpen(true); // Open the snackbar
      });
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <form onSubmit={handleSubmit}>
        <div className="App flex items-center justify-center p-4 bg-App">
          <Grid
            className="parent"
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ height: "90vh", width: "80vw", margin: "0px" }}
          >
            <div className="w-full md:w-1/2  h-3/5   rounded-md bg-Main">
              <p className="m-4 text-xl font-bold">LOGIN</p>
              <div className="flex flex-col justify-around items-center h-4/5">
                <TextField
                  id="outlined-basic"
                  label="username"
                  name="username"
                  variant="outlined"
                  onChange={(e) => SetUsername(e.target.value)}
                  value={username}
                />
                <TextField
                  id="outlined-password-input"
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  // onChange={}
                />
                <p className="text-center"></p>
                <Button variant="outlined" type="submit">
                  Login
                </Button>
                <div className="text-center">
                  <p>Not registered Yet ??</p>
                  <Link to="/register" className="underline text-slate-500">
                    Register here
                  </Link>
                </div>
              </div>
            </div>
          </Grid>
        </div>
      </form>
      {/* Snackbar for invalid credentials */}
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
          Invalid credentials
        </MuiAlert>
      </Snackbar>
      {/* Snackbar for login scuccess */}
      <Snackbar
        open={loginSuccess}
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
          {`Login Successful! Redirecting in ${countdown} seconds...`}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default Login;