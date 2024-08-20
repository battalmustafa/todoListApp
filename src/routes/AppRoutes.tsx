import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import MainLayout from '@/layouts/MainLayout';

const AppRoutes: React.FC = () => {
  return (
    <MainLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </MainLayout>
  );
};

export default AppRoutes;
