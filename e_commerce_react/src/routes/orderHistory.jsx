import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Layout, Typography, Divider } from 'antd';
import OrderCard from '../components/orderCard';
import { loadOrdersAndSoldItems } from '../store/orders/orders.actions';

const { Content } = Layout;

const OrderHistory = () => {
  const dispatch = useDispatch();
  const ordersObj = useSelector(state => state.orders.byId || {});
  const orders = Object.values(ordersObj); 
  useEffect(() => {
    dispatch(loadOrdersAndSoldItems());
  }, [dispatch]);

  return (
    <Content style={{ padding: '0 48px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={4}>Your Orders</Typography.Title>
      <Divider />
      <Typography.Title level={5}>{orders.length} orders</Typography.Title>
      {orders.map((order) => (
        <OrderCard key={order.id} {...order} />
      ))}
    </Content>
  );
};

export default OrderHistory;
