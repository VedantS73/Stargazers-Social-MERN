import React from 'react'
import { Typography, Button, Stack, Card, Avatar, dividerClasses, Grid, Drawer, colors, } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cards from '../Components/Cards';
import BigCard from '../Components/Big-card';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocationBox from '../Components/LocationBox'

const useStyles = makeStyles({
  heading:{
      fontSize:"32px",
      fontWeight:"600"
  },
  Buttons:
  {
    width: "157px",
    height: "51px",
    backgroundColor:"white",
  }
  
})

export default function Events() {
    const classes = useStyles()

    return (
      <div>
        <Grid container sx={{
          padding:"2rem",
          gap:"2rem"
        }}>
          <Grid item xl={4} lg={4} md={4} className={classes.heading} >12 Events coming up in mumbai </Grid>
          <Grid item xl={2} lg={2} md={2} >
            <Button className={classes.Buttons} style={{ backgroundColor: 'white',color:"black" }} startIcon={<AddCircleOutlineIcon/>}>Add Event</Button>
          </Grid>
          <Grid item>
            <LocationBox >Add Event</LocationBox> 
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            gap: '2rem',
            alignItems: 'center', // Center vertically
            justifyContent: 'center', 
            padding:"1rem"
          }}
        >
          <Grid item xl={12} lg={12} md={12}>
            <BigCard />
          </Grid>
          <Grid
            container
            spacing={3}
          >
            <Grid item xl={4} lg={4} md={4} sm={12}>
              <Cards />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12}>
              <Cards />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12}>
              <Cards />
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
}