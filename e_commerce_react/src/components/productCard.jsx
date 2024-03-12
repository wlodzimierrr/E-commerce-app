import React from 'react';
import { Card, Space } from 'antd';
import { Link } from 'react-router-dom';

function ProductCard(props) {

    const { data } = props;

    return (
    <Space direction="vertical" size={16}>
        <Card
        title={data.name}
        extra={<a href="#" component={Link}
        to={`/products/${data.id}`}>More</a>}
        style={{
            width: 300,
        }}
        >
        <p>{data.description}</p>
        <p>{data.price }</p>
        </Card>
    </Space>
    );
}
export default ProductCard;