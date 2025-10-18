const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const app=express();
const connectDB=require('./db/db');
const userRoutes=require('./routes/userRoutes');


connectDB();

// const bodyParser=require('body-parser');
const cors=require('cors');

// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);


app.get('/',(req,res)=>{
    res.send('Hello World!');
});

module.exports=app;


