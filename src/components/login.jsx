import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';


const Login = ({ users, login }) => {
  const [loginError, setLoginError] = useState(false);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const onFinish = (values) => {

    if (isBlocked) {
      message.error('Your account is blocked. Please contact support.');
      return;
    }

    
    const { email, password } = values;
    const user = users.find((user) => user.email === email);

    if (user && user.password === password) {
      setLoginError(false);
      console.log('Login Successful');
      message.success('Login Successful');
      login();
    } else {
      if (incorrectCount >= 3) {
        setIsBlocked(true);
        message.error('Too many incorrect login attempts. Your account is blocked.');
      } else {
        setIncorrectCount(incorrectCount + 1);
        setLoginError(true);
        let remaining = 3-incorrectCount;
        message.warning(`Invalid Login Remaining retries: ${remaining}`)
      }
      console.log('Invalid login');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '100px',
        height: '100vh'
      }}
    >
      <div style={{ width: '30%' }}>
        <Form name="login-form" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input disabled={isBlocked} />  
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input.Password disabled={isBlocked}/>
          </Form.Item>
          {loginError && (
            <Form.Item style={{ textAlign: 'center' }}>
              <p style={{ color: 'red' }}>Invalid email or password</p>
            </Form.Item>
          )}
          <Form.Item style={{ textAlign: 'center' }} wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={isBlocked}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
