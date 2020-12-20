import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({children, ...rest}) => {
    const { user } = useSelector((state) => ({ ...state }));
    // we check for user and user token and if yes, we render the route with all its
    // children
    return user && user.token 
        ?
            (<Route {...rest} />)
        :
            (<LoadingToRedirect />);
}

export default UserRoute;