import React from 'react'
import { ReactDOM, Component } from 'react'
import { Typography, Button, Stack, Card, Avatar, Paper, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cards from './Cards';

const useStyle = makeStyles({
    GridItems: {
        height: 'inherit',
        width: 'inherit'
    }
})

export default function BigCard(props) {
    const classes = useStyle()

    return (
<div sx={{ justifyContent: "center" }}>
  <Grid
    container
    sx={{
      maxHeight: 'fit-content',
      maxWidth: 'fit-content',
      background: '#121416',
      padding: "10px",
    }}
  >
    <Grid
      item
      xs={12}
      md={6}
      sm={12}
      xl={7}
      sx={{
        background: "#FFFFFF",
        maxHeight: "350px",
        minHeight: "200px",
        display: "flex",
        alignItems: "center", // Center the image vertically
        justifyContent: "center", // Center the image horizontally
      }}
    >
      <img src='image 2.jpg' width="100%" height="100%" sx={{}} />
    </Grid>
    <Grid item xs={12} md={6} sm={12} xl={4}>
      <Cards 
      date={props.date}
      headline={props.header}
      authorName="Alia Bhat"
      info={props.content}
      />
    </Grid>
  </Grid>
</div>

    )
}