import jwt from "jsonwebtoken";
import Users from "../models/users.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            throw new Error("No headers present");
        }
        const token = authorizationHeader.split(" ")[1];
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        if (!id){
            throw new Error("No such claims present in Bearer token");
        }
        req.user = await Users.findById(id);
        if(!req.user){
            throw new Error("No such user found");
        }
        return next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success:false,
            message:error.errors?.[0]?.message || error
        })
    }
}

export const isAdmin = (req, res, next) => {
    if(req.user.userType !== "Admin"){
        return res.status(403).json({
            success:false,
            message:"Unauthorized access"
        })
    }
    return next();
}