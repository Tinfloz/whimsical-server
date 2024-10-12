import Paintings from "../models/paintings.model.js";
import Users from "../models/users.model.js";

async function createNewPainting(req, res) {
    try {
        const {paintingName, paintingDesc, dimension, price, medium, painting} = req.body;
        if(!paintingName || !paintingDesc || !dimension || !price || !medium || !painting){
            throw new Error("Parameters for creating a new painting are missing!");
        }
        try {     
            await Paintings.create({
                paintingName, paintingDesc, dimension, price, medium, painting
            })
        } catch (error) {
            console.error(error);
            throw new Error("Could not create painting in Db")
        }
        return res.status(201).json({
            success:true,
            painting:{
                paintingName, paintingDesc, dimension, price, medium
            },
            message:"Image created!"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

async function deleteImage(req, res) {
    try {
        const {imageId} = req.query;
        if(!imageId){
            throw new Error("Query params not found!")
        } 
        let image;
        try {
            image = await Paintings.findById(imageId);
        } catch (error) {
            console.error(error);
            throw new Error("Image not found!");
        }
        try {
            await cloudinary.v2.uploader.destroy(image.publicId);
        } catch (error) {
            console.error(error);
            throw new Error("Image could not be deleted");
        }
        return res.status(200).json({
            success:true,
            message:"Image deleted"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

async function getAllPaintings(req, res) {
    try {
        const paintings = await Paintings.find();
        return res.status(200).json({
            success:true,
            message:"Paintings found!",
            paintings
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

async function updatePainting(req, res) {
    try {
        const id = req.params.paintingId;
        const updates = req.body;
        const user = Users.findByIdAndUpdate(
            id, 
            {$set:updates},
            {new:true, runValidators: true}
        )
        if (!user){
            throw new Error("User not found!")
        }
        return res.status(200).json({
            success:true,
            message:"Painting updated!",
            updates:req.body
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
    createNewPainting,
    deleteImage,
    getAllPaintings,
    updatePainting
}