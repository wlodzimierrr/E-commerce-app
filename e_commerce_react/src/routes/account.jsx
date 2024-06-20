import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Form, Input, Divider, Modal, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CustomButton from '../components/Button';
import { deleteUser, logoutUser } from '../store/auth/auth.actions';
import { updateUserDetails, fetchUserDetails } from '../store/user/user.actions'

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
  const { id, username, firstname, lastname, email } = useSelector(state => state.user);
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
      await dispatch(updateUserDetails({ id, data: payload }));
      await dispatch(fetchUserDetails(id)); 
      message.success('Details updated successfully');

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = () => {
    const formRef = React.createRef();

    Modal.confirm({
      title: 'Are you sure you want to delete your account?',
      content: (
        <Form
          ref={formRef}
          name="userDeleteConfirm"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
        </Form>
          ),
          okButtonProps: { type: "primary", ghost: true, danger: true },
          cancelButtonProps: { type: "primary", ghost: true },
      onOk() {
        return new Promise((resolve, reject) => {
          formRef.current
            .validateFields()
            .then(async (values) => {
              setIsLoading(true);
              try {
                await dispatch(deleteUser(values));
                message.success('Account successfully deleted');
                await dispatch(logoutUser()); 
                navigate('/'); 
                resolve();
              } catch (err) {
                console.error(err);
                if (err.status === 401) {
                  message.error('Incorrect username or password');
                } else {
                  message.error('An error occurred. Please try again later.');
                }
                reject();
              } finally {
                setIsLoading(false);
              }
              
            })
            .catch((info) => {
              console.error('Validate Failed:', info);
              reject();
            });
        });
      },
    });
  };

  return (
      <Content className="px-0 md:px-12">
        <Breadcrumb className="my-4 sm: ml-4">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>My account</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex justify-center h-full mt-12">
        <Form
      {...formItemLayout}
      className="max-w-md sm:max-w-xl lg:w-full"
        form={form}
        onFieldsChange={handleFieldChange}
        onFinish={handleFormSubmit}
      >
      <Form.Item label="Username" name="username">
        <Input
          disabled={fieldsDisabled.username}
          className="addon-after:cursor-pointer"
          addonAfter={<CloseOutlined onClick={() => toggleFieldDisabled('username')} />}
        />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input.Password
          disabled={fieldsDisabled.password}
          className="addon-after:cursor-pointer"
          addonAfter={<CloseOutlined onClick={() => toggleFieldDisabled('password')} />}
        />
      </Form.Item>
      <Form.Item label="First Name" name="firstname">
        <Input
          disabled={fieldsDisabled.firstname}
          className="addon-after:cursor-pointer"
          addonAfter={<CloseOutlined onClick={() => toggleFieldDisabled('firstname')} />}
        />
      </Form.Item>
      <Form.Item label="Last Name" name="lastname">
        <Input
          disabled={fieldsDisabled.lastname}
          className="addon-after:cursor-pointer"
          addonAfter={<CloseOutlined onClick={() => toggleFieldDisabled('lastname')} />}
        />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input
          disabled={fieldsDisabled.email}
          className="addon-after:cursor-pointer"
          addonAfter={<CloseOutlined onClick={() => toggleFieldDisabled('email')} />}
        />
      </Form.Item>
      <Form.Item className="col-span-full mb-0">
        <div className="flex justify-between  sm:justify-between lg:justify-center gap-3 px-0.5 md:gap-8 lg:gap-48 lg:ml-52">
          <CustomButton ghost danger type="primary" onClick={handleDeleteUser} loading={isLoading} className="bg-transparent text-primary hover:text-primary-focus focus:ring-0 active:text-primary-press">
            Delete Account
          </CustomButton>
          <CustomButton ghost htmlType="submit" type="primary" loading={isLoading} className="bg-transparent text-primary hover:text-primary-focus focus:ring-0 active:text-primary-press">
            Submit
          </CustomButton>
        </div>
      </Form.Item>
      <Divider className="border-gray-300" />
    </Form>
  </div>
</Content>

  );
};

export default Account;
