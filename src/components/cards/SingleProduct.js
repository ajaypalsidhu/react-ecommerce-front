import React, { useState } from 'react';
import { Card, Tabs, Tooltip }  from 'antd';import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Laptop from '../../images/laptop.png';
import StarRating from 'react-star-ratings';
import _ from 'lodash';

import ProductListItems from './ProductListItems';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import { addToWishlist } from '../../functions/user';
import { toast } from 'react-toastify';

const SingleProduct = ({product, onStarClick, star}) => {
    const { title, images, description, _id } = product;
    const { TabPane } = Tabs;

    const { user, cart } = useSelector( state => ({ ...state }));
    const dispatch = useDispatch();
    const history = useHistory();

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

    // add product to wishlist
    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token)
        .then(res => {
            toast.success(`${product.title} added to wishlist`);
            history.push('/user/wishlist');
        })
        .catch(err => console.log(err));

    }

    return (
        <>            
            <div className="col-md-7">
            {
                images && images.length 
                ?   
                    (<Carousel showArrows={true} autoPlay infiniteLoop >
                        {images && images.map(i => <img src={i.url} key={i.public_id} />)}
                    </Carousel> )
                :
                    (<Card className="card-image" cover={<img alt="example" src={Laptop} className="mb-3"/>}></Card>)
            }
                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        For more information about the product, call us on xxxx xxx xxx.
                    </TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">  
                <h1 className="bg-info p-3">{title}</h1>
                {
                    product && product.ratings && product.ratings.length > 0 
                        ? showAverage(product)
                        : (<div className="text-center pt-1 pb-3">No ratings yet</div> )
                }
                <Card
                    actions = {[
                        <>
                            <Tooltip  title={tooltip}>
                                <a onClick={handleAddToCart}> 
                                    <ShoppingCartOutlined className="text-danger" />  <br /> Add To Cart 
                                </a>
                            </Tooltip>
                        </>,
                        <a onClick={handleAddToWishlist}>
                            <HeartOutlined className="text-info" /> <br /> Add To Wishlish
                        </a>,
                        <RatingModal>
                            <StarRating 
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />    
                        </RatingModal> 
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    );
}

export default SingleProduct;