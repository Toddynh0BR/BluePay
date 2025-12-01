import { Routes, Route } from 'react-router-dom';

import { Calculator } from '../pages/Calculator';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />}/>
    </Routes>
  )
}