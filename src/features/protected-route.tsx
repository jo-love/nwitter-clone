// 리다이렉션 컴포넌트

import React from 'react';
import { auth } from '../lib/firebase';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = auth.currentUser;

  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute; 
