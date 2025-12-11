
import foodModel from "../models/foodModels.js";
import fs from "fs"
// fs is used for some operations as readFile, deleteFile, createfile


// add food item

const addFood = async(req, res) => {   //- Declares an async function (because database operations are asynchronous).
    //the request object (contains form data, uploaded files, etc.)
    // the response object (used to send back JSON responses).

    //- Assumes the request contains an uploaded file (via something like Multer)
    // - Extracts the filename of the uploaded image and stores it in image_filename

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    // save to database
    try {
        await food.save(); //inserts the new food document into MongoDB.
        res.json({success:true, message: "Food Added"})
    }
    catch(error){
        console.log("error in food controller", error);
        res.json({success:false , message:"Error"})
    }
}

// we can create/add all new food
const listFood = async(req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods})
    }   
    catch(error){
        console.log(error);
        res.json({success:false, message:"error"})
    }
}

// we can remove food item
const removeFood = async(req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({sucess:true, message:"food item is removed"})

    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"error in deleting food item"})
    }
}



export {addFood, listFood, removeFood}


