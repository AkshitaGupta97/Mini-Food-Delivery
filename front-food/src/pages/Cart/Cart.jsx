import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../components/context/StoreContext";

function Cart() {

  const {cartItem, food_list, removeFromCart} = useContext(StoreContext);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className=" head-part cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if(cartItem[item._id] > 0){
              return(
                <div className="last-part">
                  <div key={index} className="cart-items-title cart-items-item">
                    <img src={item.image} alt={item.name} />
                    <p className="item-name">{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItem[item._id]}</p>
                    <p>${item.price * cartItem[item._id]}</p>
                    <p onClick={()=>removeFromCart(item._id)} className="cross">X</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default Cart