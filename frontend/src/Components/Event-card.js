import React from 'react'
import { ReactDOM, Component } from 'react'
import { Typography, Button, Stack, Card, Avatar,Paper, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cards from './Cards';

const useStyle = makeStyles({
    title:{
        fontSize: '1.25rem',
        lineHeight: 'normal',
        fontWeight: '700'
    },
    dateNtime: {
        fontSize: '0.9375rem',
        lineHeight: 'normal',
        color: '#A1A1AA',
        fontWeight: '700'
    },
    info:{
        fontSize: '0.6875rem',
        lineHeight: 'normal',
        fontWeight: '500'
    }
})

export default function EventCard(){

    const classes = useStyle()

    return(
        <div>
            <Grid container  direction='row' sx={{
                width:'62.3125rem',
                height:'10.0625rem',
                background:'#000000',
                padding:"10px",
                gap:"10px"
            }}>
                <Grid item xs={2}></Grid>
                <Grid item xs={6} md={5}>
                     <Stack sx={{
                        color:"#FFFFFF"
                     }}>
                        <item className={classes.title}>Lunar Eclipse</item>
                        <item className={classes.dateNtime}>october 28</item>
                        <item></item>
                        <item className={classes.info}>A lunar eclipse is an astronomical event that occurs when the Moon moves into the Earth's shadow, causing the Moon to be darkened.</item>
                     </Stack>
                </Grid>
            </Grid>
        </div>
    )
}