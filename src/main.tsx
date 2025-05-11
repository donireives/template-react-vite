import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AntdProvider } from './providers/StyleProvider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AntdProvider>
        <App />
      </AntdProvider>
    </BrowserRouter>
  </StrictMode>,
)
