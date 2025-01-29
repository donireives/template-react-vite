import React from 'react';
import { Card, Form, Input, Button, Typography, App as AppAntd } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import MainApi from '@/services/mainApiServices/MainApi';
import { useNavigate } from 'react-router';
import { setUserData, setTokens } from '@/utils/storage';

const { Title } = Typography;

function Login() {
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const { message } = AppAntd.useApp();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await MainApi.auth.login(values.username, values.password);
            setTokens(response.accessToken, response.refreshToken);
            
            const userData = {
                id: response.id,
                username: response.username,
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                image: response.image
            };
            setUserData(userData);
            
            message.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            if (error.response?.status === 400) {
                message.error('Invalid credentials. Please check your username and password.');
            } else if (error.response?.data?.message) {
                message.error(error.response.data.message);
            } else {
                message.error('Login failed. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center bg-light p-4">
            <Card className="w-100" style={{ maxWidth: '400px' }}>
                <div className="text-center mb-4">
                    <Title level={2} className="mb-0">
                        Welcome Back
                    </Title>
                    <p className="text-muted">Sign in to your account</p>
                </div>

                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                    initialValues={{ username: 'emilys', password: 'emilyspass' }}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-muted" />}
                            placeholder="Username"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-muted" />}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-100"
                            loading={loading}
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Login;