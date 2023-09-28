import React, { useState } from 'react';
import { ReactDOM, Component } from 'react';
import { Typography, Button, Stack, Card, Avatar, Paper, Grid, dividerClasses, List, ListItem, ListItemIcon, ListItemText, Drawer,Divider} from '@mui/material';
import { makeStyles } from '@mui/styles';

import WindowIcon from '@mui/icons-material/Window';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SensorsIcon from '@mui/icons-material/Sensors';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import Explore from '../Pages/Explore';
import Connect from '../Pages/Connect';
import Events from '../Pages/Events';
import Learn from '../Pages/Learn';
import Sky from '../Pages/Sky';

const menuItems = [
    {
        text: "Explore",
        icon:<WindowIcon />
    },
    {
        text: "Connect",
        icon:<PeopleAltIcon />
    },
    {
        text: "Event",
        icon:<SensorsIcon />
    },
    {
        text: "Learn",
        icon:<LibraryBooksIcon />
    },
    {
        text: "Sky",
        icon:<AutoAwesomeIcon />
    },
];

const drawerWidth = 340;

const useStyles = makeStyles({
    drawer: {
        width: '21.4375rem',
    },
    root: {
       
        background: '#000000',
        height:'100%',
        display:'flex'

    },
    listItemHover: {
        backgroundColor: '#000000',
        '&:hover': {
            backgroundColor: '#333', // Change the background color on hover
            color: '#FFF', // Change the text color on hover
            borderRadius:"5px"
        },
    },
});

export default function Layout() {
    const classes = useStyles();
    const [activeComponent, setActiveComponent] = useState('Explore');

    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
    };

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'Connect':
                return <Connect />;
            case 'Event':
                return <Events />;
            case 'Learn':
                return <Learn />;
            case 'Sky':
                return <Sky />;
            default:
                return <Explore />;
        }
    };

    return (
        <div className={classes.root}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        background: '#000000',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List sx={{ color: "#FFFFFF" }}>
                    {/* HEADING */}
                        <ListItem>
                            <img src="demo_logo.svg" alt="StarConnect SVG" />
                            <Typography variant="h5" style={{ color: '#F9F9F9' }}>
                                <b>StarConnect</b>
                            </Typography>
                        </ListItem>
                    {/* OTHER OPTIONS */}
                    {menuItems.map((item, index) => (
                        
                        <ListItem key={index} className={classes.listItemHover}>
                            <ListItemIcon style={{ color: '#F9F9F9' }}>{item.icon}</ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                onClick={() => handleComponentChange(item.text)}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Divider flexItem />
            {renderActiveComponent()}
        </div>
    );
}
