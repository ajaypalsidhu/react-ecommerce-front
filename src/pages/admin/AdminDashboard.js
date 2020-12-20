import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import AdminNav from '../../components/nav/AdminNav';
import { getOrders, changeStatus } from '../../functions/admin';
import Orders from '../../components/order/Orders';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector(state => ({ ...state }));
    
    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => getOrders(user.token)
    .then(res => setOrders(res.data))
    .catch(err => console.log(err));;

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token)
        .then(res => {
            toast.success('Status updated');
            loadOrders();
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="conatiner-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />                    
                </div>                
                <div className="col-md-10 pt-2">
                    <h1>Admin Dashboard</h1>
                    <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;