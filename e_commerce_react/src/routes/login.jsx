import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import TextField from '../components/TextField';
import { Breadcrumb, Layout, Typography, Button } from 'antd';
import { loginUser } from '../store/auth/auth.actions';
import * as Yup from 'yup';
import CustomButton from '../components/Button';

const { Content } = Layout;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  // Login handler
  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      await dispatch(loginUser(credentials));
      setIsLoading(false);
      navigate('/');
    } catch(err) {
      setIsLoading(false);
    }
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .test(
        "email-or-username",
        "Invalid username or email address",
        value => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex for demonstration
          const isEmail = emailRegex.test(value);
          const isUsername = value !== undefined && value.trim().length > 0; // Basic check for username
          return isEmail || isUsername;
        }
      )
      .required("Username or email address is required"),
    password: Yup.string()
      .required("Password is required")
  });
  

  return (
    <Content
    style={{
      padding: '0 48px',
    }}
  >
    <Breadcrumb
      style={{
        margin: '16px 0',
      }}
    >
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Login</Breadcrumb.Item>
      <Breadcrumb.Item></Breadcrumb.Item>
    </Breadcrumb>
    <div className="app flex justify-center min-h-screen mt-[20px]">
    <div className="formComp w-full max-w-md"> 
      <div className="formWrapper">
          <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={loginSchema}
              validateOnBlur
              onSubmit={async (values) => {
                const { email: usernameOrEmail, password } = values;
                await handleLogin({ username: usernameOrEmail, password });
              }}
            >
              <Form className="baseForm">
                <TextField
                  label="Username or Email"
                  name="email" 
                  id="email-input"
                />
              <TextField
                label="Password"
                name="password"
                id="password-input"
              />
              {
                error && <div className="text-red-500">{error}</div>
              }
               <div className="space-y-4 flex justify-center mt-[1px]">
              <CustomButton variant="contained" color="primary" size="small" type="submit" isLoading={isLoading}>Submit</CustomButton>
              </div>
              <div>
              <Typography>New here?<Button className="ml-[-10px]" type="link" onClick={() => navigate('/register')}>Create an Account</Button></Typography>
              </div>
              <Divider />
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  </Content>
  );
}

export default Login;