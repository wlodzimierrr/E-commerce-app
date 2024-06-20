import React from 'react';
import { Divider } from 'antd';
import moment from 'moment';
import SoldProductCard from './soldProductCard';

const OrderCard = ({ created_at, id, total_amount, soldItems }) => {

  return (
    <div className="order-card-container">
      <div className="order-card-header">
        <p>Order Placed: {moment(created_at).format('LL')}</p>
        <p>Total: ${total_amount}</p>
        <p>Order # {id}</p>
      </div>
      <Divider />
      {soldItems.map((item, index) => (
        <SoldProductCard key={index} data={{...item.productDetails, model: item.model, quantity: item.quantity}} />
      ))}
      <Divider />
    </div>
  );
};


export default OrderCard;
