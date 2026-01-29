import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from "./components/Footer/Footer";
import { useState } from "react"
import LoginPop from "./components/LoginPopup/LoginPop";
import { ToastContainer } from 'react-toastify';
import MyOrders from "./pages/MyOrders/MyOrders";
import Verify from "./components/verify/Verify";

function App() {

  <ToastContainer />

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin? <LoginPop setShowLogin={setShowLogin} /> : <></>}
      <div className="App">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App