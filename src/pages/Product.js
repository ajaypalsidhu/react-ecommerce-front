import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getProduct, productStar, getRelated } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import ProductCard from '../components/cards/ProductCard';

const Product = ({match}) => {
    const [product, setProduct] = useState('');
    const { slug } = match.params;
    const [star, setStar] = useState(0);
    const { user } = useSelector((state) => ({...state}));
    const [related, setRelated] = useState([]);

    useEffect (() => {
        loadSingleProduct();
    }, [slug]);

    useEffect(() => {
        if(product.ratings && user){
            let exixtingRatingObject = product.ratings.find(
                ele => ele.postedBy.toString() === user._id.toString()
            );
            exixtingRatingObject && setStar(exixtingRatingObject.star);
        }
    })

    const loadSingleProduct = () => {
        getProduct(slug)
        .then(res => {
            setProduct(res.data);
            getRelated(res.data._id)
                .then(res => setRelated(res.data))
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.log(err);
        })
    }

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        productStar(name, newRating, user.token)
        .then(res => {
            console.log(res.data);
            loadSingleProduct(); // to update the rating in real time
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct onStarClick={onStarClick} star={star} product={product} />
            </div>
            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    <hr />                    
                </div>
            </div>
            <div className="row pb-5">
            {
                related.length 
                ? 
                    related.map((r) => (
                        <div key={r._id} className="col-md-4">
                            <ProductCard product={r} />
                        </div>
                    ))
                : 
                    (
                        <div className="text-center">
                            No related products found
                        </div>
                    )
            }
            </div>
        </div>
    );
}

export default Product;