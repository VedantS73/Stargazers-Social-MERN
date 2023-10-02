import React, { useState, useEffect } from 'react';
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ResponsiveAppBar from "../Components/ResponsiveAppBar";
import DrawerLayout from "../Components/DrawerLayout";
import axios from 'axios';

function ProfilePage() {
  const token = localStorage.getItem("jwtToken");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (token) {
      fetch("http://localhost:3001/userapi", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setIsLoading(false);
        });
    }
  }, [token]);

  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            {isLoading ? (
              <p>Loading...</p>
            ) : userData ? (
              <>
                <Avatar
                  alt={userData.username}
                  src={userData.profilePicUrl}
                  sx={{
                    width: 150,
                    height: 150,
                    marginBottom: 2,
                  }}
                />
                <Typography variant="h5">{userData.username}</Typography>
              </>
            ) : (
              <p>No user data available</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <h4>Posts here</h4>
            {/* Render user posts or a loading message here */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default function Profile() {
  return <DrawerLayout maincontent={<ProfilePage />} />;
}