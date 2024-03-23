import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Breadcrumb, Layout, Form, Input } from 'antd';
import CustomButton from '../components/Button';
import { registerUser } from '../store/auth/auth.actions';

const { Content } = Layout;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleRegister = async (credentials) => {
    setIsLoading(true);
    try {
      await dispatch(registerUser(credentials));
      navigate('/login');
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Content className="px-3 lg:px-12 py-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Login</Breadcrumb.Item>
        <Breadcrumb.Item>Register</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-center mt-12">
        <Form
          form={form}
          onFinish={handleRegister}
          className="w-full max-w-xl"
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-center lg:justify-end">
            <CustomButton ghost type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default Register;
