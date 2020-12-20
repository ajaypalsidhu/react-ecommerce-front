import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { auth } from '../../firebase';
import UserNav from '../../components/nav/UserNav';

const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await auth.currentUser.updatePassword(password)
        .then(() => {
            setLoading(false);
            setPassword('');
            toast.success('Password updated!');
        })
        .catch(err => {
            setLoading(false)
            toast.error(err.message);
        });
    }

    const passwordUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Your Password</label>
                    <input type="password"
                        onChange={e => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter new password"
                        value={password}
                        disabled={loading}
                        // if loading is true, disable the input
                    />
                    <button className="btn btn-primary"
                        disabled={!password || loading || password.length < 6}
                    >
                        Submit
                    </button>
                </div>
            </form>
        );
    }

    return (
        <div className="conatiner-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    { 
                        loading 
                            ? <h4 className="text-danger">Loading</h4> 
                            : <h4>Password Update</h4>
                    }
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    );
}

export default Password;