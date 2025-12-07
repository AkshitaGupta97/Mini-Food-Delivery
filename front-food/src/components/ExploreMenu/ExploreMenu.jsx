import { menu_list } from "../../assets/MenuAssets"
import "./exploreMenu.css"

function ExploreMenu() {
  return (
    <div className="explore-menu-container">
      <div className="explore-menu" id="explore-menu">
        <h1>Explore our menu</h1>
        <p className="explore-menu-text">
          🥗 <i>Explore</i> food we eat directly impacts our well-being. 🍛A balanced diet rich in fruits, vegetables,
          grains, and proteins provides the energy we need to thrive. At the same time, mindful eating🍲
        </p>

        <div className="explore-menu-list">
          {
            menu_list.map((item, index) => {
              return (
                <div className="explore-menu-item" key={index}>
                  <div className="explore-menu-item-card">
                    <img src={item.menu_image} alt={item.menu_name} />
                    <h3>{item.menu_name}</h3>
                  </div>
                </div>
              )
            })
          }
        </div>
        
      </div>
    </div>
  )
}

export default ExploreMenu