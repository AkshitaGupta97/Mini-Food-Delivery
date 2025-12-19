
import { useEffect, useState } from 'react'
import './order.css'
import axios from 'axios';
import { toast } from 'react-toastify';

function Order({ url }) {

  const [orders, setOrder] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list"); // as it is get request so we need not pass request body and headers.
    if (response.data.success) {
      setOrder(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error in Fetching data");
    }
  }

  const statusHandler = async (event, orderId) => {
    //console.log(orderId)
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {
          orders.map((order, index) => {
            return (
              <div key={index} className='order-item'>
                <p><span className="span-image material-symbols-outlined">hand_meal</span></p>
                <div className='order-item-container'>
                  <p className='order-item-food'>
                    {
                      order.items.map((item, idx) => {
                        if (idx === order.items.length - 1) {
                          return item.name + "X" + item.quantity
                        }
                        else {
                          return item.name + " X " + item.quantity + ", "
                        }
                      })
                    }
                  </p>
                  <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                  <div className="order-item-address">
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + "," + order.address.state + ", " + order.address.country + ", " + order.address.pincode}</p>
                  </div>
                  <p className="order-item-phone">{order.address.phone}</p>
                  <div>
                    <p>Items: {order.items.length}</p>
                    <p>${order.amount}</p>
                    <select onChange={(event)=> statusHandler(event, order._id)} value={order.status}>
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out-for-delivery">Out-for-delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Order

