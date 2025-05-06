import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, File as File404 } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          borderRadius: 2,
          animation: 'fadeIn 0.5s ease-in-out',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6
          }
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            mb: 4 
          }}
        >
          <File404 
            size={100} 
            color="#9c27b0"
            style={{ marginBottom: '16px' }} 
          />
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            404
          </Typography>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 500 }}
          >
            Page Not Found
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/"
            startIcon={<Home size={20} />}
            sx={{ 
              py: 1.5,
              px: 4,
              fontWeight: 500,
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              }
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;