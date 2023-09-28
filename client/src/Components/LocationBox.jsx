import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';

const locations = [
    { label: 'Mumbai', latitude: 1, longitude: 2 },
    { label: 'Pune', latitude: 1, longitude: 2 },
    { label: 'Nashik', latitude: 1, longitude: 2 },
    { label: 'Aurangabad', latitude: 1, longitude: 2 },
    { label: 'Delhi', latitude: 1, longitude: 2 },
    { label: 'Jaipur', latitude: 1, longitude: 2 },
    { label: 'Banglore', latitude: 1, longitude: 2 },
    { label: 'Goa', latitude: 1, longitude: 2 },
    { label: 'Ahemdabad', latitude: 1, longitude: 2 }
]

export default function LocationBox() {
    return (
      <Box sx={{ maxWidth: '100%', minWidth: '400px' }} >
        <div >
          <CardContent sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }} style={{padding: 0, background: '#F9F9F9', color:'#000' , borderRadius: '6px'}}>
            <IconButton style={{ color: '#000', marginLeft: '9px' }}>
              <HomeIcon />
            </IconButton>
            <Autocomplete
              disablePortal
              id="location-tag"
              options={locations}
              sx={{ flex: '1 1 auto', minWidth: 0, maxWidth: '100%', paddingY: 0, color: '#000' }}
              renderInput={(params) => <TextField {...params} 
              variant="standard" 
              style={{ color: '#000', padding: 0 }}
              />}
            />
            <div style={{padding: 0, margin: '9px' ,background: '#000', borderRadius: '6px'}}>
            <IconButton style={{ color: '#F9F9F9' }}>
                <LocationOnIcon />
            </IconButton>
            </div>
          </CardContent>
        </div>
      </Box>
    );
  }