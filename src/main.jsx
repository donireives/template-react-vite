import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App as AntdApp } from 'antd';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AntdApp>
      <App />
    </AntdApp>
  </StrictMode>,
);