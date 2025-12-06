import { useState } from "react";
import "./Navbar.css"

function Navbar(){

    const [menu, setMenu] = useState("home");


  return (
    <div className="navbar">
        <div className="logo">Foodie</div>
        <ul className="navbar-menu">
            <li className={menu="home"?"active":""}>Home</li>
            <li className={menu="menu"?"menu":""}>Menu</li>
            <li className={menu="mobile-app"?"mobile-app":""}>Mobile-app</li>
            <li className={menu="contact"?"contact":""}>Contact</li>
        </ul>
        <div className="nav-right">
            <div className="nav-search">
                <input type="text" placeholder="Search food..." className="search-input"/>
                <span className="search-btn material-icons-outlined">search</span>
            </div>
            <div className="nav-cart">
               <span className="material-icons-outlined">shopping_cart</span>
            </div>
            <div className="nav-login">
                <button className="signup-btn">Sign in</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar