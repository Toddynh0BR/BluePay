import { createRoot } from 'react-dom/client';
import { AuthProvider } from './hooks/auth';
import GlobalStyle from './style/global';
import { StrictMode } from 'react';
import { Routes } from './routes';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
     <AuthProvider> 
      <Routes />
     </AuthProvider> 
  </StrictMode>,
)
