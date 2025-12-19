
import { useEffect, useState } from 'react'
import './order.css'
import axios from 'axios';
import { toast } from 'react-toastify';

function Order({url}) {

  const [orders, setOrder] = useState();

  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list"); // as it is get request so we need not pass request body and headers.
    if(response.data.success){
      setOrder(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error in Fetching data");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  },[])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {
          orders.map((order, index) => {
            <div key={index} className='order-item'>
              <p></p>
              <div>
                <p className='order-item-food'>
                  {
                    order.items.map((item, idx) => {
                      if(idx === order.item.length-1){
                        return item.name+"X"+item.quantity
                      }
                      else {
                        return item.name+" X "+item.quantity+", "
                      }
                    })
                  }
                </p>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Order

