import React from 'react'
import { Button, Checkbox, Form, Input, Typography, message, Alert } from 'antd'
import { useNavigate } from 'react-router-dom'
import MainApi from '../../services/DummyApiService'
import { setUserData, setTokens } from '../../utils/storage'

const { Title } = Typography

interface LoginForm {
  username: string
  password: string
  remember: boolean
}

export default function Login() {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = async (values: LoginForm) => {
    setLoading(true)
    setError(null)
    try {
      const response = await MainApi.auth.login(values.username, values.password)
      setTokens(response.accessToken, response.refreshToken)
      
      const userData = {
        id: response.id,
        username: response.username,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        image: response.image
      }
      setUserData(userData)
      
      message.success('Login successful!')
      navigate('/dashboard')
    } catch (error: any) {
      if (error.response?.data?.message === 'Invalid credentials') {
        setError('Invalid username or password')
        form.setFields([
          {
            name: 'password',
            errors: ['The password you entered is incorrect']
          }
        ])
      } else if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError('An error occurred. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#428cf8' }} className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-[480px]">
        <div className="mb-8">
          <img src="/vite.svg" alt="Logo" className="w-12 h-12" />
        </div>

        <Title level={2} className="mb-8">
          Login To Your Account
        </Title>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-6"
            closable
            onClose={() => setError(null)}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ 
            remember: true,
            username: 'emilys',
            password: 'emilyspass'
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            validateStatus={error ? 'error' : ''}
          >
            <Input 
              size="large" 
              placeholder="Enter your username"
              onChange={() => {
                if (error) setError(null)
                form.setFields([
                  {
                    name: 'password',
                    errors: []
                  }
                ])
              }}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            validateStatus={error ? 'error' : ''}
          >
            <Input.Password 
              size="large" 
              placeholder="Enter your password"
              onChange={() => {
                if (error) setError(null)
              }}
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-6">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember Me</Checkbox>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full"
            >
              Login to Your Account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
} 