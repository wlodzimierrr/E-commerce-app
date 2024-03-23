import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Button, Menu, Dropdown, Badge } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  FileTextOutlined,
  HomeOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { logoutUser } from '../store/auth/auth.actions';

const { Header } = Layout;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const cartItemsCount = useSelector(state => state.cart.items?.reduce((total, item) => total + item.quantity, 0) || 0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  
  const handleTitleClick = () => {
    navigate('/');
  };
  const updateViewportWidth = () => {
    setViewportWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const menu = (
    
    <Menu>
      {isAuthenticated && (
        <>
          <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => navigate('/')}>
            Shop
          </Menu.Item>
          <Menu.Item key="account" icon={<UserOutlined />} onClick={() => navigate('/account')}>
            My Account
          </Menu.Item>
          <Menu.Item  key="orders" icon={<FileTextOutlined />} onClick={() => navigate('/orders')}>
            Orders
          </Menu.Item>
          <Menu.Item danger ghost key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </>
      )}
      {!isAuthenticated && (
        <Menu.Item key="login" onClick={() => navigate('/login')}>
          Login
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Header className="flex items-center justify-between px-4 zinc-400">
      <div onClick={handleTitleClick} className="cursor-pointer">
        <h1 className="text-white text-3xl">Silna Marka</h1>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated && viewportWidth <= 768 && (
          <Badge count={cartItemsCount} overflowCount={99}>
            <Button icon={<ShoppingCartOutlined />} onClick={() => navigate('/cart')} className="text-white" />
          </Badge>
        )}
        {viewportWidth <= 768 ? (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<MenuOutlined />} className="text-white ml-2" />
          </Dropdown>
        ) : isAuthenticated ? (
          <>
            {['/cart', '/account'].includes(location.pathname) ? (
              <Button type="primary" ghost onClick={() => navigate('/')} icon={<HomeOutlined />}>
                Shop
              </Button>
            ) : (
              <Button type="primary" ghost onClick={() => navigate('/account')} icon={<UserOutlined />}>
                My Account
              </Button>
            )}
            {location.pathname === '/cart' ? (
              <Button type="primary" ghost onClick={() => navigate('/orders')} icon={<FileTextOutlined />}>
                Orders
              </Button>
            ) : (
              <Badge count={cartItemsCount} overflowCount={99}>
                <Button type="primary" ghost onClick={() => navigate('/cart')}>
                  Cart
                </Button>
              </Badge>
            )}
            <Button type="primary" danger ghost onClick={handleLogout} icon={<LogoutOutlined />} />
          </>
        ) : (
          <Button type="primary" danger ghost onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </div>
    </Header>
  );
};

export default HeaderComponent;
