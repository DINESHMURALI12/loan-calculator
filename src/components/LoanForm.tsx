import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Slider,
  InputAdornment
} from '@mui/material';
import { DollarSign, Percent, Calendar } from 'lucide-react';
import useLoanCalculator, { LoanDetails } from '../hooks/useLoanCalculator';

interface LoanFormProps {
  onCalculate: (loanDetails: LoanDetails) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ onCalculate }) => {
  const { loanDetails, updateLoanDetails } = useLoanCalculator();
  const [localValues, setLocalValues] = useState({
    loanAmount: loanDetails.loanAmount.toString(),
    interestRate: loanDetails.interestRate.toString(),
    loanTerm: loanDetails.loanTerm.toString()
  });
  const [formErrors, setFormErrors] = useState({
    loanAmount: '',
    interestRate: '',
    loanTerm: ''
  });

  // Validate and handle changes for amount
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalValues(prev => ({ ...prev, loanAmount: value }));
    
    // Validation
    if (!value) {
      setFormErrors(prev => ({ ...prev, loanAmount: 'Amount is required' }));
    } else if (isNaN(Number(value)) || Number(value) <= 0) {
      setFormErrors(prev => ({ ...prev, loanAmount: 'Please enter a valid amount' }));
    } else {
      setFormErrors(prev => ({ ...prev, loanAmount: '' }));
      updateLoanDetails({ loanAmount: Number(value) });
    }
  };

  // Validate and handle changes for interest rate
  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalValues(prev => ({ ...prev, interestRate: value }));
    
    // Validation
    if (!value) {
      setFormErrors(prev => ({ ...prev, interestRate: 'Interest rate is required' }));
    } else if (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100) {
      setFormErrors(prev => ({ ...prev, interestRate: 'Please enter a valid interest rate (0-100%)' }));
    } else {
      setFormErrors(prev => ({ ...prev, interestRate: '' }));
      updateLoanDetails({ interestRate: Number(value) });
    }
  };

  // Validate and handle changes for loan term
  const handleTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalValues(prev => ({ ...prev, loanTerm: value }));
    
    // Validation
    if (!value) {
      setFormErrors(prev => ({ ...prev, loanTerm: 'Loan term is required' }));
    } else if (isNaN(Number(value)) || Number(value) <= 0 || !Number.isInteger(Number(value))) {
      setFormErrors(prev => ({ ...prev, loanTerm: 'Please enter a valid number of years' }));
    } else {
      setFormErrors(prev => ({ ...prev, loanTerm: '' }));
      updateLoanDetails({ loanTerm: Number(value) });
    }
  };

  // Handler for slider changes
  const handleSliderChange = (field: keyof LoanDetails) => (_: Event, value: number | number[]) => {
    const numValue = value as number;
    
    // Update both local state and loan details
    if (field === 'loanAmount') {
      setLocalValues(prev => ({ ...prev, loanAmount: numValue.toString() }));
    } else if (field === 'interestRate') {
      setLocalValues(prev => ({ ...prev, interestRate: numValue.toString() }));
    } else if (field === 'loanTerm') {
      setLocalValues(prev => ({ ...prev, loanTerm: numValue.toString() }));
    }
    
    updateLoanDetails({ [field]: numValue });
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Check if there are any errors
    if (!formErrors.loanAmount && !formErrors.interestRate && !formErrors.loanTerm) {
      onCalculate(loanDetails);
    }
  };

  // Add animation class when values change
  const [animateAmount, setAnimateAmount] = useState(false);
  const [animateRate, setAnimateRate] = useState(false);
  const [animateTerm, setAnimateTerm] = useState(false);

  useEffect(() => {
    setAnimateAmount(true);
    const timer = setTimeout(() => setAnimateAmount(false), 300);
    return () => clearTimeout(timer);
  }, [localValues.loanAmount]);

  useEffect(() => {
    setAnimateRate(true);
    const timer = setTimeout(() => setAnimateRate(false), 300);
    return () => clearTimeout(timer);
  }, [localValues.interestRate]);

  useEffect(() => {
    setAnimateTerm(true);
    const timer = setTimeout(() => setAnimateTerm(false), 300);
    return () => clearTimeout(timer);
  }, [localValues.loanTerm]);

  return (
    <Card 
      elevation={3}
      sx={{ 
        mb: 4,
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardContent>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 500 }}>
          Loan Calculator Dashboard
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Loan Amount */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Loan Amount
              </Typography>
              <TextField
                fullWidth
                value={localValues.loanAmount}
                onChange={handleAmountChange}
                error={!!formErrors.loanAmount}
                helperText={formErrors.loanAmount}
                className={animateAmount ? 'pulse-animation' : ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DollarSign size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s'
                  }
                }}
              />
              <Slider
                value={Number(localValues.loanAmount)}
                onChange={handleSliderChange('loanAmount')}
                min={1000}
                max={1000000}
                step={1000}
                aria-labelledby="loan-amount-slider"
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value.toLocaleString()}`}
              />
            </Grid>

            {/* Interest Rate */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Interest Rate (%)
              </Typography>
              <TextField
                fullWidth
                value={localValues.interestRate}
                onChange={handleRateChange}
                error={!!formErrors.interestRate}
                helperText={formErrors.interestRate}
                className={animateRate ? 'pulse-animation' : ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Percent size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1 }}
              />
              <Slider
                value={Number(localValues.interestRate)}
                onChange={handleSliderChange('interestRate')}
                min={0.1}
                max={30}
                step={0.1}
                aria-labelledby="interest-rate-slider"
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
              />
            </Grid>

            {/* Loan Term */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Term (Years)
              </Typography>
              <TextField
                fullWidth
                value={localValues.loanTerm}
                onChange={handleTermChange}
                error={!!formErrors.loanTerm}
                helperText={formErrors.loanTerm}
                className={animateTerm ? 'pulse-animation' : ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Calendar size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1 }}
              />
              <Slider
                value={Number(localValues.loanTerm)}
                onChange={handleSliderChange('loanTerm')}
                min={1}
                max={30}
                step={1}
                aria-labelledby="loan-term-slider"
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} ${value === 1 ? 'Year' : 'Years'}`}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{
                py: 1,
                px: 4,
                fontWeight: 500,
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                },
                '&:active': {
                  transform: 'translateY(0)',
                }
              }}
            >
              CALCULATE
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoanForm;