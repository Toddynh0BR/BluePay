import { createRoot } from 'react-dom/client';
import { AuthProvider } from './hooks/auth';
import GlobalStyle from './style/global';
import { StrictMode } from 'react';
import { Routes } from './routes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
     <AuthProvider> 
      <Routes />
     </AuthProvider> 
  </StrictMode>,
)
