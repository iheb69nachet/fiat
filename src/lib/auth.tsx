import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsAdmin(session?.user?.user_metadata?.role === 'admin' ?? false);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setIsAdmin(session?.user?.user_metadata?.role === 'admin' ?? false);
      setLoading(false);

      if (event === 'SIGNED_OUT') {
        navigate('/admin/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAdmin,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};