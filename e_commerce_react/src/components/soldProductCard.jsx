import React from 'react';
import { Card, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function SoldProductCard(props) {
    const navigate = useNavigate();
    const { data } = props;
    const { name, price, description, img_link, model, quantity } = data; 

    return (
        <Space direction="horizontal" size={16}>
            <Card
                title={name}
                extra={<Button type="primary" danger ghost onClick={() => navigate(`/products/${data.id}`)}>More</Button>}
                style={{ width: 300 }}
            >
                {img_link.length > 0 && (
                    <img
                        onClick={() => navigate(`/products/${data.id}`)}
                        src={img_link[0]}
                        alt={`Product ${name}`}
                        style={{ height: '150px', display: 'block', margin: 'auto' }}
                    />
                )}
                <p>{description}</p>
                <p>{`Price: $${price}`}</p>
                <p>{`Model: ${model}`}</p> 
                <p>{`Quantity: ${quantity}`}</p> 
            </Card>
        </Space>
    );
}

export default SoldProductCard;