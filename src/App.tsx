import { Button, Card, Space, Typography, Input, DatePicker } from 'antd'
import './App.css'

function App() {
  const { Title } = Typography

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Title level={2} className="text-center mb-8">
          Ant Design + Tailwind Demo
        </Title>

        <Space direction="vertical" size="large" className="w-full">
          <Card className="shadow-md">
            <Space direction="vertical" className="w-full">
              <Input placeholder="Masukkan teks" />
              <DatePicker className="w-full" />
              <Space>
                <Button type="primary">Primary Button</Button>
                <Button type="default">Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
              </Space>
            </Space>
          </Card>

          <Card className="shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">Tailwind Card</h3>
                <p className="text-gray-600">
                  Ini adalah contoh penggunaan kelas Tailwind
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">Kombinasi Styling</h3>
                <p className="text-gray-600">
                  Ant Design dan Tailwind bekerja dengan baik bersama
                </p>
              </div>
            </div>
          </Card>
        </Space>
      </div>
    </div>
  )
}

export default App
