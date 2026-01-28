const User=require('../models/User');

//create a new employee
const createEmployee= async(req ,res)=>{
    try{
        const{name,email,password}=req.body;
        const newEmployee=new User({
            name,email,password,
            role:'employee'
        });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
};

//get all employee
const getAllEmployees=async (req,res)=>{
    try{
        const employees =await User.find({role:'employee'});
        res.status(200).json(employees);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};

const deleteEmployee =async (req,res)=>{
    try{
        const {id} =req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({message:'Employee deleted'});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
module.exports={
    createEmployee,
    getAllEmployees,
    deleteEmployee
};