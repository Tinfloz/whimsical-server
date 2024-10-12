import Users from "../models/users.model.js";

async function addNewUser (req, res){
    try {
        const {userName, email, password} = req.body;
        if (!userName || !email || !password){
            throw new Error ("Parameters missing!");
        }
        if (await Users.findOne({email})){
            throw new Error("User already exists, please create a new one!");
        }
        try {
            await Users.create({
                userName, email, password, userType:"Sub-admin"
            })
        } catch (error) {
            console.error(error);
            throw new Error("Could not create new user");
        }
        return res.status(201).json({
            success:true,
            user:{
                userName, email
            },
            message:"User created!"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

async function getAllUsers (req, res) {
    try {
        const users = await Users.find();
        return res.status(200).json({
            success:true,
            users, 
            message:"Users found!"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

async function getUserById (req, res) {
    try {
        const {id} = req.query;
        if(!id){
            throw new Error("query params missing!");
        };
        const user = await Users.findById(id);
        return res.status(200).json({
            success:true,
            user,
            message:"User found!"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export {
    addNewUser, getAllUsers, getUserById
}