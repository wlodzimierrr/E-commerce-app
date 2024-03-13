import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout, Menu, Button } from 'antd';
import { ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }} onClick={handleTitleClick}>
        <h1 style={{ color: 'white', textAlign: 'center', cursor: 'pointer', fontSize: 'xx-large' }}>Silna Marka</h1>
      </div>
      <div className="demo-logo" />
      <div className="site-button-ghost-wrapper" style={{ display: 'flex', gap: '8px' }}>
        {!isAuthenticated && (
          <Button type="primary" danger ghost onClick={() => navigate('/login')}>Login</Button>
        )}
        {isAuthenticated && (
          <>
            <Button type="primary"  ghost icon={<ShoppingCartOutlined />} onClick={() => navigate('/cart')}>Cart</Button>
            <Button type="primary" danger ghost icon={<LogoutOutlined />} ></Button>
          </>
        )}
      </div>
    </Header>
  );
};

export default HeaderComponent;
