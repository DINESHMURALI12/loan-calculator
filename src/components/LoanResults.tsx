import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button,
  Grid,
  useTheme,
  SelectChangeEvent,
  Paper
} from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useCurrency } from '../context/CurrencyContext';
import { LoanSummary } from '../hooks/useLoanCalculator';
import AmortizationTable from './AmortizationTable';

ChartJS.register(ArcElement, Tooltip, Legend);

interface LoanResultsProps {
  loanSummary: LoanSummary | null;
  onReset: () => void;
}

const LoanResults: React.FC<LoanResultsProps> = ({ loanSummary, onReset }) => {
  const theme = useTheme();
  const { baseCurrency, setBaseCurrency, conversionRates, loading } = useCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState(baseCurrency);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    // Update exchange rate when currency changes or when conversion rates are loaded
    if (conversionRates && conversionRates[selectedCurrency]) {
      setExchangeRate(conversionRates[selectedCurrency]);
    }
  }, [selectedCurrency, conversionRates]);

  useEffect(() => {
    // Show chart with animation after a delay
    if (loanSummary) {
      const timer = setTimeout(() => {
        setShowChart(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loanSummary]);

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    const currency = event.target.value;
    setSelectedCurrency(currency);
    setBaseCurrency(currency);
  };

  if (!loanSummary) {
    return null;
  }

  // Format currency for display
  const formatCurrency = (amount: number, code: string = selectedCurrency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Convert amount to selected currency
  const convertAmount = (amount: number) => {
    return amount * exchangeRate;
  };

  // Prepare chart data
  const chartData = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [loanSummary.principalToTotalRatio * 100, loanSummary.interestToTotalRatio * 100],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
        ],
        borderColor: [
          theme.palette.primary.dark,
          theme.palette.secondary.dark,
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 500,
            animation: 'fadeIn 0.5s ease-in-out'
          }}
        >
          Monthly EMI: {formatCurrency(convertAmount(loanSummary.monthlyPayment))}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 2 }}>
          <Box sx={{ minWidth: 200, mr: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="currency-select-label">Currency</InputLabel>
              <Select
                labelId="currency-select-label"
                id="currency-select"
                value={selectedCurrency}
                label="Currency"
                onChange={handleCurrencyChange}
                disabled={loading}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
                <MenuItem value="JPY">JPY</MenuItem>
                <MenuItem value="AUD">AUD</MenuItem>
                <MenuItem value="CAD">CAD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={onReset}
            sx={{ ml: 'auto' }}
          >
            RESET TABLE
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card 
              elevation={2}
              sx={{ 
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: 4 }
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>Loan Summary</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(66, 66, 66, 0.2)' : 'rgba(66, 165, 245, 0.1)',
                        borderRadius: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(66, 66, 66, 0.3)' : 'rgba(66, 165, 245, 0.15)',
                        }
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">Monthly Payment</Typography>
                      <Typography variant="h6">{formatCurrency(convertAmount(loanSummary.monthlyPayment))}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(66, 66, 66, 0.2)' : 'rgba(66, 165, 245, 0.1)',
                        borderRadius: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(66, 66, 66, 0.3)' : 'rgba(66, 165, 245, 0.15)',
                        }
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">Total Payment</Typography>
                      <Typography variant="h6">{formatCurrency(convertAmount(loanSummary.totalPayment))}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(156, 39, 176, 0.1)' : 'rgba(156, 39, 176, 0.05)',
                        borderRadius: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(156, 39, 176, 0.2)' : 'rgba(156, 39, 176, 0.1)',
                        }
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">Total Interest</Typography>
                      <Typography variant="h6">{formatCurrency(convertAmount(loanSummary.totalInterest))}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(156, 39, 176, 0.1)' : 'rgba(156, 39, 176, 0.05)',
                        borderRadius: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(156, 39, 176, 0.2)' : 'rgba(156, 39, 176, 0.1)',
                        }
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">Interest Percentage</Typography>
                      <Typography variant="h6">{(loanSummary.interestToTotalRatio * 100).toFixed(2)}%</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card 
              elevation={2}
              sx={{ 
                height: '100%', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: 4 }
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>Payment Breakdown</Typography>
                <Box 
                  sx={{ 
                    width: '100%', 
                    maxWidth: '250px', 
                    mx: 'auto',
                    opacity: showChart ? 1 : 0,
                    transition: 'opacity 0.6s ease-in'
                  }}
                >
                  {showChart && <Doughnut data={chartData} />}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <AmortizationTable 
        amortizationData={loanSummary.amortizationSchedule} 
        selectedCurrency={selectedCurrency}
        conversionRate={exchangeRate}
      />
    </>
  );
};

export default LoanResults;