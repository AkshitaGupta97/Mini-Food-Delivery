
import { useEffect, useState } from 'react'
import './list.css'
import { toast } from 'react-toastify';
import axios from 'axios';

function List({url}) {
 // const url = "http://localhost:4000"
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data)
    try {
      if(response.data.success){
        setList(response.data.data)
      }
      else {
        toast.error(response.data.message)
      }
    }
    catch(error){
      toast.error(response.data.message)
      console.error("Request error:", error)
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.delete(`${url}/api/food/remove`, {data: {id: foodId}}); // axios requires `data` for DELETE body
    // after removing the upper data the, again we need to fetch data and display it
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else {
      toast.error("Error in removing item")
    }
  }

  useEffect(() => {
    fetchList()
  },[])

  return (
    <div className='list add flex-col'>
      <p className='list-title'>All Food list</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Price</b>
            <b>Category</b>
            <b>Action</b>
        </div>
        {
          list.map((item, index) => {
            return (
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt={item.image} />
                <p className='item-name'>{item.name}</p>
                <p className='item-price'>${item.price} </p>
                <p className='item-category'>{item.category} </p>
                <p onClick={() => removeFood(item._id)} className='cross'>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List

