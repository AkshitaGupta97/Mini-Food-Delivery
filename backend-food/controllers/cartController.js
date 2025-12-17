import userModel from "../models/userModels.js"

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId); // userId comes from the JSON body sent by the frontend
        let cartData = await userData.cartData || {};
        if(!cartData[req.body.itemId]){  // if the user want to add product in cart with itemId, and with that itemId there is no entry in cart, in that case it will create a new entry.
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }

        // when item added to cart now we need to update the cart
        await userModel.findByIdAndUpdate(req.body.userId,  {cartData}); // {$set: {cartData}}-> is is used to avoid accidental overwrite, {new:true}-> is used if byDefault mongoDb returns oldDocument, by this it returns updated doc.
        res.json({success:true, message: "Added to Cart"});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}
/*
- Frontend provides userId → tells backend which user is acting.
- Backend uses userModel with that userId → fetches the actual user document from MongoDB to read/update their cart.
- Without querying userModel, you’d only have the raw userId string, not the user’s data.

*/

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
       // if(!userData) return res.json({success:false, message:"User not found"});
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,  {cartData});
        res.json({success: true, message: "Removed from Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}
/*
- First argument: req.body.userId → the MongoDB _id of the user.
- Second argument: { cartData } → the new cart data object you want to save.
*/

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

export {addToCart, removeFromCart, getCart}