import Users from "../models/users.model.js";
import { getJwtToken } from "../utils/get.token.js";

async function loginUsers (req, res) {
    try {
        const {user, password} = req.body;
        const foundUser = await Users.findOne({$or:[{email:user}, {userName:user}]});
        if(!foundUser){
            throw new Error("User not found!")
        }
        if (!await foundUser.matchPassword(password)){
            throw new Error("Passwords don't match!")
        }
        return res.status(200).json({
            success:true,
            token:getJwtToken(foundUser._id),
            user:{
                email:foundUser.email,
                userName:foundUser.userName,
                userType:foundUser.userType
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default loginUsers