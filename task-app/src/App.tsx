import { Routes } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import PrivateRoutes from './PrivateRoutes';
import {
  Login,
} from '../src/pages/Login';
import Task from './pages/Task';
import { NotFound } from './pages/NotFound';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/tasks' element={<Task />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;