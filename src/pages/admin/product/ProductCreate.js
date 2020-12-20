import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from '@ant-design/icons';

import AdminNav from "../../../components/nav/AdminNav";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: ""
};

const ProductCreate = ({history}) => {
  const [values, setValues] = useState(initialState);
  const {user} = useSelector((state) => ({ ...state }));
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
        getCategories()
        .then(c => setValues({ ...values, categories:c.data}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
    .then(res => {
        console.log(res);
        toast.success(`${res.data.title} successfully added.`);
        setValues(initialState);        
        history.push('/admin/dashboard');
    })
    .catch(err => {
        console.log(err);
        //if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.error);
    });
    //setValues([]);
  };

  const handleChange = (e) => {
      setValues({...values, [e.target.name] : e.target.value});
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs : [], category:e.target.value })
    getCategorySubs(e.target.value)
    .then((res) => {
      setSubOptions(res.data);
    });
    setShowSub(true);
  }

  return (
    <div className="conatiner-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Create</h4>
          {loading ? (<LoadingOutlined className="h1" />) : ''}
          <hr />
          
          <div className="p3">
            <FileUpload 
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductCreateForm 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            values={values} 
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
