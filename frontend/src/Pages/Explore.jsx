import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';

import axios from 'axios';
import Cards from '../Components/Cards';
import BigCard from '../Components/Big-card';
import CreatePost from '../Components/CreatePost';

const loaderstyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Optional: This will make the container take up the full viewport height
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '80%', md: 500 },
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: '3px',
    boxShadow: 24,
    p: 4,
    outline: 0,
  };

export default function Explore() {
    const token = localStorage.getItem("jwtToken");
    const [postData, setPostData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false); setValue(0);}

    const [value, setValue] = React.useState(0);
    const ref = React.useRef(null);

    const groupSPostsIntoRows = () => {
        const sPosts = postData.filter((post) => post.type === 's');
        const rows = [];
        for (let i = 0; i < sPosts.length; i += 3) {
          const row = sPosts.slice(i, i + 3);
          while (row.length < 3) {
            row.push(null); // Fill with null for empty columns
          }
          rows.push(row);
        }
        return rows;
      };

      useEffect(() => {
        setIsLoading(true); // Set loading to true when starting data fetch
        axios
          .get('http://localhost:3001/api/posts/getposts')
          .then((response) => {
            setPostData(response.data);
            setIsLoading(false); // Set loading to false when data is received
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setIsLoading(false); // Set loading to false on error as well
          });

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
              })
              .catch((error) => {
                console.error("Fetch error:", error);
              });
          }
      }, []);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline/>
      {isLoading ? (
        <div style={loaderstyle}>
          <CircularProgress />
        </div>
      ) : (
        <>
        <Grid
            container
            direction="row"
            spacing= '0.9rem'
            sx={{
            gap: '0.9rem',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            }}
        >
            {postData.map((post) => (
            <div key={post.id}>
                {post.type === 'l' ? (
                <Grid item xl={12} lg={12} md={12} >
                    <BigCard
                    date={post.date}
                    headline={post.headline}
                    authorName={post.username}
                    content={post.content}
                    imageUrl={post.imageUrl}
                    />
                </Grid>
                ) : null /* Don't render 's' type posts here */}
            </div>
            ))}
            {groupSPostsIntoRows().map((row, rowIndex) => (
            <Grid container key={rowIndex} sx={{ marginBottom: '0rem' }}>
                {row.map((sPost, columnIndex) => (
                <Grid item key={columnIndex} xl={4} lg={4} md={4} sm={12}>
                    {sPost ? (
                    <Cards
                        date={sPost.date}
                        headline={sPost.headline}
                        authorName={sPost.username}
                        info={sPost.content}
                    />
                    ) : null}
                </Grid>
                ))}
            </Grid>
            ))}
        </Grid>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            if (newValue === 1) {
                setOpen(true)
                setValue(newValue);
              } else {
                setValue(newValue);
              }
            }}
        >
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
          <BottomNavigationAction label="New" icon={<AddIcon />} />
          <BottomNavigationAction label="Liked" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <CreatePost usernamepass = {userData?.username || null}/>
        </Box>
      </Modal>
      </>
      )}
    </Box>
  );
}