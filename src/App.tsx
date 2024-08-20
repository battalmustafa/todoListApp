import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
