import mongoose, {Schema} from "mongoose";

const paintingSchema = new Schema({
    paintingName:{
        type:String,
        required:true
    },
    paintingDesc:{
        type:String,
        required:true
    },
    painting:{
        type:String, 
        required:true
    },
    dimension:{
        type:String,
        required:true
    },
    medium:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true   
    }
}, {timestamps:true})

const Paintings = mongoose.model("Paintings", paintingSchema);

export default Paintings;