import { useState, useEffect } from "react";
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import {toast} from 'react-toastify'

function Navbar({setShowLogin}) {

    const [menu, setMenu] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate()

    const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

    const Logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.success("You have loggedout");
    }

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50); // window.scrollY > 50 : means the page is scrolled more than 50 pixels
        }
        window.addEventListener('scroll', onScroll, { passive: true }); // passive: true improves scrolling performance, OnScroll will not call preventDefault()
        // run once to set initial state
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    return (
        <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <Link to="/"><div className="logo">Foodie<i>Hub</i></div></Link>
            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
               {/*  <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile</a> */}
                <a href="#footer" onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>contact-us</a>
            </ul>
            <div className="nav-right">
                <div className="nav-search">
                    <input type="text" placeholder="Search food..." className="search-input" />
                    <span className="search-btn material-icons-outlined">search</span>
                </div>
                <div className="nav-cart">
                    <Link to="/cart"><span className="material-icons-outlined">shopping_cart</span></Link>
                    <div className={getTotalCartAmount() === 0? "":"dot-cart"}></div>
                </div>
                {
                    !token ? 
                    <div className="nav-login">
                        <button onClick={() => setShowLogin(true)}> Sign in</button>
                    </div>
                    : <div className="navbar-profile">
                        <p><span className=" icons material-symbols-outlined">artist</span></p>
                        <ul className="nav-profile-dropdown">
                            <li onClick={()=> navigate("/myorders")}><p><span className="icons material-symbols-outlined">shopping_bag_speed</span></p><span className="list-span">Orders</span></li>
                            <hr />
                            <li onClick={Logout}><p><span className="icons material-symbols-outlined">account_circle_off</span></p><span className="list-span">Logout</span></li>
                        </ul>
                    </div>
                }
                
            </div>

        </div>
    )
}

export default Navbar