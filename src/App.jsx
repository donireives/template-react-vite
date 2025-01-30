import { BrowserRouter, Routes, Route } from 'react-router';
import { ConfigProvider, theme } from 'antd';
import { useTheme } from '@/hooks/useTheme';
import Login from '@/pages/Auth/Login';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Alert from '@/pages/Alert/Alert';
import NotFound from '@/pages/NotFound';

function App() {
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
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alert" element={<Alert />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App; 