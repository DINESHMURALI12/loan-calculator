import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Box,
  Card,
  CircularProgress,
  useTheme
} from '@mui/material';
import { AmortizationRow } from '../hooks/useLoanCalculator';

interface AmortizationTableProps {
  amortizationData: AmortizationRow[];
  selectedCurrency: string;
  conversionRate: number;
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({
  amortizationData,
  selectedCurrency,
  conversionRate,
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for better UX
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [amortizationData]);

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Handle pagination
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate converted values
  const convertAmount = (amount: number) => {
    return amount * conversionRate;
  };

  // Paginate the data
  const paginatedData = amortizationData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '200px'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <Box p={2}>
        <Typography 
          variant="h5" 
          component="h3" 
          gutterBottom
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            fontWeight: 500
          }}
        >
          Amortization Schedule ({selectedCurrency})
        </Typography>
      </Box>
      
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 0,
          maxHeight: 440,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(66, 66, 66, 0.3)' : 'rgba(255, 255, 255, 0.9)',
          '& .MuiTableCell-head': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
          },
          '& .MuiTableRow-root:nth-of-type(odd)': {
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
          },
          '& .MuiTableRow-root:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
            transition: 'background-color 0.2s ease',
          },
        }}
      >
        <Table stickyHeader aria-label="amortization table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Month</TableCell>
              <TableCell align="right">Principal</TableCell>
              <TableCell align="right">Interest</TableCell>
              <TableCell align="right">Remaining Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.month}>
                <TableCell align="center">{row.month}</TableCell>
                <TableCell align="right">
                  {formatCurrency(convertAmount(row.principal))}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(convertAmount(row.interest))}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(convertAmount(row.balance))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={amortizationData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default AmortizationTable;