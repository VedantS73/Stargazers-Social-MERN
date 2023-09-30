import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Cards from '../Components/Cards';
import BigCard from '../Components/Big-card';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import CreatePost from './CreatePost';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    outline: 0,
  };

export default function FixedBottomNavigation() {
    const [postData, setPostData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        // Fetch data from the JSON endpoint using Axios
        axios
          .get('http://localhost:3001/api/posts/getposts')
          .then((response) => {
            setPostData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
        <Grid
            container
            direction="row"
            sx={{
            gap: '2rem',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            }}
        >
            {postData.map((post) => (
            <div key={post.id}>
                {post.type === 'l' ? (
                <Grid item xl={12} lg={12} md={12}>
                    <BigCard
                    date={post.date}
                    headline={post.header}
                    authorName="Alia Bhat"
                    content={post.content}
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
                        headline={sPost.header}
                        authorName="Alia Bhat"
                        info={sPost.content}
                    />
                    ) : null /* Render an empty column for null values */}
                </Grid>
                ))}
            </Grid>
            ))}
        </Grid>
      {/* <List>
        meow list meow
      </List> */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            if (newValue === 0) {
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
            <CreatePost />
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                Random Cat
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <img src="https://cataas.com/cat/gif" alt="random cat" />
            </Typography> */}
        </Box>
      </Modal>
    </Box>
  );
}