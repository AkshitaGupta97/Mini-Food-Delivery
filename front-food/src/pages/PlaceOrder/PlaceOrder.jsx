import { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/context/StoreContext";
import "./../Cart/Cart.css"
import axios from "axios";

function PlaceOrder() {

  const {getTotalCartAmount, url, token, food_list, cartItem} = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    contact: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = []; // here we will add cart data
    food_list.map((item)=> {
      if(cartItem[item._id] > 0) {  // - Collect items from a shopping cart (cartItem) that have a quantity greater than 0.
        let itemInfo = {... item};  // - Copies the item into itemInfo. {...item} makes deep copy
        itemInfo["quantity"] = cartItem[item._id]; // - Adds a new property quantity to itemInfo, setting it to the number of that item in the cart.
        orderItems.push(itemInfo); // - Pushes this updated itemInfo into the orderItems array.
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"api/order/place", orderData, {headers:{token}});
    if(response.data.success){
      const {session_url} = response.data;  // fetching response.data from backend. as success_url
      window.location.replace(session_url);  // keep it for visa 4242 4242 4242 4242, 09/21 -> as manufacturing, and cvc as ->123 
    }
    else {
      alert("Error")
    }
  }

  return (
    <form onSubmit={placeOrder} className="place-order">
      
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-field">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" required />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" required />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Your Street" required />
        <div className="multi-field">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="Your City" required />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="Your State" required />
        </div>
        <div className="multi-field">
          <input name='pincode' onChange={onChangeHandler} value={data.pincode} type="text" placeholder="Your Pin-code" required />
          <input name='contact' onChange={onChangeHandler} value={data.contact}  type="text" placeholder="Your Contact" required />
        </div>
        <input  name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Your Landmark " required />

      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${Math.floor(getTotalCartAmount())}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()=== 0? 0 : Math.floor(getTotalCartAmount() + 2)}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
      
    </form>
  )
}

export default PlaceOrder