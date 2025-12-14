
import { useState } from 'react';
import './add.css'
import axios from "axios"
import { toast } from 'react-toastify';

function Add({url}) {
    //const url = "http://localhost:4000";
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name:"",
        description:"",
        price:"",
        category: "Salad"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}) )
    }

    // making api call
    // the primary use FormData is native supports of file input as in (<input type="file" />), which is used to compile data in key value pair.
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        // Validate that image is selected
        if (!image) {
            alert("Please select an image");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", data.price)
        formData.append("category", data.category)
        formData.append("image", image)

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if(response.data.success) {
                setData({
                    name:"",
                    description:"",
                    price:"",
                    category: "Salad"
                })
                setImage(false);
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
                console.error("Server response:", response.data)
            }
        } catch(error) {
            toast.error(response.data.message)
            console.error("Request error:", error)
        }
    }

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-image-upload ">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <p> {image? <img src={URL.createObjectURL(image)} alt="preview" /> : <><span className="upload material-symbols-outlined">upload</span> <span className='image-p'>images</span></>}   </p>
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className="add-product-name">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className='add-product-description flex-col'>
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='write content here' ></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure veg">Pure Veg</option>
                         <option value="Non-veg">Non-Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
                </div>
            </div>
            <button type='submit' className='add-button'>ADD</button>
        </form>
    </div>
  )
}

export default Add


