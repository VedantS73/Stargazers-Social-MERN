import React from 'react'
import { Typography, Button, Stack, Card, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({

    headline: {
        fontSize:"1.2rem",
        lineHeight: 'normal',
        fontWeight: '600'
    },
    dateNtime: {
        fontSize: '0.9375rem',
        lineHeight: 'normal',
        // color: '#A1A1AA',
        fontWeight: '700'
    },
    username: {
        fontSize: '0.875rem',
        lineHeight: 'normal',
        fontWeight: '500'

    },

    avatar: {
        height: 40,
        width: 40,
    },
    btn: {
        backgroundColor: 'ghostwhite',
        height: 20,
        width: 55
    },
    info:{
        fontSize: '0.6875rem',
        lineHeight: 'normal',
        fontWeight: '500'
    }
})

export default function Cards(props) {
    const classes = useStyle()
      
    return (
        <div>
            <Card
                sx={{
                    minHeight:"250px",
                    // maxWidth:"fit-content",
                    width:"100%",
                    // height:"100%",
                    borderRadius: '5px',
                    padding: '20px',
                    // margin: '0.9rem',
                    overflowY: 'hidden',
                }}
            >
                <Stack spacing={4}>
                    <item className={classes.dateNtime}>{props.date}</item>
                    <item  className={classes.headline}
                    >{props.headline}</item>
                    <Stack spacing={6} direction='row'>
                        <Stack spacing={2} direction='row' alignItems='center'>
                            {/* <Avatar sx={{
                                backgroundColor: 'orange',
                                width: '40px',
                                height: '40px'
                            }}
                            >N</Avatar> */}
                            <Avatar alt="Girl" src="https://i.pinimg.com/474x/3b/f8/42/3bf8428fb3d3e97c248f42ac75c3862a.jpg" />
                            <Typography className={classes.username}>
                                {props.authorName}
                            </Typography>
                        </Stack>
                        <Button variant="contained" sx={{
                            backgroundColor:'ghostwhite',
                            color:'#000000'
                        }}>Follow</Button>
                    </Stack>
                    <item className={classes.info }>{props.info}</item>
                </Stack>
            </Card>
        </div>
    )
}