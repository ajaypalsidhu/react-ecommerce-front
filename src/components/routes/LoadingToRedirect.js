import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);

    let history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            // decreases the currentCount by 1
            setCount((currentCount) => --currentCount);
        }, 1000);
        // use history.push when count is equal to zero
        count === 0 && history.push('/');

        // clean up
        return () => clearInterval(interval);
    }, [count, history]);
    
    return (
        <div className="container p-5 text-center">
            <p>Redirecting in {count} seconds...</p>
        </div>
    );
}

export default LoadingToRedirect;