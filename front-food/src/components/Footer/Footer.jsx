import "./footer.css"

function Footer() {
  return (
    <div>
        <footer className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <h2>Foodie<span>Hub</span></h2>
                    <p> 🍴<span>Foodie<span className="mini-span">Hub</span></span>  is a modern food discovery and delivery platform designed to connect people with their favorite meals in just a few taps.</p>
                    <div className="footer-social-icons">
                        <img src="https://clipartcraft.com/images/facebook-logo-original-5.png" alt="facebook" />
                        <img src="https://th.bing.com/th/id/OIP.BxMRXVrYg35uW2QcUQPOcgHaHa?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" alt="instagram" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>+1-221-1800-4545</li>
                        <li>contact@FoodieHub.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p>© 2025 FoodieHub. All rights reserved.</p>
        </footer>
    </div>
  )
}

export default Footer