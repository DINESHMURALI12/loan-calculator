import React from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Divider } from '@mui/material';
import { Calculator, DollarSign, BarChart4, CreditCard, Code, LineChart, RefreshCcw, Wallet } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
        About This App
      </Typography>

      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6
          }
        }}
      >
        <Typography variant="body1" paragraph>
          This Loan Calculator App is a modern, single-page web application built using React and Material UI. It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and see real-time currency conversions of their EMI using live exchange rates.
        </Typography>
      </Paper>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card 
            elevation={3}
            sx={{ 
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                <Calculator size={24} style={{ marginRight: '8px' }} /> Features
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Calculator size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Loan EMI calculation using standard financial formulas" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BarChart4 size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Dynamic amortization schedule table with monthly breakdown" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <RefreshCcw size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Real-time currency conversion of EMI using a live exchange rate API" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DollarSign size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Paginated exchange rate table for 160+ currencies" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card 
            elevation={3}
            sx={{ 
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                <Code size={24} style={{ marginRight: '8px' }} /> Technologies Used
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LineChart size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="React" 
                    secondary="Hooks, Routing, Context API"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CreditCard size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Material UI" 
                    secondary="For styling and responsive components"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Wallet size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Axios" 
                    secondary="For API calls"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DollarSign size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Exchange Rate API" 
                    secondary="For real-time currency conversion"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          EMI Formula Used
        </Typography>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            borderRadius: 2,
            bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(25, 118, 210, 0.05)',
            borderLeft: '4px solid',
            borderColor: 'primary.main'
          }}
        >
          <Typography variant="body1" paragraph>
            The EMI (Equated Monthly Installment) is calculated using the standard formula:
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: 'monospace', 
              fontWeight: 'bold',
              py: 1,
              px: 2,
              bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
              borderRadius: 1,
              display: 'inline-block'
            }}
          >
            EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
          </Typography>
          <Typography variant="body1" mt={2}>
            Where:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="P = Principal loan amount" />
            </ListItem>
            <ListItem>
              <ListItemText primary="R = Monthly interest rate (annual rate / 12 / 100)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="N = Loan duration in months" />
            </ListItem>
          </List>
        </Paper>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          Currency Conversion API
        </Typography>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            borderRadius: 2 
          }}
        >
          <Typography variant="body1" paragraph>
            This app integrates with the free tier of the ExchangeRate-API to fetch live exchange rates.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            API Endpoint Example:
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: 'monospace', 
              p: 1.5,
              bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
              borderRadius: 1,
              overflowX: 'auto'
            }}
          >
            https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD
          </Typography>
          <Typography variant="body1" mt={2}>
            API Key: 8d48d334818b78a2a9d8ac4a
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AboutPage;