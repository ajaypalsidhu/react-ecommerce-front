import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';  


import { getCategories } from '../../../functions/category';
import { 
    updateSub, 
    getSub 
} from '../../../functions/sub';
import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm';

const SubUpdate = ({history, match}) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({ ...state }));
    const [categories, setCategories] = useState([]);    
    const [parent, setParent] = useState('');

    useEffect(() => {
        loadCategories();
        loadSub();
    }, []);

    const loadCategories = () => {
        getCategories()
        .then(c => setCategories(c.data));
    }

    const loadSub = () => {
        getSub(match.params.slug)
        .then((s) => {
            setName(s.data.name);
            setParent(s.data.parent)
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateSub(match.params.slug, { name, parent }, user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`${res.data.name} sub category updated.`)
            history.push('/admin/sub');
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
        });
    }    

    return (
        <div className="conatiner-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    { loading 
                        ? (<h4 className="text-danger">Loading...</h4>) 
                        : (<h4>Update sub category</h4>)
                    }

                    <div className="form-group">
                        <label>Select Parent Category</label>
                        <select 
                            name="category" 
                            className="form-control"
                            required 
                            onChange={(e) => setParent(e.target.value)}
                        >
                            <option>Please select a category</option>
                            { categories.length > 0 && categories.map((cat) => (
                                <option 
                                    key={cat._id} 
                                    value={cat._id}
                                    selected={cat._id === parent}    
                                >
                                    {cat.name}
                                </option>
                                )
                            )}                            
                        </select>
                    </div>

                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />

                </div>
            </div>
        </div>
    );
}

export default SubUpdate;