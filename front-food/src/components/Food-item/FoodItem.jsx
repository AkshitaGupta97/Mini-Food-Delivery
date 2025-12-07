import "./foodItem.css"

const FoodItem = ({id, name, price, description, image}) => {
  return (
    <div className="food-item">
        <div className="food-item-img-container">
            <img className="food-item-image" src={image} alt={name} />
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <h2>{name}</h2>
                <p>✨✨✨✨✨</p>
            </div>
            <p className="food-item-description">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem