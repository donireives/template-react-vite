import MainLayout from '../../components/Layout/MainLayout'
import withAuth from '../../components/Hoc/WithAuth'
import { Typography } from 'antd'

const { Title } = Typography

function Dashboard() {
    return (
        <MainLayout activePage="dashboard">
            <div className="relative bg-white p-6 rounded-lg shadow-sm">
                <Title level={2}>Dashboard</Title>
                <p className="text-gray-600">Welcome to your dashboard!</p>
            </div>
        </MainLayout>
    )
}

export default withAuth(Dashboard) 