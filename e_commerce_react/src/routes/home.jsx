import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { loadProducts } from '../store/products/products.action';
import ProductCard from '../components/productCard';
const { Header, Content, Footer } = Layout;

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  useEffect(() => {
    async function load() {
      await dispatch(loadProducts());
    }
    load();
  }, [dispatch]);


  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', // Added to space out the elements
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
        <h1 style={{ color: 'white', textAlign: 'center' }}>Silna Marka</h1>
        </div>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="login">Login</Menu.Item>
          {/* Add ShoppingCartOutlined icon as a Menu.Item for alignment */}
          <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
            Cart
          </Menu.Item>
        </Menu>
      </Header>
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
        { products && Object.keys(products).length > 0 &&
          Object.keys(products).map((key) => {
            const product = products[key];
            return <ProductCard data={product} key={product.id} />
          })
        }
      </section>
        
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Wlodzimier
      </Footer>
    </Layout>
  );
};
export default Home;
