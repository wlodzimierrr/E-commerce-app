import React, { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Layout, Typography, Button, Form, Input, Divider, message } from 'antd';
import { loginUser } from '../store/auth/auth.actions';
import * as Yup from 'yup';
import CustomButton from '../components/Button'

const { Content } = Layout;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      await dispatch(loginUser(credentials));
      navigate('/');
    } catch (err) {
      message.error('Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username or email address is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  return (
    <Content style={{ padding: '0 48px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Login</Breadcrumb.Item>
      </Breadcrumb>
      <div className="app flex justify-center min-h-screen mt-[20px]">
        <div className="w-full max-w-md">
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
              <Form
                layout="vertical"
                onFinish={handleSubmit}
              >
                <Form.Item
                  label="Username or Email"
                  help={touched.email && errors.email ? errors.email : ""}
                  validateStatus={touched.email && errors.email ? "error" : "success"}
                >
                  <Input
                    name="username"
                    onChange={e => setFieldValue('username', e.target.value)}
                    value={values.username}
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  help={touched.password && errors.password ? errors.password : ""}
                  validateStatus={touched.password && errors.password ? "error" : "success"}
                >
                  <Input.Password
                    name="password"
                    onChange={e => setFieldValue('password', e.target.value)}
                    value={values.password}
                  />
                </Form.Item>
                {error && <div className="text-red-500">{error}</div>}
                <Form.Item className="flex justify-end">
                  <CustomButton  ghost type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                  </CustomButton>
                </Form.Item>
                <Typography>New here? <Button type="link" onClick={() => navigate('/register')}>Create an Account</Button></Typography>
                <Divider />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Content>
  );
};

export default Login;
