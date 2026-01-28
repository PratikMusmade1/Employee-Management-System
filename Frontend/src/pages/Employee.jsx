import EmployeeDashboard from '../components/dashboard/EmployeeDashboard';

const Employee = () => {
  return (
    <div className="min-h-screen px-4 py-6 bg-[#030101] text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-infoBlue">
          Your Tasks
        </h1>
        <EmployeeDashboard />
      </div>
    </div>
  );
};

export default Employee;
