
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Public Pages
import LandingPage from './components/dashboard/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import PublicPortfolio from './pages/PublicPortfolio';
import CaseStudyDetail from './components/portfolio/CaseStudyForm';
import PortfolioView from './components/portfolio/PortfolioView';

// Protected Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import CreateCaseStudy from './pages/dashboard/CreateCaseStudy';
import ThemeSelection from './pages/dashboard/ThemeSelection';
import ProfileSettings from './pages/dashboard/ProfileSettings';
import { PortfolioProvider } from './context/PortfolioContext';
// Auth Protection Component
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:username" element={<PublicPortfolio />} />
            <Route path="/:username/project/:slug" element={<CaseStudyDetail />} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/create-case-study" element={
              <ProtectedRoute>
                <CreateCaseStudy />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/theme" element={
              <ProtectedRoute>
                <ThemeSelection />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/profile" element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            } />
            <Route path="/portfolio/:id" element={<PortfolioView />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
