import { useContext, useEffect, useState } from "react"
import "./myOrder.css"
import { StoreContext } from "../../components/context/StoreContext";
import axios from "axios";

function MyOrders() {

  const { url, token } = useContext(StoreContext);

  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url + "api/order/userorders", {}, { headers: { token } });
    setData(response.data.data);
    console.log(response.data.data);
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);


  return (
    <div className="my-orders">
      <h2>📝My Orders📦 </h2>
      <div className="container">
        {
          data.map((order, index) => {
            const amount = order.amount;
            return (
              <div key={index} className="my-orders-order">
                <p><span class="span-image material-symbols-outlined">hand_meal</span></p>
                <p>
                  {order.items.map((item, idx) => {
                    if (idx === order.items.length - 1) {  // using this we can access last item of order.
                      return item.name + " X " + item.quantity
                    }
                    else {
                      return item.name + " X " + item.quantity + ", "
                    }
                  })}
                </p>
                <p>${amount} </p>
                <p>Items: {order.items.length} </p>
                <p><span className="span-dot">&#x25cf;</span> <b>{order.status}</b> </p>
                <button>Track Order</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MyOrders