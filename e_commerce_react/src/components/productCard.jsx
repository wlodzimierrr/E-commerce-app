import React from 'react';
import { Card, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function ProductCard(props) {
    const navigate = useNavigate();
    const { data } = props;

    return (
    <Space direction="horizontal" size={16} >
        <Card
        title={data.name}
        extra={<Button type="primary" danger ghost onClick={() => navigate(`/products/${data.id}`)} >More</Button>}
        style={{
            width: 300,
        }}
        >
       <img onClick={() => navigate(`/products/${data.id}`)} src="https://surlybikes.com/uploads/bikes/surly-preamble-flat-bar-bike-blue-BK3643-1200x800.jpg" alt="" style={{ height: '150px' }} />

        <p>{data.description}</p>
        <p>{data.price }</p>
        </Card>
    </Space>
    );
}
export default ProductCard;