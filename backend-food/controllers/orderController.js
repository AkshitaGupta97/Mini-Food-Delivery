import orderModel from "../models/OrderModels.js";
import userModel from "../models/userModels.js"
import Stripe from "stripe"
// stripe is used for payment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// placing order from frontend
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId:req.body.userId, // we will get userId from middleware
            items:req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
    } catch (error) {
        
    }
}

export {placeOrder}