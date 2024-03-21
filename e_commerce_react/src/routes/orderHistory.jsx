import React from 'react';
import { Breadcrumb, Layout } from 'antd';

const { Content } = Layout;



const OrderHistory = () => {
  
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
        <Breadcrumb.Item>Order History</Breadcrumb.Item>
        <Breadcrumb.Item></Breadcrumb.Item>
      </Breadcrumb>
    </Content>
  );
};

export default OrderHistory;
