import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type:String, required:true},
    price: {type: Number, required: true},
    image: {type: String, required:true},
    category:{type:String, required: true},
})

//const foodModel = mongoose.model("food", foodSchema); by this method when we run the model it will create the model again.
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);   // it means when the models is present it will not create it.

export default foodModel;
