import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const getPriorityColor=(priority)=>{
    switch(priority){
      case 'high':
        return 'text-dangerRed';
      case 'medium':
        return 'text-warningYellow';
      case 'low':
        return 'text-primaryGreen';
    }
  }
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/employee/${user.id}`);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err.message);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/status/${taskId}`, {
        status: newStatus,
      });
      fetchTasks(); // Refresh list
    } catch (err) {
      console.error('Status update error:', err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="overflow-x-auto py-4 space-y-4 text-white">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-dangerRed px-4 py-2 rounded-md text-white hover:bg-red-700 transition-all duration-200"
        >
          Logout
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-400">No tasks assigned yet.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="bg-[#0d0d0d] p-4 rounded-xl border-l-4 border-warningYellow"
          >
            <div className="flex justify-between items-start gap-4 flex-wrap md:flex-nowrap">
              {/* Left Side - Task Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-primaryGreen">{task.title}</h2>
                <p className="text-sm text-gray-400">
                  Due: {new Date(task.dueDate).toDateString()}
                </p>
                <p className="text-sm">
                  Priority:{' '}
                  <span className={`font-semibold capitalize ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                </p>
                
                  <p className="text-sm pt-3 text-gray-300 break-words">
                    <span className="text-white">Details:</span> {task.description}
                  </p>
              
              </div>

              {/* Right Side - Status Dropdown */}
              <div className="mt-2 md:mt-0">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className="rounded-md px-2 py-1 bg-[#1a1a1a] text-white border border-gray-600 focus:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeDashboard;
