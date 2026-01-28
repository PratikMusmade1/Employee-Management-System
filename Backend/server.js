const express = require('express');
const mongoose = require('mongoose');
// require('dotenv').config();

const connectDB=require('./config/db');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173', // exact frontend origin
  credentials: true,               // allow sending cookies, auth headers
};

app.use(cors(corsOptions));

 app.use(express.json());

 //Routes
 const employeeRoutes=require('./routes/employeeRoutes');
 const taskRoutes=require('./routes/taskRoutes');
 const authRoutes=require('./routes/authRoutes');

 app.use('/api/employees',employeeRoutes);
 app.use('/api/tasks',taskRoutes);
 app.use('/api/auth',authRoutes);

 //connect to MongoDB
connectDB();

app.listen(5000,()=>{
    console.log('Server Running');
});
