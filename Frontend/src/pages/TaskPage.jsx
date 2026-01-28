// pages/TaskPage.jsx
import TaskPageAdmin from '../components/dashboard/EmployeeTaskPage';

const TaskPage = () => {
  return (
    <div className="min-h-screen bg-[#030101] text-white flex flex-col items-center p-6">
      <div className="min-h-90 w-full max-w-6xl bg-gray-1000 rounded-2xl  p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-primaryGreen">
          Employee Task Management
        </h1>
        <TaskPageAdmin />
      </div>
    </div>
  );
};

export default TaskPage;
