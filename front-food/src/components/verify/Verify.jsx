import { useSearchParams } from 'react-router-dom'
import './verify.css'

function Verify() {

    const [searchParam, setSearchParam] = useSearchParams();
    const success = searchParam.get("success");
    const orderId = searchParam.get("orderId");
    
    console.log(success, orderId)

  return (
    <div>

    </div>
  )
}

export default Verify