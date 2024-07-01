import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Layout from './routes/layout/layout';
import HomePage from './routes/homePage/homePage';
import ListPage from './routes/listPage/listPage';
import SinglePage from './routes/singlePage/singlePage';
import ProfilePage from './routes/profilePage/profilePage';
import Login from './routes/login/login';
import Register from './routes/register/register';
import About from './routes/about/About';
import Contact from './routes/contact/Contact';
import Agents from './routes/agents/Agents';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/list',
          element: <ListPage />
        },
        {
          path: '/:id',
          element: <SinglePage />
        },
        {
          path: '/profile',
          element: <ProfilePage />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/agents',
          element: <Agents />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
