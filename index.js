import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import dotenv from "dotenv"
import cors from "cors"

import user from "./router/userRouter.js"
import assignment from "./router/assignmentRouter.js"
import studentAssignment from "./router/studentAssignmentRouter.js"

dotenv.config()
const app= express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.PORT || 2023

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/diistask')
.then(() => console.log('Connected to MongoDB...✨✨'))
.catch(err => console.error('Could not connect to MongoDB... '+err.message));

app.get("/",(req,res)=>{
    res.send("Welcome to diis task")
}) 

app.use("/api/user",user)
app.use("/api/assign",assignment)
app.use("/api/stdassign",studentAssignment)

app.listen(port,()=>{
    console.log("Server connected to "+ port +"🧨🧨🎇🎇"); 
})