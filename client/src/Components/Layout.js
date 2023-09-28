import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet, useNavigate } from 'react-router-dom';
import { Typography, Button, Stack, Card, Avatar, Paper, Grid, dividerClasses, List, ListItem, ListItemIcon, ListItemText, Drawer, Divider} from '@mui/material';
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
import Login from '../Pages/Login'

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

// export default function Layout() {
//     const classes = useStyles();
//     const [activeComponent, setActiveComponent] = useState('Explore');
//     const [loggedIn, setLoggedIn] = useState(false);

//     useEffect(() => {
//         // Check if the user is logged in by examining your authentication state
//         const isAuthenticated = localStorage.getItem('jwtToken'); // You can replace this with your actual authentication logic
//         // Update the login status state
//         setLoggedIn(!!isAuthenticated);
//     }, []);

//     const navigate = useNavigate();

//     const handleComponentChange = (componentName) => {
//         setActiveComponent(componentName);
//     };

//     const handleLogout = () => {
//         // Add your logout logic here
//         // For example, clear the authentication token from local storage
//         localStorage.removeItem('jwtToken');
//         // Redirect to the login page
//         navigate('/login');
//     };

//     const renderActiveComponent = () => {
//         if (!loggedIn) {
//             // If not logged in, render the Login component
//             return <Login />;
//         }
//         switch (activeComponent) {
//             case 'Connect':
//                 return <Connect />;
//             case 'Event':
//                 return <Events />;
//             case 'Learn':
//                 return <Learn />;
//             case 'Sky':
//                 return <Sky />;
//             default:
//                 return <Explore />;
//         }
//     };

//     return (
//         <Router>
//         <div className={classes.root}>
//             <Drawer
//                 sx={{
//                     width: drawerWidth,
//                     flexShrink: 0,
//                     '& .MuiDrawer-paper': {
//                         width: drawerWidth,
//                         boxSizing: 'border-box',
//                         background: '#000000',
//                     },
//                 }}
//                 variant="permanent"
//                 anchor="left"
//             >
//                 <List sx={{ color: "#FFFFFF" }}>
//                     {/* HEADING */}
//                         <ListItem>
//                             <img src="demo_logo.svg" alt="StarConnect SVG" />
//                             <Typography variant="h5" style={{ color: '#F9F9F9' }}>
//                                 <b>StarConnect</b>
//                             </Typography>
//                         </ListItem>
//                     {/* OTHER OPTIONS */}
//                     {menuItems.map((item, index) => (
                        
//                         <ListItem key={index} className={classes.listItemHover}>
//                             <ListItemIcon style={{ color: '#F9F9F9' }}>{item.icon}</ListItemIcon>
//                             <ListItemText
//                                 primary={item.text}
//                                 onClick={() => handleComponentChange(item.text)}
//                             />
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>
//             <Divider flexItem />
//             <Routes>
//                 <Route path="/" element={<Explore />} />
//                 <Route path="/connect" element={<Connect />} />
//                 <Route path="/event" element={<Events />} />
//                 <Route path="/learn" element={<Learn />} />
//                 <Route path="/sky" element={<Sky />} />
//                 <Route path="/login" element={<Login />} />
//             </Routes>
//             {renderActiveComponent()}
//         </div>
//         </Router>
//     );
// }

export default function Layout() {
    const classes = useStyles();
    const [activeComponent, setActiveComponent] = useState('Explore');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by examining your authentication state
        const isAuthenticated = localStorage.getItem('jwtToken');
        // Update the login status state
        setLoggedIn(!!isAuthenticated);
    }, []);

    const navigate = useNavigate();

    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
    };

    const handleLogout = () => {
        // Add your logout logic here
        // For example, clear the authentication token from local storage
        localStorage.removeItem('jwtToken');
        // Redirect to the login page
        navigate('/login');
    };

    return (
        // <Router>
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
                        {/* DRAWER BUTTONS */}
                        {menuItems.map((item, index) => (
                            <ListItem
                                key={index}
                                className={classes.listItemHover}
                                button
                                component={Link} // Use Link component for navigation
                                to={item.path} // Define the path for each menu item
                            >
                                <ListItemIcon style={{ color: '#F9F9F9' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Divider flexItem />

                {/* Logout button */}
                {loggedIn && (
                    <Button onClick={handleLogout} variant="outlined" color="secondary">
                        Logout
                    </Button>
                )}
            </div>
        /* </Router> */
    );
}