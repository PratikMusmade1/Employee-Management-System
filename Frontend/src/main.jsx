// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './assets/styles/tailwind.css';
import './assets/styles/theme.css';

import App from './App';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Employee from './pages/Employee';
import TaskPage from './pages/TaskPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Login /> },
      { path: 'admin', element: <Admin /> },
      { path: 'employee', element: <Employee /> },
      { path: 'employee/tasks/:id', element: <TaskPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
