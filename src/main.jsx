import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { App as AntApp, ConfigProvider } from "antd";
import Login from '@/pages/Auth/Login';
import LandingPage from '@/pages/Landing/LandingPage';
import Home from '@/pages/Home/Home';
import { StrictMode } from 'react';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={{ token: { colorPrimary: '#000' } }}>
      <AntApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  </StrictMode>,
)