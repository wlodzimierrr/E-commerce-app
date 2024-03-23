import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = () => (
<Footer className="text-center">
    Silna Marka ©{new Date().getFullYear()} Created by Wlodzimier
  </Footer>
);

export default FooterComponent;
