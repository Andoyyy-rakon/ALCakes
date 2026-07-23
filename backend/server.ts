import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(_req,res)=>{
    res.status(200).json("Hiiiiiiiii");
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running at Port ${process.env.PORT}`)
})