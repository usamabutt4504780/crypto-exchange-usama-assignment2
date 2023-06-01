import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Dragger } = Upload;


const Signup = ({ addUser }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        message.success('Sign up successful')
        addUser(values);
    };

    const validateConfirmPassword = (_, values, callback) => {
        if (values && values !== form.getFieldValue('password')) {
            callback('Passwords do not match');
        } else {
            callback();
        }
    };

    const handleFileUpload = (file) => {
        const allowedExtensions = ['pdf'];
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            // Display error message or show notification that only PDF files are allowed
            message.error('Only PDF files are allowed');
            return Promise.reject();
        }

        // Process the uploaded file
        console.log('Uploaded file:', file);

        // Return a Promise to allow the form submission to proceed
        return Promise.resolve();
    };

    return (
        <div style={{ width: '35%', margin: '50px auto 0 auto', height: '100vh' }}>
            <Form name="signup-form" onFinish={onFinish} form={form}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ]}
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    rules={[
                        { required: true, message: 'Please confirm your password' },
                        { validator: validateConfirmPassword },
                    ]}
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Home Address"
                    rules={[{ required: true, message: 'Please enter your home address' }]}
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="cnicFile"
                    label="Drag to Upload CNIC"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Dragger
                        accept=".jpg,.png,.pdf"
                        beforeUpload={handleFileUpload}
                        multiple={false}
                        showUploadList={false}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </Dragger>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }} wrapperCol={{ offset: 12, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Signup;
