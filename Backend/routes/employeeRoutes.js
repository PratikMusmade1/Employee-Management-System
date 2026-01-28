const express=require('express');
const router=express.Router();
const{
    createEmployee,
    getAllEmployees,
    deleteEmployee
} =require('../controllers/employeeController');

router.post('/add',createEmployee);
router.get('/',getAllEmployees);
router.delete('/:id',deleteEmployee);

module.exports=router;