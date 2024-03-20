import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadCart } from '../store/cart/cart.actions';
import { Breadcrumb, Layout, Table, Typography, Button } from 'antd';
import CartItemCard from '../components/CartItemCard';
import Divider from '@material-ui/core/Divider';

const { Content } = Layout;

    function Cart() {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const items = useSelector(state => state.cart.items || []);
        useEffect(() => {
            dispatch(loadCart());
        }, [dispatch]);



    function calculateTotal() {
        return items.reduce((total, { price, quantity }) => total + price * quantity, 0);
    }

    const cartColumns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'right',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            render: price => `$${price}`,
        },
    ];

    const cartDataSource = items.map(item => ({
        key: item.cartItemId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
    }));

    const summaryDataSource = [
        { key: 'subtotal', label: 'Subtotal', value: `$${calculateTotal()}` },
        { key: 'shipping', label: 'Shipping', value: 'FREE' },
        { key: 'total', label: 'Total', value: `$${calculateTotal()}`, className: 'text-lg font-bold' },
    ];

    const summaryColumns = [
        { 
            title: '', 
            dataIndex: 'label', 
            key: 'label' 
        },
        { 
            title: '', 
            dataIndex: 'value', 
            key: 'value', 
            align: 'right',
        },
    ];

  return (
    <Content
    style={{
      padding: '0 48px',
    }}
  >
            <Breadcrumb
            style={{
                margin: '16px 0',
            }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Cart</Breadcrumb.Item>
                <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <section className="cart-details-container px-4 py-2">
            <Typography variant="h4" className="text-black mb-5 ">Cart Items</Typography>
        
            {/* Cart Items Details */}
            {items.length > 0 ? (
                items.map((item) => (
                <CartItemCard {...item} />
                ))
            ) : (
                <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            
            <Typography variant="h4" className="text-black mt-5 mb-5 text-lg font-bold" >Product List</Typography> 
            
            <Table 
                columns={cartColumns} 
                dataSource={cartDataSource} 
                pagination={false}
                bordered
                className='shadow-md'
                style={{ borderColor: '#333', borderWidth: '2px' }} 
            />

            <Typography variant="h4" className="text-black mt-5 mb-5 text-lg font-bold">Order Summary</Typography>
            
            <Table
                columns={summaryColumns}
                dataSource={summaryDataSource}
                pagination={false}
                showHeader={false}
                bordered
                className='shadow-md' 
                style={{ borderColor: '#333', borderWidth: '2px' }}
            />
        <div className="w-full flex justify-end">
        <Button
            type="primary" 
            ghost
            className="checkout-btn mt-2"
            onClick={() => navigate('/checkout')}
        >
            Checkout
        </Button>
        </div>

        </section>
    </Content>
    );
}

export default Cart;
