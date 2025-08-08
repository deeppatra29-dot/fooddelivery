
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const foodroutes = require('./routes/foodroutes');
const connectdb = require ('./config/db')
const authroutes = require('./routes/authroutes');
dotenv.config();
connectdb();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use('/api/food',foodroutes);
app.use('/api/auth',authroutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log("server is running port 3000"));
