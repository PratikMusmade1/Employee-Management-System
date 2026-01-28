// App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Outlet />
    </div>
  );
};

export default App;
