import withAuth from '../../components/Hoc/WithAuth'

interface DashboardProps {
    title?: string
}

const Dashboard: React.FC<DashboardProps> = ({ title = 'Dashboard' }) => {
    return (
        <div>
            <h1>{title}</h1>
            {/* Dashboard content */}
        </div>
    )
}

export default withAuth(Dashboard) 