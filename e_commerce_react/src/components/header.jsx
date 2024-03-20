import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Button } from 'antd';
import { UserOutlined, ShoppingCartOutlined, LogoutOutlined, FileTextOutlined, HomeOutlined } from '@ant-design/icons';
import { logoutUser } from '../store/auth/auth.actions';

const { Header } = Layout;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleTitleClick = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/');
    } catch(err) {
      console.error(err); 
    }
  }

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
      {isAuthenticated && (
          <>
            {location.pathname === '/cart' ? (
              <Button type="primary" ghost onClick={() => navigate('/')} style={{ marginRight: '8px' }} icon={<HomeOutlined />}>Shop</Button>
            ) : location.pathname === '/account' ? (
              <Button type="primary" ghost onClick={() => navigate('/')} style={{ marginRight: '8px' }} icon={<HomeOutlined />}>Shop</Button>
            ) : (
              <>
                <Button type="primary" ghost onClick={() => navigate('/account')} style={{ marginRight: '8px' }} icon={<UserOutlined />}>My account</Button>
              </>
            )}
          </>
        )}
        
        <div onClick={handleTitleClick} style={{ flex: 1, textAlign: 'center' }}>
          <h1 style={{ color: 'white', cursor: 'pointer', fontSize: 'xx-large' }}>Silna Marka</h1>
        </div>
      </div>
      <div className="demo-logo" />
      <div className="site-button-ghost-wrapper" style={{ display: 'flex', gap: '8px' }}>
        {!isAuthenticated && (
          <Button type="primary" danger ghost onClick={() => navigate('/login')}>Login</Button>
        )}
        {isAuthenticated && (
          <>
            {location.pathname === '/cart' ? (
              <Button type="primary" ghost icon={<FileTextOutlined />} onClick={() => navigate('/orders')}>Order History</Button>
            ) : (
              <Button type="primary" ghost icon={<ShoppingCartOutlined />} onClick={() => navigate('/cart')}>Cart</Button>
            )}
            <Button type="primary" danger ghost icon={<LogoutOutlined />} onClick={handleLogout}></Button>
          </>
        )}
      </div>
    </Header>
  );
};

export default HeaderComponent;
