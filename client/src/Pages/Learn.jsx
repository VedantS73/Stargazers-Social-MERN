import React from 'react'
import { Typography, Button, Stack, Card, Avatar, dividerClasses, Grid, Drawer, } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cards from '../Components/Cards';
import BigCard from '../Components/Big-card';

export default function Learn() {
    return (
      <div>
        <h1 style={{color:'white'}}>INSIDE LEARN</h1>
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