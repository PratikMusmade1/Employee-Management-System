import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err.message);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/employees/add', {
        name,
        email,
        password,
      });
      setEmployees([...employees, res.data]);
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Error adding employee:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error('Error deleting employee:', err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primaryGreen">Welcome, Admin</h2>
        <button
          onClick={handleLogout}
          className="bg-dangerRed text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Add Employee Form */}
      <form
        onSubmit={handleAddEmployee}
        className="bg-[#1c1c1c] p-4 rounded-xl flex flex-col gap-3 w-full max-w-md text-white"
      >
        <h3 className="text-lg font-semibold text-infoBlue">Add New Employee</h3>
        <input
          type="text"
          placeholder="Name"
          className="p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primaryGreen"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primaryGreen"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primaryGreen"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-primaryGreen text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Employee
        </button>
      </form>

     {/* Employee List - Horizontal Scroll with Hidden Scrollbar */}
<div className="overflow-x-auto py-4 scrollbar-hide">
  <div className="flex gap-4 w-max">
    {employees.map((emp) => (
      <div
        key={emp._id}
        className="bg-[#120f0f] text-white shadow-md rounded-xl p-4 min-w-[250px] border-l-4 border-infoBlue"
      >
        <h2 className="text-lg font-semibold">{emp.name}</h2>
        <p className="text-sm text-gray-500">{emp.email}</p>
        <div className="flex mt-3 gap-2">
          <button
            onClick={() => navigate(`/employee/tasks/${emp._id}`)}
            className="bg-primaryGreen text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Select
          </button>
          <button
            onClick={() => handleDelete(emp._id)}
            className="bg-dangerRed text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default AdminDashboard;
