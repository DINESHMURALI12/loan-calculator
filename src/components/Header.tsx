import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  ListItemButton,
  Switch, 
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const routes = [
    { name: 'HOME', path: '/' },
    { name: 'EXCHANGE RATES (LIVE)', path: '/exchange-rates' },
    { name: 'ABOUT', path: '/about' },
    { name: 'ERROR PAGE', path: '/error-demo' },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = (
    <>
      {routes.map((route) => (
        <Button
          key={route.path}
          component={Link}
          to={route.path}
          color="inherit"
          sx={{
            mx: 1,
            backgroundColor: isActive(route.path) ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
            },
            transition: 'background-color 0.3s ease'
          }}
        >
          {route.name}
        </Button>
      ))}
    </>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton edge="end" color="inherit" aria-label="close drawer">
          <X size={24} />
        </IconButton>
      </Box>
      <List>
        {routes.map((route) => (
          <ListItem key={route.path} disablePadding>
            <ListItemButton
              component={Link}
              to={route.path}
              selected={isActive(route.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemText primary={route.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            textDecoration: 'none', 
            color: 'inherit',
            fontWeight: 'bold',
            letterSpacing: 0.5,
          }}
        >
          Loan Calculator
        </Typography>

        {isMobile ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Switch
              checked={mode === 'dark'}
              onChange={toggleTheme}
              color="default"
              size="small"
            />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <Menu size={24} />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              {drawer}
            </Drawer>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navItems}
            <Switch
              checked={mode === 'dark'}
              onChange={toggleTheme}
              color="default"
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;