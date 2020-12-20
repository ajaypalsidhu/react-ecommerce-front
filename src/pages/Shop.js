import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';

import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';
import ProductCard from '../components/cards/ProductCard';
import Star from '../components/forms/Star';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);    
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState('');
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState('');
    const [brands, setBrands] = useState(['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS']);
    const [colors, setColors] = useState(['Black', 'Brown', 'Silver', 'White', 'Blue']);
    const [shipping, setShipping] = useState('');
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');

    const { search } = useSelector(state => ({ ...state }));
    const { text } = search;    
    const dispatch = useDispatch();
    const { SubMenu, ItemGroup } = Menu;

    // show products by default
    useEffect(() => {
        loadAllProducts();
        getCategories().then(res => setCategories(res.data));
        getSubs().then(res => setSubs(res.data));
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(12)
            .then(p => {
                setProducts(p.data);
                setLoading(false);
            });
    }

    const fetchProducts = (arg  ) => {
        fetchProductsByFilter(arg)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            });
    }
    

    // serach by text
    useEffect(() => {
        setLoading(true);
        const delayed = setTimeout(() => {
            fetchProducts({ query : text }); // we are passing it as query because in the 
            // controllers products we are expecting to receive a param called query in req.body
            if(!text) {
                loadAllProducts();
            }
        }, 500);        
        return () => clearTimeout(delayed);
    }, [text]);       

    // serach by price
    useEffect(() => {
        fetchProducts({ price : price });
    }, [ok]);

    const handleSlider = (value) => {
        dispatch({
            type : 'SEARCH_QUERY',
            payload : { text : '' }
        });
        setCategoryIds([]);
        setSub(''); 
        setStar('');
        setBrand('');
        setColor('');
        setShipping('');
        setPrice(value);
        setTimeout(() => {
            setOk(!ok);
        }, 500);        
    }

    // search by category
    const showCaregories = () => categories.map(c => (
        <div key={c._id}>
            <Checkbox className="pb-2 pl-4 pr-4" value={c._id}
                name="category" onChange={handleCheck} checked={categoryIds.includes(c._id)}
            >
                {c.name}
            </Checkbox>
            <br />
        </div>
    ));

    const handleCheck = (e) => {  
        dispatch({
            type : 'SEARCH_QUERY',
            payload : { text : '' }
        });  
        setPrice([0, 0]);
        setSub(''); 
        setStar('');
        setBrand('');
        setColor('');
        setShipping('');
        const inTheState = [...categoryIds];
        const justChecked = e.target.value;
        const foundInTheState = inTheState.indexOf(justChecked);

        if (foundInTheState === -1){
            inTheState.push(justChecked);
        }
        else {
            inTheState.splice(foundInTheState, 1);
        }
        setCategoryIds(inTheState);
        fetchProducts({ category : inTheState });
    }


    // search by stars
    const showStars =() => {
        return (
            <div className="pr-4 pl-4 pb-2">
                <Star starClick={handleStarClick} numberOfStars={5} />
                <Star starClick={handleStarClick} numberOfStars={4} />
                <Star starClick={handleStarClick} numberOfStars={3} />
                <Star starClick={handleStarClick} numberOfStars={2} />
                <Star starClick={handleStarClick} numberOfStars={1} />
            </div>
        );
    }

    const handleStarClick = (num) => {
        dispatch({
            type : 'SEARCH_QUERY',
            payload : { text : '' }
        });  
        setPrice([0, 0]);
        setCategoryIds([]); 
        setSub('');   
        setBrand(''); 
        setColor(''); 
        setShipping('');  
        setStar(num);
        fetchProducts({ stars : num });
    }

    // search by sub categories
    const showSubs = () => {
        return (
            subs.map(s => 
                <div className="p-1 m-1 badge badge-secondary"
                    key={s._id}
                    onClick={() => handleSub(s)}
                    style={{ cursor : 'pointer' }}
                >
                    {s.name}
                </div>
            )
        );
    }

    const handleSub = (sub) => {
        setSub(sub);
        dispatch({
            type : 'SEARCH_QUERY',
            payload : { text : '' }
        });  
        setPrice([0, 0]);
        setCategoryIds([]);        
        setStar('');
        setBrand('');
        setColor('');
        setShipping('');
        fetchProducts({ sub : sub });
    }

    // search by brands
    const showBrands = () => brands.map(b => 
        <Radio value={b} 
            name={b} 
            key={b}
            checked={b === brand} 
            onChange={handleBrand}
            className="pb-1 pl-4 pr-4"
        >
            {b}
        </Radio>
    );

    const handleBrand = (e) => {
        setSub('');
        dispatch({
            type : 'SEARCH_QUERY',
            payload : { text : '' }
        });  
        setPrice([0, 0]);
        setCategoryIds([]);        
        setStar('');
        setColor('');
        setShipping('');
        setBrand(e.target.value);
        fetchProducts({ brand : e.target.value });
    }

    // search by Colors
    const showColors = () => colors.map(c => 
        <Radio value={c} 
            name={c} 
            key={c}
            checked={c === color} 
            onChange={handleColor}
            className="pb-1 pl-4 pr-4"
        >
            {c}
        </Radio>    
    );

    const handleColor = (e) => {
        setSub('');
        dispatch({
            type : 'SEARCH_QUERY',
            payload : { text : '' }
        });  
        setPrice([0, 0]);
        setCategoryIds([]);        
        setStar('');
        setBrand('');
        setShipping('');
        setColor(e.target.value);
        fetchProducts({ color : e.target.value });
    }

    // search by Shipping
    const showShipping = () => {
        return (
            <>
                <Checkbox className="pb-2 pl-4 pr-4" onChange={handleShippingChange} value="Yes" 
                    checked={shipping === 'Yes'}
                >
                    Yes
                </Checkbox>
                <Checkbox className="pb-2 pl-4 pr-4" onChange={handleShippingChange} value="No" 
                    checked={shipping === 'No'}
                >
                    No
                </Checkbox>
            </>
        );
    }

    const handleShippingChange = (e) => {
        setSub('');
        dispatch({
            type : 'SEARCH_QUERY',
            payload : { text : '' }
        });  
        setPrice([0, 0]);
        setCategoryIds([]);        
        setStar('');
        setBrand('');
        setColor('')
        setShipping(e.target.value);
        fetchProducts({ shipping : e.target.value });
    }
   
    return (
        <div className="container-fluid">
            <div className="row pt-3 pb5">
                <div className="col-md-3">
                    <h4>Search/Filter</h4>
                    <hr />
                    <Menu mode="inline" defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}>
                        {/* Price */}
                        <SubMenu key="1" 
                            title={<span className="h6"><DollarOutlined />Price</span>}
                        >
                            <div>
                                <Slider className="ml-4 mr-4" tipFormatter={(v) => `$${v}`} 
                                    range value={price} onChange={handleSlider}
                                    max="4999"
                                />
                            </div>
                        </SubMenu>
                        {/* Price */}

                        {/* Categories */}
                        <SubMenu key="2" 
                            title={<span className="h6"><DownSquareOutlined />Category</span>}
                        >
                            <div>
                                 {showCaregories()}
                            </div>
                        </SubMenu>
                        {/* Categories */}

                        {/* Stars */}
                        <SubMenu key="3" 
                            title={<span className="h6"><StarOutlined />Ratings</span>}
                        >
                            <div>
                                 {showStars()}
                            </div>
                        </SubMenu>
                        {/* Stars */}

                        {/* Sub Categories */}
                        <SubMenu key="4" 
                            title={<span className="h6"><DownSquareOutlined />Sub Categories</span>}
                        >
                            <div className="pl-4 pr-4">
                                 {showSubs()}
                            </div>
                        </SubMenu>
                        {/* Sub Categories */}

                        {/* Brands */}
                        <SubMenu key="5" 
                            title={<span className="h6"><StarOutlined />Brands</span>}
                        >
                            <div className="pr-5">
                                 {showBrands()}
                            </div>
                        </SubMenu>
                        {/* Brands */}

                        {/* Colors */}
                        <SubMenu key="6" 
                            title={<span className="h6"><StarOutlined />Colors</span>}
                        >
                            <div className="pr-5">
                                 {showColors()}
                            </div>
                        </SubMenu>
                        {/* Colors */}

                        {/* Shipping */}
                        <SubMenu key="7" 
                            title={<span className="h6"><StarOutlined />Shipping</span>}
                        >
                            <div className="pr-5">
                                 {showShipping()}
                            </div>
                        </SubMenu>
                        {/* Shipping */}

                    </Menu>
                </div>
                <div className="col-md-9">
                    { loading 
                        ?
                            (<h4 className="text-danger">Loading...</h4>)
                        :
                            (<h4>Products</h4>)
                    }
                    { products.length < 1 && <p>No products found</p> }
                    <div className="row mb-5">
                        {products.map(p => 
                            (<div key={p._id} className="col-md-4 mt-5">
                                <ProductCard product={p} />
                            </div>)
                        
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;