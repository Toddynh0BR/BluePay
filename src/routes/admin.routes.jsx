import { Routes, Route } from 'react-router-dom';

import { Calculator } from '../pages/Calculator';
import { ShowUser } from '../pages/ShowUser';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />}/>
      <Route path="/user-info/:id" element={<ShowUser />}/>
    </Routes>
  )
}