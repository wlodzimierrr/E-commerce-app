import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
    Breadcrumb, 
    Layout, 
    Typography, 
    Button,   
    Form,
    Input,
    InputNumber,
} from 'antd';
import CustomButton from '../components/Button'
import { registerUser } from '../store/auth/auth.actions';

const { Content } = Layout;

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };
  
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();


    const handleRegister = async (credentials) => {
        try {
          setIsLoading(true);
          await dispatch(registerUser(credentials));
          navigate('/login');
        } catch(err) {
          setIsLoading(false);
        }
      }

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
          <Breadcrumb.Item>Register</Breadcrumb.Item>
          <Breadcrumb.Item></Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex justify-center h-full mt-[50px]">
            <Form 
                {...formItemLayout}
                variant="outlined"
                style={{
                maxWidth: 600,
                }}
                className="w-full max-w-xl"
                form={form}
                onFinish={async (values) => {
                    const {username, password, firstname, lastname, email } = values;
                    await handleRegister({username: username, password: password, firstname: firstname, lastname: lastname, email: email});
                  }}
                
            >   
                                <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                    required: true,
                    message: 'Please input your login!',
                    },
                ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>
                <Form.Item
                label="First Name"
                name="firstname"
                rules={[
                    {
                    required: true,
                    message: 'Please input First Name!',
                    },
                ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                label="Last Name"
                name="lastname"
                rules={[
                    {
                    required: true,
                    message: 'Please input Last Name!',
                    },
                ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                label="E-mail"
                name="email"
                rules={[
                    {
                    required: true,
                    message: 'Please input E-mail!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 6,
                    span: 16,
                }}
                >
                <CustomButton variant="contained" color="primary" size="small" type="submit" isLoading={isLoading}>Submit</CustomButton>
                </Form.Item>
            </Form>
        </div>
        </Content>
    )
};

export default Register;
