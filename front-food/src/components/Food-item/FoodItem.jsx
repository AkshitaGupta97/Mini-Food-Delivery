import { useContext } from "react";
import "./foodItem.css"
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({id, name, price, description, image}) => {

  const {cartItem, addToCart, removeFromCart, url} = useContext(StoreContext);

  return (
    <div className="food-item">
        <div className="food-item-img-container">
            <img className="food-item-image" src={url+"images/"+image}  alt={name} /> {/* src={image} */}
            {/* when count is 0 show a single add button; otherwise show counter with - n + */}
            {!cartItem[id] ? (
                <p className="add" onClick={() => addToCart(id)}>
                  <span className="add-symbol material-symbols-outlined">add</span>
                </p>
            ) : (
                <div className="food-item-counter">
                    <p className="counter-btn" onClick={()=> removeFromCart(id)}>
                      <span className="remove-symbol material-symbols-outlined">remove</span>
                    </p>
                    <p className="counter-value">{cartItem[id]}</p>
                    <p className="counter-btn" onClick={() => addToCart(id)}>
                      <span className="add-symbol material-symbols-outlined">add</span>
                    </p>
                </div>
            )}
        </div>

        <div className="food-item-info">
            <div className="food-item-name-rating">
                <h2>{name}</h2>
                <p>⭐⭐⭐⭐⭐</p>
            </div>
            <p className="food-item-description">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem