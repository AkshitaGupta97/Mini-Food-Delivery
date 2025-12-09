import { useState, useEffect } from "react";
import "./Navbar.css"
import { Link } from 'react-router-dom';

function Navbar({setShowLogin}) {

    const [menu, setMenu] = useState("home");
    const [scrolled, setScrolled] = useState(false);

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
                <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href="#footer" onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>contact-us</a>
            </ul>
            <div className="nav-right">
                <div className="nav-search">
                    <input type="text" placeholder="Search food..." className="search-input" />
                    <span className="search-btn material-icons-outlined">search</span>
                </div>
                <div className="nav-cart">
                    <Link to="/cart"><span className="material-icons-outlined">shopping_cart</span></Link>
                    <div className="dot-cart"></div>
                </div>
                <div className="nav-login">
                    <button onClick={() => setShowLogin(true)}> Sign in</button>
                </div>
            </div>

        </div>
    )
}

export default Navbar