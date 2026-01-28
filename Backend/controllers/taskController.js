const Task=require('../models/Task');
const { getAllEmployees } = require('./employeeController');

//Assign a task to an employee
const AssignTask=async(req,res)=>{
    try{
        const{title,dueDate,priority,description,employeeId}=req.body;
        const newTask=new Task({
            title,
            dueDate,
            priority,
            description,
            employeeId
        });
        await newTask.save();
        res.status(201).json(newTask);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};

const getTasksByEmployee= async(req,res)=>{
    try{
        const{id}=req.params;
        const tasks=await Task.find({employeeId:id});
        res.status(200).json(tasks);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};

//update task status
const UpdateTaskStatus= async (req,res)=>{
    try{
        const {taskId}=req.params;
        const {status}=req.body;

        const updatedTask=await Task.findByIdAndUpdate(
            taskId,
            {status},
            {new:true}
        );
        res.status(200).json(updatedTask);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};

//Delete a task
const deleteTask=async (req,res)=>{
    try{
        const{taskId}=req.params;
        await Task.findByIdAndDelete(taskId);
        res.status(200).json({message:'Task deleted'});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};

module.exports={
    AssignTask,
    getTasksByEmployee,
    UpdateTaskStatus,
    deleteTask
};