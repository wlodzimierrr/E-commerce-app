import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
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
      <div className="cart-item-container">
        <div className="cart-item-details">
          <img src="https://surlybikes.com/uploads/bikes/surly-preamble-flat-bar-bike-blue-BK3643-1200x800.jpg" alt="" style={{height: '200px', }} />
          <p>{name}</p>
          <p>{price }</p>
          <p>{quantity}</p>
        </div>
        <div className=".cart-item-interact">
        {location.pathname === '/cart' ? (
              <></>
            ) : (
              <Incrementer
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              value={qty}
            />
              
            )}
   
          <div className="w-full flex justify-start">
            
          <Button  className=""type="primary" danger ghost icon={<CloseOutlined />} onClick={remove}>Remove</Button>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default CartItemCard;
