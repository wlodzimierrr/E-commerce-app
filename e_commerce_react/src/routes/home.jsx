import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Layout } from 'antd';
import ProductCard from '../components/productCard';
import { loadProducts } from '../store/products/products.action';

const { Content } = Layout;

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products);

  return (
    <Content className="px-3 lg:px-12 py-4">
      <Breadcrumb className="my-4">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item></Breadcrumb.Item>
      </Breadcrumb>
      <section className="flex flex-wrap -mx-2">
        {products && Object.keys(products).length > 0 &&
          Object.keys(products).map((key) => {
            const product = products[key];
            return (
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 py-2" key={product.id}>
                <ProductCard data={product} />
              </div>
            );
          })
        }
      </section>
    </Content>
  );
};

export default Home;
