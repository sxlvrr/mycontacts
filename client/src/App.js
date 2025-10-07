import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ContactsPage from './components/contacts/ContactsPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Redirection de la racine vers /contacts si connecté, sinon vers /login */}
            <Route path="/" element={<Navigate to="/contacts" replace />} />
            
            {/* Routes d'authentification */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Routes protégées */}
            <Route 
              path="/contacts" 
              element={
                <ProtectedRoute>
                  <ContactsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Route de fallback */}
            <Route path="*" element={<Navigate to="/contacts" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
