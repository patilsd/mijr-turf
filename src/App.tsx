import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RegistrationPage from './LoginPage/RegistrationPage';
// import { DashboardPage } from './Dashboard/DashboardPage';
import { DashboardPage } from './Dashboard/UserDashboard/DashboardPage';

import AdminPage from './Dashboard/AdminPage';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* Registration/Login Page */}
          <Route path="/" element={<RegistrationPage />} />
          {/* Dashboard Page */}
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Admin Page */}
          <Route path="/admin" element={<AdminPage />} />
          {/* Redirect undefined routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
