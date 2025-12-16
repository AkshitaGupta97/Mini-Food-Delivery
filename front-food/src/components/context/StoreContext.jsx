
import axios from "axios";
import { createContext, useEffect, useState } from "react";
//import { food_list } from "../../assets/MenuAssets";  //as this food_list is from frontend, so we have made it comment, beacuse we need to fetch data from backend
// createContext is used to create a Context object in React, which allows for sharing state across components without prop drilling.
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({});

    const url = "http://localhost:4000/";
    const [token, setToken] = useState("");

    // for  data/food from backend
    const [food_list, setFoodlist] = useState([]);
    
    const addToCart = async (itemId) => {
        if(!cartItem[itemId]){ // if the itemId does not exist in cartItem, then add it with a quantity of 1
            setCartItem((prev) => ({...prev, [itemId]: 1}) );
        }
        else {
            setCartItem((prev) => ({...prev, [itemId]: prev[itemId] +1}));
        }
        if(token){
            await axios.post(url+"api/cart/add",
                {itemId}, 
                {headers:{token}}  
            );                
        }
    }

    const removeFromCart = async (itemId) => { // decrease the quantity of the item with itemId by 1, ensuring it doesn't go below 0
        setCartItem((prev) => ({...prev, [itemId]: Math.max(0, prev[itemId]-1)}) );
        if(token){
            await axios.post(url+"api/cart/remove", 
                {itemId}, 
                {headers:{token}}  
            ); 
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItem){  // we are using for-in loop, because cart-item is object and item will iterate over cartItem, and provide items one by one
            if(cartItem[item] > 0){
                let itemInfo = food_list.find((product) => product._id == item);
                // if itemInfo exists (item found in food_list), add to total; otherwise skip
                if(itemInfo){
                    totalAmount += itemInfo.price * cartItem[item];
                }
            }
        }
        return totalAmount;
    }

    // fetch fool_list from backend
    const fetchFoodList = async () => {
        const response = await axios.get(url+"api/food/list");
        setFoodlist(response.data.data);       
    }

    const loadCartData = async(token) => {
        const response = await axios.post(url+"api/cart/get", {} , {headers: {token}}); // {} -> we are passing empty object, as to hit the getCart api we need not send body.
        // and we save the cart item in a variable in setCaerItem
        setCartItem(response.data.cartData);
    }

    // by using this useEffect(), if we reload the page we won't signout from page.
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();

            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])

    const contextValue = {
       food_list,   
        cartItem, setCartItem,
        addToCart, removeFromCart,
        getTotalCartAmount,
        url, token, setToken
        
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider;

/*
    - Bearer token = a security token that proves the client (browser/app) is authorized.
    This request includes a token. Whoever presents this token is the bearer of certain rights or access.
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
 */