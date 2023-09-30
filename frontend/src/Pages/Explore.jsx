import React, { useState, useEffect } from 'react';
import { Typography, Button, Stack, Card, Avatar, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cards from '../Components/Cards';
import BigCard from '../Components/Big-card';
import axios from 'axios';
import CreatePost from '../Components/CreatePost';

export default function Explore() {
  const [postData, setPostData] = useState([]);

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
  }, []); // Empty dependency array to ensure the effect runs only once

  // Function to group 's' posts into rows of 3
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

  return (
    <div>
      <h1 style={{ color: 'white' }}>Explore</h1>
      <Card>
        <CreatePost />
      </Card>
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
    </div>
  );
}
