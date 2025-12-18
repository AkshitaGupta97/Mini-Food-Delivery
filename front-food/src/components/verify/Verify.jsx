import { useSearchParams } from 'react-router-dom'
import './verify.css'
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

function Verify() {

    const [searchParam, setSearchParam] = useSearchParams();
    const success = searchParam.get("success");
    const orderId = searchParam.get("orderId");
    
    const {url} = useContext(StoreContext);

    console.log(success, orderId)

  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify