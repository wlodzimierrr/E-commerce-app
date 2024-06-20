import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../components/checkoutForm';

const { Content } = Layout;
const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");

function Checkout() {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    stripePromise.then((stripeInstance) => {
      setStripe(stripeInstance);
    });
  }, []);

  if (!stripe) {
    return <div className="text-center">Loading Stripe...</div>;
  }

  return (
    <Content className="px-3 lg:px-12 py-4">
      <Breadcrumb className="my-4">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Cart</Breadcrumb.Item>
        <Breadcrumb.Item>Checkout</Breadcrumb.Item>
      </Breadcrumb>
      <Elements stripe={stripe}>
        <div className="flex justify-center p-8 bg-gray-100">
          <CheckoutForm />
        </div>
      </Elements>
    </Content>
  );
}

export default Checkout;
