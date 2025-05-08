import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useAutoLogout } from '../hooks/useAutoLogout';

import Login from '../pages/Login/Login';
import MainHub from '../pages/MainHub/MainHub';
import RickMorty from '../pages/RickMorty/RickMorty';
import Products from '../pages/Products/Products';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import CreateProduct from '../pages/CreateProduct/CreateProduct';
import Upload from '../pages/Upload/Upload';
// import NotFound from '../pages/NotFound/NotFound';


// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function AppRouter() {

  useAutoLogout();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainhub" element={<ProtectedRoute><MainHub /></ProtectedRoute>} />
        <Route path="/rick-morty" element={<ProtectedRoute><RickMorty /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
        <Route path="/create-product" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}
