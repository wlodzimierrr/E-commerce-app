import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Typography, Divider } from 'antd';
import OrderCard from '../components/orderCard';
import { loadOrdersAndSoldItems } from '../store/orders/orders.actions';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const ordersObj = useSelector(state => state.orders.byId || {});
  const orders = Object.values(ordersObj);

  useEffect(() => {
    dispatch(loadOrdersAndSoldItems());
  }, [dispatch]);

  return (
    <div className="p-4 md:p-12">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={4} className="text-lg leading-6 font-medium text-gray-900">Your Orders</Typography.Title>
      <Divider className="my-4"/>
      <Typography.Title level={5} className="text-base leading-6 font-medium text-gray-900">{orders.length} orders</Typography.Title>
      {orders.map((order) => (
        <OrderCard key={order.id} {...order} />
      ))}
    </div>
  );
};

export default OrderHistory;
