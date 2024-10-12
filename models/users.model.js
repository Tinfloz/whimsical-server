import mongoose, { Schema } from "mongoose"; 
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
    },
    userName:{
        type:String, 
        required:true
    },
    userType:{
        type:String,
        required:true
    }
}, {timestamps:true})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};

const Users = mongoose.model("Users", userSchema);

export default Users;