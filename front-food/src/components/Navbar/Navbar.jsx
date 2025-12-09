import { useState, useEffect } from "react";
import "./Navbar.css"

function Navbar(){

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
        <div className="logo">Foodie<i>Hub</i></div>
        <ul className="navbar-menu">
            <li onClick={() => setMenu("home")} className={menu==="home"?"active":""}>home</li>
            <li onClick={() => setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
            <li onClick={() => setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</li>
            <li onClick={() => setMenu("contact")} className={menu==="contact"?"active":""}>contact-us</li>
        </ul>
        <div className="nav-right">
            <div className="nav-search">
                <input type="text" placeholder="Search food..." className="search-input"/>
                <span className="search-btn material-icons-outlined">search</span>
            </div>
            <div className="nav-cart">
               <span className="material-icons-outlined">shopping_cart</span>
               <div className="dot-cart"></div>
            </div>
            <div className="nav-login">
                <button className="signup-btn">Sign in</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar