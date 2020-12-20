import React, { useState, useEffect } from 'react';

import { getCategory } from '../../functions/category';
import ProductCard from  '../../components/cards/ProductCard';

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getCategory(slug)
            .then(res => {
                setCategory(res.data.category);
                console.log(res.data.category);
                setProducts(res.data.products);
                setLoading(false);
            })
            .catch(err => console.log(err));            
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    { loading 
                        ?   (
                                <h4 className="jumbotron text-center display-4 p-3 mt-5 mb-5">
                                    Loading...
                                </h4>
                            )
                        :   (
                                <h4 className="jumbotron text-center display-4 p-3 mt-5 mb-5">
                                    {products.length} Products in 
                                    <span className="font-weight-bold"> {category.name} </span>
                                    category
                                </h4>
                            )
                    } 
                </div>
            </div>
            <div className="row">
                { products.map(p => <div className="col-md-4" key={p._id}>
                    <ProductCard product={p} />
                </div>)}
            </div>
        </div>
    );
}

export default CategoryHome;