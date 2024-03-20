import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Breadcrumb, Layout } from 'antd';
import ProductCard from '../components/productCard';
import { useSelector } from 'react-redux';
import { loadProducts } from '../store/products/products.action';
import './login';

const { Content } = Layout;



const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

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
      <section className="flex flex-row flex-wrap">
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

export default Home;
