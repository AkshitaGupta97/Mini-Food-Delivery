import orderModel from "../models/OrderModels.js";
import userModel from "../models/userModels.js"
import Stripe from "stripe"
// stripe is used for payment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// placing order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "https://mini-food-delivery-frontend.onrender.com";  //This is the frontend app’s base URL.Used later for redirecting after payment success or failure.

    try {
        const newOrder = new orderModel({  // - A new order document is created using orderModel
            userId:req.body.userId, // we will get userId from middleware
            items:req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save(); // save in db
        // now we need to clear the cart after placing order
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

        // creating logic for stripe
        const line_items = req.body.items.map((item) => ({  // - Converts each item in the order into a Stripe-compatible format.
            price_data: {
                currency: "inr",
                product_data:{
                    name:item.name
                },
                unit_amount: item.price*100*80  //  looks like you’re multiplying by 100 (to convert to paise) and then by 80 (maybe a currency conversion factor).
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery charges"
                },
                unit_amount: 2*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true, session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const verifyOrder = async(req, res) => {
    const {orderId, success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true, message:"Paid"});
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
}
// user order for frontend
const userOrder = async(req, res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId}); // userId we will get from middleware
        res.json({success:true, data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// listing orders for Admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// updating Admin-panel status
const updateStatus = async(req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success:true, message:"Status Updated"})
    } catch (error) {
        console.log("error in backend in updateStatus")
        res.json({success:false, message:"Error"});
    }
}

export {placeOrder, verifyOrder, userOrder, listOrders, updateStatus }

/*
The placeOrder function is an Express.js route handler that:
- Creates a new order in the database.
- Clears the user’s cart after placing the order.
- Sets up a Stripe Checkout session for payment.
- Returns the Stripe session URL to the frontend so the user can complete payment.

    1. line_items
    - Purpose: Represents the products or services being purchased.
    - Stripe Checkout needs to know what the customer is paying for.
    - Each line_item includes:
    - price_data: the pricing details (currency, amount, product name).
    - quantity: how many units of that product.
    - Without line_items, Stripe wouldn’t know what to charge or display on the checkout page.

    2. price_data
    - Purpose: Defines the pricing structure for each item.
    - Contains:
    - currency: e.g., "inr" for Indian Rupees.
    - product_data: metadata like product name.
    - unit_amount: the price in the smallest currency unit (paise for INR, cents for USD).
    - Stripe requires this because it needs exact, machine-readable pricing info — not just a human-readable number.
    - Example: If you say “₹500,” Stripe needs it as 50000 (because 1 INR = 100 paise).

    3. session
    - Purpose: The checkout session object is the glue between your backend, Stripe, and the frontend.
    - When you call:
    const session = await stripe.checkout.sessions.create({...})
    - Stripe generates:
    - A hosted checkout page URL (session.url).
    - A record of the transaction attempt.
    - The session also defines:
    - line_items: what’s being purchased.
    - mode: payment type (one-time, subscription).
    - success_url and cancel_url: where to redirect the user after payment.
    - Without the session, you can’t redirect the customer to Stripe’s secure payment page.

    - line_items → tells Stripe what the customer is buying.
    - price_data → tells Stripe how much to charge for each item.
    - session → creates the actual checkout flow and connects your backend with Stripe’s hosted payment page.
    Think of it like this:
    - line_items = shopping cart contents 🛒
    - price_data = price tags 💵
    - session = the cashier checkout counter 🏦

    Would you like me to also show you a minimal working example of a Stripe Checkout flow (with just one product) so you can see how these pieces fit together in the simplest form?

 */
