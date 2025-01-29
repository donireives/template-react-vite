import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { App as AntApp, ConfigProvider, theme } from "antd";
import Login from '@/pages/Auth/Login';
import Dashboard from '@/pages/Dashboard/Dashboard';
import { StrictMode } from 'react';
import { useTheme } from '@/hooks/useTheme';
import './index.css';

// Buat wrapper component untuk menerapkan theme
function ThemeWrapper({ children }) {
  const { theme: currentTheme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        token: { 
          colorPrimary: '#000',
        },
        algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeWrapper>
      <AntApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ThemeWrapper>
  </StrictMode>,
)