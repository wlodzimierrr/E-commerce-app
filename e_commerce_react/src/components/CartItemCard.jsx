import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

import Incrementer from './incrementer';

import { removeItem } from '../store/cart/cart.actions';

function CartItemCard(props) {

  const { cartItemId, name, price, quantity} = props;
  const [ qty, setQuantity ] = useState(quantity);
  const location = useLocation();
  const dispatch = useDispatch();

  function handleIncrement() {
    setQuantity(qty + 1);
  }

  function handleDecrement() {
    if (qty === 1) {
      return;
    }
    setQuantity(qty - 1);
  }

  async function remove() {
    await dispatch(removeItem(cartItemId));
  }

  return (
    <>
      <div className="cart-item-container p-4">
        <div className="cart-item-details flex gap-4">
          <img src="https://surlybikes.com/uploads/bikes/surly-preamble-flat-bar-bike-blue-BK3643-1200x800.jpg" alt="" className="h-48 object-cover" />
          <div className="flex flex-col justify-between">
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm">{price}</p>
            <p className="text-sm">{quantity}</p>
          </div>
        </div>
        <div className="cart-item-interact mt-4">
          {location.pathname === '/cart' ? null : (
            <Incrementer
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              value={qty}
            />
          )}
          <div className="flex justify-start mt-4">
            <Button type="primary" danger ghost icon={<CloseOutlined />} onClick={remove}>Remove</Button>
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
}

export default CartItemCard;
