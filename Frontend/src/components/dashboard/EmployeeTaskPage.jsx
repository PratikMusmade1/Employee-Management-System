import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
const EmployeeTaskPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    dueDate: '',
    description:'',
    priority: 'medium',
  });
  const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'text-primaryGreen'; // green
    case 'failed':
      return 'text-dangerRed'; // red
    case 'pending':
      return 'text-warningYellow'; // yellow
    default:
      return 'text-white';
  }
};

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/employee/${id}`);
      setTasks(res.data);
    } catch (err) {
      console.error('Error loading tasks', err.message);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task', err.message);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/tasks/assign`, {
        ...form,
        employeeId: id,
      });
      setForm({ title: '', dueDate: '', description:'', priority: 'medium' });
      fetchTasks();
    } catch (err) {
      console.error('Error assigning task', err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="space-y-8">
      {/* Assign Task Form */}
      <form
        onSubmit={handleAssign}
        className="bg-gray-950 p-6 rounded-2xl  space-y-4"
      >
        <h2 className="text-2xl font-bold text-primaryGreen">Assign New Task</h2>
        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
className="w-full px-4 py-2 rounded-md bg-[#1c1c1c] text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryGreen"          required
        />
   <input
  type="date"
  value={form.dueDate}
  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
  className="w-full px-4 py-2 rounded-md bg-[#1c1c1c] text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryGreen"
required
/>
<textarea value={form.description}className="w-full px-4 py-2 rounded-md bg-[#1c1c1c] text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryGreen"          required
onChange={(e)=>setForm({...form,description:e.target.value})}></textarea>
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
className="w-full px-4 py-2 rounded-md bg-[#1c1c1c] text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryGreen"        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          className="bg-primaryGreen   text-white px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          Assign Task
        </button>
      </form>

      {/* Current Tasks List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primaryGreen">Current Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-400 italic">No tasks assigned yet.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-gray-950 p-4 rounded-xl  border-l-4 border-infoBlue flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                <p className="text-sm text-gray-400">Due: {new Date(task.dueDate).toDateString()}</p>
                <p className="text-sm text-gray-300">
                  Priority: <span className="capitalize">{task.priority}</span>
                </p>
                <p className="text-sm text-gray-300">
                  Status: <span className={`capitalize ${getStatusColor(task.status)}`}>{task.status}</span>
                </p>
              </div>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-dangerRed hover:bg-red-700 text-white px-3 py-1 rounded shadow-sm transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeTaskPage;
