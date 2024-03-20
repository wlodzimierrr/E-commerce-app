import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Form, Input, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CustomButton from '../components/Button';
import { updateUserDetails } from '../store/auth/auth.actions';

const { Content } = Layout;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const Account = () => {
  const { user_id, username, firstname, lastname, email } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [fieldsDisabled, setFieldsDisabled] = useState({
    username: true,
    password: true,
    firstname: true,
    lastname: true,
    email: true,
  });
  const [editedFields, setEditedFields] = useState({});

  useEffect(() => {
    form.setFieldsValue({ username, firstname, lastname, email, password: '*****' });
    setEditedFields(Object.keys(fieldsDisabled).reduce((acc, field) => {
      acc[field] = !fieldsDisabled[field];
      return acc;
    }, {}));
  }, [username, firstname, lastname, email, form, fieldsDisabled]);

  const toggleFieldDisabled = (fieldName) => {
    setFieldsDisabled(prevState => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const handleFieldChange = (_, allFields) => {
    const newEditedFields = allFields.reduce((acc, field) => {
      if (field.touched && !fieldsDisabled[field.name[0]]) {
        acc[field.name[0]] = true;
      }
      return acc;
    }, {});
    setEditedFields(newEditedFields);
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);

    const payload = Object.keys(values).reduce((acc, key) => {
      if (editedFields[key] && !fieldsDisabled[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {});
    
    try {
      await dispatch(updateUserDetails({ user_id, data: payload }));
      navigate('/'); 
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Content style={{ padding: '0 48px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>My account</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-center h-full mt-[50px]">
        <Form
          {...formItemLayout}
          style={{ maxWidth: 600 }}
          className="w-full max-w-xl"
          form={form}
          onFieldsChange={handleFieldChange}
          onFinish={handleFormSubmit}
        >
        <Form.Item
            label="Username"
            name="username"
          >
            <Input
              disabled={fieldsDisabled.username}
              addonAfter={<CloseOutlined onClick={() => toggleFieldDisabled('username')} />}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
          >
            <Input.Password
              disabled={fieldsDisabled.password}
              addonAfter={<CloseOutlined onClick={() => toggleFieldDisabled('password')} />}
            />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="firstname"
          >
            <Input
              disabled={fieldsDisabled.firstname}
              addonAfter={<CloseOutlined onClick={() => toggleFieldDisabled('firstname')} />}
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastname"
          >
            <Input
              disabled={fieldsDisabled.lastname}
              addonAfter={<CloseOutlined onClick={() => toggleFieldDisabled('lastname')} />}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
          >
            <Input
              disabled={fieldsDisabled.email}
              addonAfter={<CloseOutlined onClick={() => toggleFieldDisabled('email')} />}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <CustomButton variant="contained" color="primary" size="small" type="submit" isLoading={isLoading}>
              Submit
            </CustomButton>
          </Form.Item>
          <Divider  style={{   borderColor: 'lightgrey', borderWidth: '1px' }} />
        </Form>
      </div>
      <div>
        
      </div>
    </Content>
  );
};

export default Account;
