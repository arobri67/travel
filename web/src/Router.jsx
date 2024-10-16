import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Route from '@/components/Route';
import AccountPage from '@/pages/AccountPage';
import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SignInPage from '@/pages/SignInPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <Route isProtected>
            <HomePage />
          </Route>
        ),
      },
      {
        path: '/signin',
        element: <SignInPage />,
      },
      {
        path: '/account/:user',
        element: (
          <Route isProtected>
            <AccountPage />
          </Route>
        ),
      },
      {
        path: '/listings/:_id',
        element: (
          <Route isProtected>
            <ListingDetailsPage />
          </Route>
        ),
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
