import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { getCategories } from '../../../functions/category';
import { 
    createSub, 
    getSubs,
    removeSub 
} from '../../../functions/sub';
import AdminNav from '../../../components/nav/AdminNav';
import LocalSearch from '../../../components/forms/LocalSearch';
import CategoryForm from '../../../components/forms/CategoryForm';

const SubCreate = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({ ...state }));
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, []);

    const loadCategories = () => {
        getCategories()
        .then(c => setCategories(c.data));
    }

    const loadSubs = () => {
        getSubs()
        .then(s => setSubs(s.data));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createSub({ name, parent : category }, user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`${res.data.name} sub category created.`)
            loadSubs();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
        });
    }

    const handleRemove = async (slug) => {
        //console.log(slug + ' | ' + user.token);
        if(window.confirm('Delete?')) {
            //console.log(user.token);
            setLoading(true);
            removeSub(slug, user.token)
            .then((res) => {
                //console.log("Cat name is ", res.data);
                setLoading(false);
                toast.error(`${res.data.name} deleted.`);
                loadSubs();
            })
            .catch(err => {
                if (err.response.status === 400) {
                    setLoading(false);
                    toast.error(err.response.data);
                }
            });
        }
    }

    

    const searched = (keyword) => (s) => s.name.toLowerCase().includes(keyword);

    return (
        <div className="conatiner-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    { loading 
                        ? (<h4 className="text-danger">Loading...</h4>) 
                        : (<h4>Create sub category</h4>)
                    }

                    <div className="form-group">
                        <label>Select Parent Category</label>
                        <select 
                            name="category" 
                            className="form-control"
                            required 
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Please select a category</option>
                            { categories.length > 0 && categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
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
                        
                    <LocalSearch 
                        keyword={keyword}
                        setKeyword={setKeyword}
                    />
                    
                    {subs.filter(searched(keyword)).map((s) => (
                        <div className="alert alert-secondary" key={s._id}>
                            {s.name}
                            <span 
                                onClick={() => handleRemove(s.slug)} 
                                className="btn btn-sm float-right"
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link to={`/admin/sub/${s.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning" />
                                </span>                                
                            </Link>
                        </div>
                        ))
                    }     
                </div>
            </div>
        </div>
    );
}

export default SubCreate;