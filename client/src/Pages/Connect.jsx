import React from 'react'
import { Typography, Button, Stack, Card, Avatar, dividerClasses, Grid, Drawer, TextField} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cards from '../Components/Cards';
import BigCard from '../Components/Big-card';
import ResponsiveAppBar from '../Components/ResponsiveAppBar';

export default function Connect() {
  return (
    <div style={{ width: '100%' }}>
      <ResponsiveAppBar />
    </div>
  )
}