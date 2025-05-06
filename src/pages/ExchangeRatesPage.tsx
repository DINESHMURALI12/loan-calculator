import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ExchangeRatesTable from '../components/ExchangeRatesTable';
import { CurrencyProvider } from '../context/CurrencyContext';

const ExchangeRatesPage: React.FC = () => {
  return (
    <CurrencyProvider>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 500,
              pb: 1,
              borderBottom: '2px solid',
              borderColor: 'primary.main'
            }}
          >
            Live Exchange Rates
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4 }}>
            View current exchange rates for 160+ currencies around the world. These rates are updated in real-time and are sourced from the Exchange Rate API.
          </Typography>
          
          <ExchangeRatesTable />
        </Box>
      </Container>
    </CurrencyProvider>
  );
};

export default ExchangeRatesPage;