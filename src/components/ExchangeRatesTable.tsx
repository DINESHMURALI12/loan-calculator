import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  useTheme
} from '@mui/material';
import { Search, Clock } from 'lucide-react';
import { useCurrency, Currency } from '../context/CurrencyContext';

const ExchangeRatesTable: React.FC = () => {
  const theme = useTheme();
  const { currencies, baseCurrency, loading, error } = useCurrency();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Set last updated time
  useEffect(() => {
    if (!loading && currencies.length > 0) {
      setLastUpdated(new Date());
    }
  }, [loading, currencies]);

  // Filter currencies based on search term
  useEffect(() => {
    if (currencies.length > 0) {
      const filtered = currencies.filter(currency => 
        currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCurrencies(filtered);
      setPage(0); // Reset to first page when search changes
    }
  }, [searchTerm, currencies]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Return time since last update in human-readable format
  const getTimeAgo = () => {
    if (!lastUpdated) return '';
    
    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    
    if (diffSecs < 60) return `${diffSecs} seconds ago`;
    if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)} minutes ago`;
    return `${Math.floor(diffSecs / 3600)} hours ago`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Card sx={{ my: 4, bgcolor: 'error.main', color: 'error.contrastText' }}>
        <CardContent>
          <Typography variant="h6">Error Loading Exchange Rates</Typography>
          <Typography variant="body1">{error}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      elevation={3} 
      sx={{ 
        my: 4,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': { boxShadow: 6 }
      }}
    >
      <CardContent sx={{ pb: 0 }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 500, mb: 1 }}>
            Live Exchange Rates
          </Typography>
          
          <Chip 
            icon={<Clock size={16} />} 
            label={`Updated: ${getTimeAgo()}`} 
            color="primary" 
            variant="outlined" 
            size="small"
            sx={{ mb: 1 }}
          />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search by currency code or name..."
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Showing rates relative to 1 {baseCurrency} ({currencies.find(c => c.code === baseCurrency)?.name})
        </Typography>
      </CardContent>

      <TableContainer component={Paper} sx={{ maxHeight: 440, boxShadow: 'none' }}>
        <Table stickyHeader aria-label="exchange rates table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', background: theme.palette.primary.main, color: 'white' }}>Currency Code</TableCell>
              <TableCell sx={{ fontWeight: 'bold', background: theme.palette.primary.main, color: 'white' }}>Currency Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', background: theme.palette.primary.main, color: 'white' }}>Exchange Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCurrencies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((currency) => (
                <TableRow 
                  key={currency.code}
                  hover
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)' 
                    },
                    '&:nth-of-type(odd)': {
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    },
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Chip 
                      label={currency.code} 
                      size="small" 
                      color={currency.code === baseCurrency ? "primary" : "default"}
                      sx={{ fontWeight: currency.code === baseCurrency ? 'bold' : 'normal' }}
                    />
                  </TableCell>
                  <TableCell>{currency.name}</TableCell>
                  <TableCell align="right">{currency.rate.toFixed(4)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={filteredCurrencies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default ExchangeRatesTable;