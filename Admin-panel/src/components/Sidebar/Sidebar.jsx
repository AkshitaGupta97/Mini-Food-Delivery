import { NavLink } from 'react-router-dom'
import './sidebar.css'

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <p><span className="material-symbols-outlined">add</span></p>
                <div>Add Items</div>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <p><span className="material-symbols-outlined">list</span></p>
                <div>List Items</div>
            </NavLink>
            <NavLink to='/order' className="sidebar-option">
                <p><span className="material-symbols-outlined">draft_orders</span></p>
                <div>Order Items</div>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar