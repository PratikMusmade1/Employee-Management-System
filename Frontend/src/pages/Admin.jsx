// pages/Admin.jsx
import AdminDashboard from '../components/dashboard/AdminDashboard';

const Admin = () => {
  return (
    <div className="min-h-screen bg-[#030101] text-white flex flex-col items-center p-6">
      <div className="w-full max-w-6xl bg-transparent rounded-2xl p-8 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-primaryGreen">Admin Dashboard</h1>
        <AdminDashboard />
      </div>
    </div>
  );
};

export default Admin;
