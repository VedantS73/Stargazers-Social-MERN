import React from 'react'
import { Typography, Button, Stack, Card, Avatar, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default function Objects() {
    return (
        <div>
            <Stack padding={2} color="#ffffff" sx={{ background: "#000000", maxWidth: "226px", maxHeight: "125px" }}>
                <Typography sx={{ fontSize: '20px', fontWeight: '700' }}>
                    The Moon
                </Typography>
                <Typography sx={{
                    fontSize: '0.9375rem',
                    lineHeight: 'normal',
                    color: '#A1A1AA',
                    fontWeight: '700'
                }}>Visibility: Naked Eye
                </Typography>
                <item sx={{width: "164px", height: "40px", backgroundColor:"#ffffff"}}>
                    <Typography>
                        Time:20:00
                    </Typography>
                </item>
            </Stack>
        </div>
    )
}