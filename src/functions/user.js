import axios from 'axios';

export const userCart = async ( cart, authtoken ) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/cart`, 
    {cart},
    {
        headers : {
            authtoken
        }
    });
    // if we do not pass cart as an object, we will get it in the backend as req.body
    // but if we send it as {cart}, we can access it as req.body.cart
}

export const getUserCart = async ( authtoken ) => {
    return await axios.get(`${process.env.REACT_APP_API}/user/cart`,
    {
        headers : {
            authtoken
        }
    });    
}

export const emptyUserCart = async ( authtoken ) => {
    return await axios.delete(`${process.env.REACT_APP_API}/user/cart`,
    {
        headers : {
            authtoken
        }
    });
}

export const saveUserAddress = async ( authtoken, address ) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/address`, 
    { address },
    {
        headers : {
            authtoken
        }
    });
    // if we do not pass cart as an object, we will get it in the backend as req.body
    // but if we send it as {cart}, we can access it as req.body.cart
}

export const applyCoupon = async ( authtoken, coupon ) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/cart/coupon`, 
    { coupon },
    {
        headers : {
            authtoken
        }
    });
}

export const createOrder = async ( stripeResponse, authtoken ) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/order`, 
    { stripeResponse },
    {
        headers : {
            authtoken
        }
    }); 
}

export const getUserOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });
 
export const getWishlist = async ( authtoken ) => {
    return await axios.get(`${process.env.REACT_APP_API}/user/wishlist`,
    {
        headers : {
            authtoken
        }
    });
}

export const removeWishlist = async ( productId, authtoken ) => {
    return await axios.put(`${process.env.REACT_APP_API}/user/wishlist/${productId}`, 
    {},
    {
        headers : {
            authtoken
        }
    });
}

export const addToWishlist = async ( productId, authtoken ) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/wishlist`, 
    { productId },
    {
        headers : {
            authtoken
        }
    });
}

export const createCashOrderForUser = async ( authtoken, COD, couponTrueOrFalse ) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/cash-order`, 
    { COD, couponApplied : couponTrueOrFalse },
    {
        headers : {
            authtoken
        }
    });
}