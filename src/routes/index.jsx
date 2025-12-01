import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import { AdminRoutes } from './admin.routes';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

export function Routes() {
  const { User } = useAuth()

  return (
    <BrowserRouter>
        {User ? (User.admin ? (<AdminRoutes />) : (<AppRoutes />)) : (<AuthRoutes />)}
    </BrowserRouter>
  );
}