import { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/context/StoreContext";
import "./../Cart/Cart.css"

function PlaceOrder() {

  const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <form className="place-order">
      
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-field">
          <input type="text" placeholder="First name" required />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder="Email address" required />
        <input type="text" placeholder="Your Street" required />
        <div className="multi-field">
          <input type="text" placeholder="Your City" required />
          <input type="text" placeholder="Your State" required />
        </div>
        <div className="multi-field">
          <input type="text" placeholder="Your Pin-code" required />
          <input type="text" placeholder="Your Contact" required />
        </div>
        <input type="text" placeholder="Your Landmark " required />

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
          <button >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder