import { useState, useCallback } from 'react';

export interface LoanDetails {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export interface AmortizationRow {
  month: number;
  principal: number;
  interest: number;
  balance: number;
  payment: number;
}

export interface LoanSummary {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationRow[];
  interestToTotalRatio: number;
  principalToTotalRatio: number;
}

const useLoanCalculator = () => {
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    loanAmount: 100000,
    interestRate: 8.5,
    loanTerm: 5,
  });
  
  const [loanSummary, setLoanSummary] = useState<LoanSummary | null>(null);
  
  const calculateLoan = useCallback(() => {
    const { loanAmount, interestRate, loanTerm } = loanDetails;
    
    // Convert annual interest rate to monthly and decimal form
    const monthlyInterestRate = interestRate / 12 / 100;
    
    // Convert loan term to months
    const loanTermMonths = loanTerm * 12;
    
    // Calculate monthly payment using the EMI formula
    // EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
    const monthlyPayment = 
      (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / 
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
    
    // Calculate total payment over the loan term
    const totalPayment = monthlyPayment * loanTermMonths;
    
    // Calculate total interest paid
    const totalInterest = totalPayment - loanAmount;
    
    // Generate amortization schedule
    const amortizationSchedule: AmortizationRow[] = [];
    
    let remainingBalance = loanAmount;
    
    for (let month = 1; month <= loanTermMonths; month++) {
      // Calculate interest for this month
      const interestPayment = remainingBalance * monthlyInterestRate;
      
      // Calculate principal for this month
      const principalPayment = monthlyPayment - interestPayment;
      
      // Update remaining balance
      remainingBalance -= principalPayment;
      
      // Handle potential floating point errors for the last payment
      if (month === loanTermMonths) {
        if (Math.abs(remainingBalance) < 0.01) {
          remainingBalance = 0;
        }
      }
      
      // Add row to amortization schedule
      amortizationSchedule.push({
        month,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance,
        payment: monthlyPayment,
      });
    }
    
    // Calculate ratios for chart
    const interestToTotalRatio = totalInterest / totalPayment;
    const principalToTotalRatio = loanAmount / totalPayment;
    
    // Update loan summary
    setLoanSummary({
      monthlyPayment,
      totalPayment,
      totalInterest,
      amortizationSchedule,
      interestToTotalRatio,
      principalToTotalRatio
    });
    
  }, [loanDetails]);
  
  const updateLoanDetails = useCallback((details: Partial<LoanDetails>) => {
    setLoanDetails(prev => ({ ...prev, ...details }));
  }, []);
  
  return {
    loanDetails,
    loanSummary,
    calculateLoan,
    updateLoanDetails,
  };
};

export default useLoanCalculator;