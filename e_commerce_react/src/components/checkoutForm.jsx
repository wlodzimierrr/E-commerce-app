import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Form, Alert } from 'antd';

import { checkoutCart } from '../store/cart/cart.actions';

function CheckoutForm() {
  const dispatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const onFinish = async () => {
    if (!stripe || !elements) {
      console.log('Stripe or elements not loaded');
      return;
    }

    setPaymentLoading(true);
    setPaymentSuccess(false);

    try {
      const cardElement = elements.getElement(CardElement);
      const { error, token } = await stripe.createToken(cardElement);

      if (error) {
        console.error(error.message);
        setPaymentLoading(false);
        return;
      }

      await dispatch(checkoutCart({ cartId: cart.id, paymentInfo: token }));
      setPaymentSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (err) {
      console.error(err);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="p-12 w-full">
      <div className="max-w-md mx-auto">
        <Form onFinish={onFinish} className="block w-full">
          {paymentSuccess && (
            <Alert
              message="Success"
              description="Payment was successful. Thank you for your purchase."
              type="success"
              showIcon
              className="mb-6"
            />
          )}
          <Form.Item>
            <div className="card mx-auto max-w-md">
              <CardElement options={{classes: {base: "p-4 border rounded shadow-sm"}}} />
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" ghost htmlType="submit" disabled={isPaymentLoading} className="w-full">
              {isPaymentLoading ? "Processing..." : "Pay"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default CheckoutForm;
