import { useContext } from "react"
import "../Food-item/foodItem.css"
import { StoreContext } from "../context/StoreContext"
import FoodItem from "../Food-item/FoodItem";

function FoodDisplay({category}) {

  const {food_list} = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h1>Top dishes of <i>Foodie!</i> </h1>
      <div className="food-display-list">
        {
          // if category prop is provided and not 'All', filter by category
         /* (category && category !== 'All' ? food_list?.length > 0 && food_list.filter(f => f.category === category) : food_list)
            .map((item) => {
              return <FoodItem key={item._id} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}  />
            })*/

          food_list.length > 0 && food_list.filter((item) => category === 'All' || item.category === category)
          .map((item) => (
            <FoodItem key={item._id} id={item._id} name={item.name} description={item.description}
              price={item.price} image={item.image}
             />
          ))
        }
      </div>
    </div>
  )
}

export default FoodDisplay