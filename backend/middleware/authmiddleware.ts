import type { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();


interface JwtPayload{
    userId:string;
}

declare global{
    namespace Express{
        interface Request {
            user?:{id:string,role:string};
        }
    }
}

export const protect = async (
    req:Request,
    res:Response,
    next:NextFunction
) =>{
    
    try{
        const header = req.headers.authorization;
        if(!header || !header.startsWith("Bearer ")){
            return res.status(401).json({message:"Unauthorized"});
        }

        const token = header.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        if(!token || !secret){
            res.status(401).json({message:"Unauthorized"});
            return;
        }


        const decoded = jwt.verify(token,secret) as JwtPayload;
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            res.status(401).json({message:"Not authorized, user not found"});
            return; 
        }

        req.user={id:user._id.toString(),role:user.role};
        next();
    }catch{
        res.status(401).json({message:"Not authorized, invalid token"})
    }

} 

export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Access denied, admin only" });
    return;
  }
  next();
};