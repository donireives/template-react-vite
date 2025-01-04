import React, { useEffect } from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { getUserData, removeUserData, removeTokens } from '@/utils/storage';

const { Title } = Typography;

function Home() {
    const navigate = useNavigate();
    const userData = getUserData();

    useEffect(() => {
        if (!userData) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        removeUserData();
        removeTokens();
        navigate('/login');
    };

    if (!userData) return null;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6">
                    <Title level={2}>
                        Welcome, {userData.firstName} {userData.lastName}!
                    </Title>
                    <Button
                        type="primary"
                        danger
                        onClick={handleLogout}
                        className="mt-4"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;