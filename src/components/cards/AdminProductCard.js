import React from 'react';
import { Card } from 'antd';
import laptop from '../../images/laptop.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AdminProductCard = ({ product, handleRemove }) => {
    const { Meta } = Card;
    const { title, images, description, price, slug } = product;

    return(
        <Card
            hoverable            
            cover={
                <img alt="example" 
                    style={{ height: 150, objectFit: "cover", border: "1px solid #DCDCDC"}}
                    src={images && images.length ? images[0].url : laptop} 
                    className="p-1" 
                />
            }
            actions={[ 
                <Link to={`/admin/product/${slug}`}>
                    <EditOutlined className="text-warning" />
                </Link>,
                <DeleteOutlined className="text-danger" onClick={() => handleRemove(slug, title)} /> 
            ]}
            >
            <Meta title={title} description={`${description && description.substring(0, 40)}...`} />
        </Card>
    );
}

export default AdminProductCard;