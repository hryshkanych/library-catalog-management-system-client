import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'src/theme/theme';
import 'src/styles/global.css';
import { AuthProvider, useAuth } from 'src/context/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BookCatalog from './pages/BookCatalog/BookCatalog';
import Login from './pages/Login/Login';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <div className="flex w-screen h-screen" style={{ backgroundColor: theme.palette.primary.dark }}>
                    <BookCatalog />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
