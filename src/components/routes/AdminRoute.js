import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';

const AdminRoute = ({children, ...rest}) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user && user.token){
            currentAdmin(user.token)
            .then(res => {
                console.log('CURRENT ADMIN RES', res);
                setOk(true);
            })
            .catch(err => {
                console.log('CURRENT ADMIN EROOR', err);
                setOk(false);
            })
        }
    }, [user]);
    // we check for user and user token and if yes, we render the route with all its
    // children
    return ok 
        ?
            (<Route {...rest} />)
        :
            (<LoadingToRedirect />);
}

export default AdminRoute;