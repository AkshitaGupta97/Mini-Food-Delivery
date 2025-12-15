import userModel from "../models/userModels.js"

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne(req.body.userId);
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
/**
 * Removes an item from the user's cart
 * @async
 * @function removeFromCart
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.userId - The ID of the user whose cart item should be removed
 * @param {string} req.body.itemId - The ID of the food/item to remove from cart
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 * @throws {Error} If user not found or database operation fails
 */
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Removed from Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    
}

export {addToCart, removeFromCart, getCart}