const express=require('express');
const router=express.Router();
const {
    AssignTask,
    getTasksByEmployee,
    UpdateTaskStatus,
    deleteTask
}=require('../controllers/taskController');
router.post('/assign',AssignTask);
router.get('/employee/:id',getTasksByEmployee);
router.put('/status/:taskId',UpdateTaskStatus);
router.delete('/:taskId',deleteTask);

module.exports=router;