// components/auth/LoginForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const user = res.data.user;
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') navigate('/admin');
      else navigate('/employee');
    } catch (err) {
      setErr(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
     <input
  type="email"
  placeholder="Email"
  className="w-full px-2 py-2 bg-transparent border-b border-primaryGreen text-gray-200 placeholder-gray-500 focus:outline-none focus:border-infoBlue transition"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

<input
  type="password"
  placeholder="Password"
  className="w-full px-2 py-2 bg-transparent border-b border-primaryGreen text-gray-200 placeholder-gray-500 focus:outline-none focus:border-infoBlue transition"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>

      {err && <p className="text-dangerRed text-sm">{err}</p>}
      <button
        type="submit"
        className="bg-primaryGreen text-black w-full py-2 rounded-lg hover:bg-infoBlue hover:text-white transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
