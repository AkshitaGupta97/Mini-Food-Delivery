import { useNavigate, useSearchParams } from 'react-router-dom'
import './verify.css'
import { useContext, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

function Verify() {

    const [searchParam, setSearchParam] = useSearchParams();
    const success = searchParam.get("success");
    const orderId = searchParam.get("orderId");
    const navigate = useNavigate()
    const {url} = useContext(StoreContext);

    //console.log(success, orderId);

    const verifyPayment = async() => {
      const response = await axios.post(url+"api/order/verify", {success, orderId});
      if(response.data.success){
        navigate("/myorders")
      }
      else{
        navigate("/")
      }
    }

    useEffect(() => {
      verifyPayment()
    },[])

  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify