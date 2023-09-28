import React from 'react'
import { Typography, Button, Stack, Card, Avatar, dividerClasses, Grid, Drawer, TextField} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cards from '../Components/Cards';
import BigCard from '../Components/Big-card';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const useStyles = makeStyles(
  {
    NavText: {
      fontSize: '32px',
      fontWeight: '700',
      color: 'white'
    },
  }
)

export default function Connect() {

  const classes = useStyles()

  return (
    <div>
      <Grid container spacing={3} sx={{
        padding: "2rem 1rem",
      }}>
        <Grid item xl={4} lg={4} md={4} className={classes.NavText}>Messages</Grid>
        <Grid item xl={4} lg={4} md={4}>
          <Button
            sx={{
              backgroundColor: "ghostwhite",
              color: "black",
              padding: "10px "
            }}
            component="label"
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
          >
            Add Event
          </Button>
        </Grid>
        <Grid item xl={4} lg={4} md={4} >
           <Grid container></Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          gap: '2rem',
          alignItems: 'center', // Center vertically
          justifyContent: 'center',
          padding: "1rem",
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