import React from 'react';
import { Container } from '@mui/material';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="py-24 bg-gradient-to-right  "> 
      <Container maxWidth="xl" >
    <header className="mb-4">
      <h1 className=" text-3xl font-semibold text-center text-white ">Task Management</h1>
    </header>
    <main>{children}</main>
    <footer className=" mt-4 mx-auto">
      <p className='flex justify-center text-white '>© 2024 Task Management App</p>
    </footer>
  </Container></div>
   
  );
};

export default MainLayout;
