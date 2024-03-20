import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = () => (
  <Footer
    style={{
      textAlign: 'center',
    }}
  >
    Ant Design ©{new Date().getFullYear()} Created by Wlodzimier
  </Footer>
);

export default FooterComponent;
