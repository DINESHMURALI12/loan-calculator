import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const ErrorPage: React.FC = () => {
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
          <AlertTriangle 
            size={80} 
            color="#f44336"
            style={{ marginBottom: '16px' }} 
          />
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 500 }}
          >
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            We're sorry, but there was an error processing your request.
          </Typography>
        </Box>

        <Box sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
            Possible reasons:
          </Typography>
          <ul style={{ textAlign: 'left' }}>
            <li>The API server might be unavailable at the moment</li>
            <li>There might be a network connection issue</li>
            <li>The API key might have expired or reached its usage limit</li>
            <li>There might be a bug in the application</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2 }}>
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

export default ErrorPage;