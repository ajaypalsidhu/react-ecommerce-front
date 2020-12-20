import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

import UserNav from '../../components/nav/UserNav';
import { getWishlist, removeWishlist} from '../../functions/user';
import { toast } from 'react-toastify';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useSelector(state => ({ ...state }));

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = () => {
        getWishlist(user.token)
        .then(res => {
            setWishlist(res.data.wishlist);
        })
        .catch(err => console.log(err));
    }

    const handleRemove = (productId) => {
        removeWishlist(productId, user.token)
        .then(res => {
            loadWishlist();
            toast.error('Removed from Wishlist');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="conatiner-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col-md-10">
                    <h4>Wishlist</h4>
                    {wishlist.map(p => (
                        <div key={p._id} className="alert alert-secondary">
                            <Link to={`/product/${p.slug}`}>{p.title}</Link>
                            <span 
                                onClick={() => handleRemove(p._id)} 
                                className="btn btn-sm float-right"
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Wishlist;