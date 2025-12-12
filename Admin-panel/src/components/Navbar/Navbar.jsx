import "./Navbar.css"
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
        <Link to="/"><div className="logo">Foodie<i>Hub</i></div></Link>
        <p className="profile"><span class="material-symbols-outlined">artist</span></p>
    </div>
  )
}

export default Navbar


