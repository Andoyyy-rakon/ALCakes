import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/db.js";





dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();


app.get("/",(_req,res)=>{
    res.status(200).json("Hiiiiiiiii");
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running at Port ${process.env.PORT}`)
})