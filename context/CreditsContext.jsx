'use client'
import { useUser } from '@/app/provider';  // Ensure you have the correct import for useUser
import { supabase } from '@/services/supabaseClient';
import { createContext, useContext, useEffect, useState } from 'react';

// Create context for credits
const CreditsContext = createContext();

export function CreditsProvider({ children }) {
  const { user } = useUser();  // Move this inside the provider to ensure it's used correctly
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch credits for the user on component mount
  useEffect(() => {
    if (user) {
      fetchCredits(); // Only fetch credits if the user is available
    }
  }, [user]); // Dependency on user, so it refetches when user changes

  // Fetch credits from Supabase
  const fetchCredits = async () => {
    try {
      const { data, error } = await supabase
        .from('Users') // Adjust table name if needed
        .select('credits') // Adjust column name if needed
        .eq('email', user?.email);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setCredits(data[0].credits); // Assuming credits is a field in the Users table
      } else {
        setCredits(0); // Default to 0 if no credits are found
      }
    } catch (err) {
      setError('Error fetching credits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreditsContext.Provider value={{ credits, loading, error }}>
      {children}
    </CreditsContext.Provider>
  );
}

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};
