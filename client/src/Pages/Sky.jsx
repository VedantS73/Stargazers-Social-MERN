import React from 'react'
import { Typography, Button, Stack, Card, Avatar, dividerClasses, Grid, Drawer, } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cards from '../Components/Cards';
import BigCard from '../Components/Big-card';
import SolarSystem from '../Components/three/components/SolarSystem';

export default function Learn() {
    return (
      <div>
        <h1 style={{color:'white'}}>INSIDE SKY</h1>
        <SolarSystem />
      </div>
    )
}