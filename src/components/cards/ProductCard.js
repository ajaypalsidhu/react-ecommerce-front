import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { showAverage } from '../../functions/rating';


const ProductCard = ({ product }) => {
    const { images, title, description, slug, price } = product;
    const { Meta } = Card;

    const { user, cart } = useSelector( state => ({ ...state }));
    const dispatch = useDispatch();

    const [tooltip, setTooltip] = useState('Click To Add');

    const handleAddToCart = () => {        
        let cart = [];
        if(typeof window !== 'undefined') {
            // check if cart is already in the local storage
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                // data in local storage is saved as JSON, so we need to parse it to use as JS
            }
            // if cart not in local storage, push new product as object to cart
            cart.push({
                ...product, 
                count : 1
            });
            // using lodash, make sure that you are not saving duplicates to the cart
            let unique = _.uniqWith(cart, _.isEqual);

            // convert cart into JSON and save it in the localStorage
            localStorage.setItem('cart', JSON.stringify(unique));

            //dispatch cart data to redux store
            dispatch({
                type : 'ADD_TO_CART',
                payload : unique
            })

            // change drawer state in redux
            dispatch({
                type : 'SET_VISIBLE',
                payload : true
            })
            //set Tooltip state
            setTooltip('Already added');
        }
    }

    return (
        <>
            {
                product && product.ratings && product.ratings.length > 0 
                    ? showAverage(product)
                    : (<div className="text-center pt-1 pb-3">No ratings yet</div> )
            }
            <Card
                hoverable            
                cover={
                    <img alt="example" 
                        style={{ height: 150, objectFit: "cover", border: "1px solid #DCDCDC"}}
                        src={images && images.length ? images[0].url : laptop} 
                        className="p-1"                     
                    />
                }
                actions={[ 
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" /> <br /> View Product
                    </Link>,
                    <Tooltip  title={tooltip}>
                        <a onClick={handleAddToCart} disabled={product.quantity < 1}> 
                            <ShoppingCartOutlined className="text-danger" />  <br /> 
                            { product.quantity < 1 ? 'Out Of Stock' : 'Add To Cart'} 
                        </a>
                    </Tooltip>
                ]}
            >
                <Meta 
                    title={`${title} - $${price}`} 
                    description={`${description && description.substring(0, 30)}...`}                 
                />
            </Card>
        </>
    );
}

export default ProductCard;