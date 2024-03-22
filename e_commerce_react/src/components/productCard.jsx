import React from 'react';
import { Card, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function ProductCard(props) {
    const navigate = useNavigate();
    const { data } = props;

    return (
        <Space direction="horizontal" size={16}>
            <Card
                title={data.name}
                extra={<Button type="primary" danger ghost onClick={() => navigate(`/products/${data.id}`)}>More</Button>}
                style={{
                    width: 300,
                }}
            >
                {data.img_link.length > 0 && (
                    <img
                        onClick={() => navigate(`/products/${data.id}`)}
                        src={data.img_link[0]}
                        alt={`Product ${data.name}`}
                        style={{ height: '150px', display: 'block', margin: 'auto' }}
                    />
                )}

                <p>{data.description}</p>
                <p>{`$${data.price}`}</p>
            </Card>
        </Space>
    );
}
export default ProductCard;
