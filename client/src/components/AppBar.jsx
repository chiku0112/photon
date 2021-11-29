import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="cxv-appbar">
        <Toolbar variant="regular" className='cxv-appar-branding'>
          <Typography variant="h6" color="inherit" component="div">
            Photon App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}