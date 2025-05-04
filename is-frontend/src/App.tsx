import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ChatPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/chat" : "/login"} replace />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/chat" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;