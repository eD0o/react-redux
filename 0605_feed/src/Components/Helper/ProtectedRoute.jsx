import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({children}) => {
  const { data } = useSelector((state) => state.user);
  if (data) return children
  else if (data === null) return <Navigate to="/login" />;
  else return null;
};

export default ProtectedRoute;
