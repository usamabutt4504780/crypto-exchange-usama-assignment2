import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#000000', color: '#FFFFFF', width:'100%', position:'fixed', bottom: '0' }}>
      Your Footer Content Here
    </Footer>
  );
};

export default AppFooter;