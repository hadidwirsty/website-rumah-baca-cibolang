import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Home from '../home/Home';
import About from '../components/About';
import Admin from '../admin/Admin';
import Login from '../components/Login';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/admin/dashboard',
        element: (
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
