import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { Breadcrumb, Layout } from 'antd';
import { loginUser } from '../store/auth/auth.actions';
import * as Yup from 'yup';

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
      .email("Invalid email address")
      .required("Email address is required"),

    password: Yup.string()
      .required("Password is required")
  })

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
    <div className="app flex justify-center min-h-screen">
    <div className="formComp w-full max-w-md"> 
      <div className="formWrapper">
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={loginSchema}
            validateOnBlur
            onSubmit={async (values) => {
              const { email, password } = values;
              await handleLogin({username: email, password});
            }}
          >
            <Form className="baseForm">
              <header className="baseFormHeader">
                <h1 className="baseFormHeading">Log in</h1>
              </header>
              <TextField
                label="Email"
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
               <div className="space-y-4 flex justify-center">
              <Button variant="contained" color="primary" type="submit" isLoading={isLoading}>Submit</Button>
              </div>
              <p>Forgotten your password?</p>
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