import { useContext } from "react"
import "../Food-item/foodItem.css"
import "./foodDisplay.css"
import { StoreContext } from "../context/StoreContext"
import FoodItem from "../Food-item/FoodItem";

function FoodDisplay({category}) {

  const {food_list} = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h1>Top dishes of <i>Foodie!</i> </h1>
      <div className="food-display-list">
        {
          food_list.map((item, idx) => {
            return <FoodItem key={idx} id={item.id} name={item.name} description={item.description} price={item.price} image={item.image}  />
          })
        }
      </div>
    </div>
  )
}

export default FoodDisplay