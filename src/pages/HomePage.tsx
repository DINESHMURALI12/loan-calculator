import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import LoanForm from '../components/LoanForm';
import LoanResults from '../components/LoanResults';
import useLoanCalculator, { LoanDetails, LoanSummary } from '../hooks/useLoanCalculator';
import { CurrencyProvider } from '../context/CurrencyContext';

const HomePage: React.FC = () => {
  const { loanDetails, updateLoanDetails, calculateLoan, loanSummary } = useLoanCalculator();
  const [calculatedSummary, setCalculatedSummary] = useState<LoanSummary | null>(null);
  
  const handleCalculate = (details: LoanDetails) => {
    // Update loan details if they've changed
    if (
      details.loanAmount !== loanDetails.loanAmount ||
      details.interestRate !== loanDetails.interestRate ||
      details.loanTerm !== loanDetails.loanTerm
    ) {
      updateLoanDetails(details);
    }
    
    // Calculate loan and update summary
    calculateLoan();
    setCalculatedSummary(loanSummary);
  };
  
  const handleReset = () => {
    setCalculatedSummary(null);
  };
  
  return (
    <CurrencyProvider>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <LoanForm onCalculate={handleCalculate} />
          
          {calculatedSummary && (
            <LoanResults
              loanSummary={calculatedSummary}
              onReset={handleReset}
            />
          )}
          
          {!calculatedSummary && (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8, 
                color: 'text.secondary',
                animation: 'fadeIn 1s ease-in-out' 
              }}
            >
              <Typography variant="h5" gutterBottom>
                Enter loan details and click Calculate
              </Typography>
              <Typography variant="body1">
                See your monthly payment, amortization schedule, and more
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </CurrencyProvider>
  );
};

export default HomePage;