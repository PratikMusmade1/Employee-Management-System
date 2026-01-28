import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#030101] text-white">
      <div className=" bg-transparent border-2 border-gradient-to-br from-primaryGreen via-[#0f1f14] to-dangerRed rounded-2xl shadow-lg  p-8 w-full max-w-md backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primaryGreen">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
