import userModel from "../models/userModels.js"

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){  // if the user want to add product in cart with itemId, and with that itemId there is no entry in cart, in that case it will create a new entry.
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        // when item added to cart now we need to update the cart
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Added to Cart"});

    } catch (error) {
        console.log(error);
        response.json({success:false, message:"Error"});
    }
}

// remove item from user cart
const removeFromCart = async (req, res) => {

}

// fetch user cart data
const getCart = async (req, res) => {

}

export {addToCart, removeFromCart, getCart}