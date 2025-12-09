
import { createContext, useEffect, useState } from "react";
import { food_list } from "../../assets/MenuAssets";
// createContext is used to create a Context object in React, which allows for sharing state across components without prop drilling.
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({});
    
    const addToCart = (itemId) => {
        if(!cartItem[itemId]){ // if the itemId does not exist in cartItem, then add it with a quantity of 1
            setCartItem((prev) => ({...prev, [itemId]: 1}) );
        }
        else {
            setCartItem((prev) => ({...prev, [itemId]: prev[itemId] +1}));
        }
    }

    const removeFromCart = (itemId) => { // decrease the quantity of the item with itemId by 1, ensuring it doesn't go below 0
        setCartItem((prev) => ({...prev, [itemId]: Math.max(0, prev[itemId]-1)}) );
    }

    useEffect(() => {
        console.log("cart item updated:", cartItem);
    }, [cartItem])

    const contextValue = {
        food_list,
        cartItem, setCartItem,
        addToCart, removeFromCart,
        
    }


    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider;

