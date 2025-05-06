import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define currency type
export type Currency = {
  code: string;
  name: string;
  rate: number;
};

// Define context type
interface CurrencyContextType {
  baseCurrency: string;
  currencies: Currency[];
  setBaseCurrency: (code: string) => void;
  conversionRates: Record<string, number>;
  loading: boolean;
  error: string | null;
}

// Create context with default undefined
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [conversionRates, setConversionRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // API Key for ExchangeRate API
  const API_KEY = '8d48d334818b78a2a9d8ac4a';
  
  // Fetch currency data whenever base currency changes
  useEffect(() => {
    const fetchCurrencyData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
        );
        
        if (response.data && response.data.result === 'success') {
          const rates = response.data.conversion_rates;
          setConversionRates(rates);
          
          // Create currency objects for display
          const currencyList: Currency[] = Object.keys(rates).map(code => ({
            code,
            name: getCurrencyName(code),
            rate: rates[code]
          }));
          
          setCurrencies(currencyList);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch exchange rates');
        }
      } catch (err) {
        setError('Failed to fetch exchange rates. Please try again later.');
        setLoading(false);
        console.error('Error fetching currency data:', err);
      }
    };
    
    fetchCurrencyData();
  }, [baseCurrency, API_KEY]);
  
  // Helper function to get currency name
  const getCurrencyName = (code: string): string => {
    const currencyNames: Record<string, string> = {
      USD: 'US Dollar',
      EUR: 'Euro',
      GBP: 'British Pound',
      JPY: 'Japanese Yen',
      AUD: 'Australian Dollar',
      CAD: 'Canadian Dollar',
      CHF: 'Swiss Franc',
      CNY: 'Chinese Yuan',
      INR: 'Indian Rupee',
      // Add more currencies as needed
    };
    
    return currencyNames[code] || code;
  };
  
  return (
    <CurrencyContext.Provider
      value={{
        baseCurrency,
        currencies,
        setBaseCurrency,
        conversionRates,
        loading,
        error
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};