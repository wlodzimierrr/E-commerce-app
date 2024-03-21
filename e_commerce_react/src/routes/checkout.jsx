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
    stripePromise.then(stripeInstance => {
      setStripe(stripeInstance);
    });
  }, []);


  if (!stripe) {
    return <div>Loading Stripe...</div>;
  }

  return (
    <Content style={{ padding: '0 48px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Cart</Breadcrumb.Item>
        <Breadcrumb.Item>Checkout</Breadcrumb.Item>
      </Breadcrumb>
      <Elements stripe={stripe}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem', backgroundColor: '#f0f2f5' }}>
          <CheckoutForm />
        </div>
      </Elements>
    </Content>
  );
}

export default Checkout;



