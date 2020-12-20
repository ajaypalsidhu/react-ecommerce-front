import React from 'react';
import { Select } from 'antd';
import { getCategorySubs } from '../../functions/category';

const { Option } = Select;

const ProductUpdateForm = ({
    handleChange, 
    handleSubmit, 
    values, 
    setValues,
    handleCategoryChange,
    subOptions,
    showSub,
    categories,
    arrayOfSubs,
    setArrayOfSubs,
    selectedCategory
}) => {

    const { title, description, price, category, subs, shipping, quantity, images, colors, brands,
        color, brand } = values;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={handleChange}
              />
            </div>            
            <div className="form-group">
              <label>Descriptiom</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Shipping</label>
              <select
                name="shipping"
                className="form-control"
                onChange={handleChange}
                value={shipping === 'Yes' ? 'Yes' : 'No'}
              >                
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Color</label>
              <select
                name="color"
                value={color}
                className="form-control"
                onChange={handleChange}
              >                
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Brand</label>
              <select
                name="brand"
                value={brand}
                className="form-control"
                onChange={handleChange}
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
                <label>Select Category</label>
                <select 
                    name="category" 
                    className="form-control"
                    required 
                    value={selectedCategory ? selectedCategory : category._id}
                    onChange={handleCategoryChange}
                >                    
                    { categories.length > 0 && categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                        )
                    )}                            
                </select>
            </div>
            <div>
              <label>Select Sub Categories</label>
              <Select
                mode="multiple"
                style={{width:'100%'}}
                placeholder="Please select sub categories"                
                value={arrayOfSubs}
                onChange={value => setArrayOfSubs(value)}
              >
                { subOptions.length && subOptions.map(s => 
                  (<Option key={s._id} value={s._id}>{s.name}</Option>)
                )}                                
              </Select>
            </div>
            <br />
            <button className="btn btn-outline-info">Save</button>
        </form>
    );
}

export default ProductUpdateForm;