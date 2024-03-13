import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import ProductCard from './productCard';
import { useSelector } from 'react-redux';

const { Content } = Layout;

const ContentComponent = () => {
  const products = useSelector(state => state.products);

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
        <Breadcrumb.Item></Breadcrumb.Item>
      </Breadcrumb>
      <section className="grid">
        {products && Object.keys(products).length > 0 &&
          Object.keys(products).map((key) => {
            const product = products[key];
            return <ProductCard data={product} key={product.id} />;
          })
        }
      </section>
    </Content>
  );
};

export default ContentComponent;
