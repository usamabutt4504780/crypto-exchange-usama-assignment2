import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const MyHeader = ({ isLoggedIn, logout }) => {
  console.log(isLoggedIn);
  const handleClick = () => {
    logout();
  }
  return (
    <>
      <Header>
        {isLoggedIn ? (
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link onClick={handleClick}>Logout</Link>
              </Menu.Item>
            </Menu>
        ) : (
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/">Login</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/register">Register</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/about-us">Aboutus</Link>
              </Menu.Item>
            </Menu>

        )}
      </Header>
      <Outlet />
    </>

  );
};

export default MyHeader;