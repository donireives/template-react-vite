import React, { useEffect, useState } from 'react';
import { Button, Typography, theme, Dropdown, Space, Menu } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DashboardOutlined,
    LayoutOutlined,
    BgColorsOutlined,
    HistoryOutlined,
    QuestionCircleOutlined,
    SettingOutlined,
    CaretDownOutlined,
    BulbOutlined,
    BulbFilled,
    AlertOutlined,
    MobileOutlined,
    TeamOutlined,
    KeyOutlined,
    TagOutlined,
    SafetyCertificateOutlined,
    EnvironmentOutlined,
    AimOutlined,
    RadiusSettingOutlined,
    FormOutlined,
    CheckSquareOutlined,
    AreaChartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { getUserData, removeUserData, removeTokens } from '@/utils/storage';
import { useTheme } from '@/hooks/useTheme';

const { Title } = Typography;

function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const userData = getUserData();
    const { token: { colorBgContainer } } = theme.useToken();
    const { theme: currentTheme, toggleTheme } = useTheme();

    // Definisikan customerItems di dalam component
    const customerItems = [
        {
            key: 'branch-1',
            label: (
                <div className="flex items-center space-x-3 p-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">B1</span>
                    </div>
                    <div>
                        <div className="font-medium">SubBranch 1</div>
                        <div className="text-xs text-gray-500">42 users</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'branch-2',
            label: (
                <div className="flex items-center space-x-3 p-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">B2</span>
                    </div>
                    <div>
                        <div className="font-medium">SubBranch 2</div>
                        <div className="text-xs text-gray-500">38 users</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'branch-3',
            label: (
                <div className="flex items-center space-x-3 p-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">B3</span>
                    </div>
                    <div>
                        <div className="font-medium">SubBranch 3</div>
                        <div className="text-xs text-gray-500">27 users</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'branch-4',
            label: (
                <div className="flex items-center space-x-3 p-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">B4</span>
                    </div>
                    <div>
                        <div className="font-medium">SubBranch 4</div>
                        <div className="text-xs text-gray-500">35 users</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'branch-5',
            label: (
                <div className="flex items-center space-x-3 p-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">B5</span>
                    </div>
                    <div>
                        <div className="font-medium">SubBranch 5</div>
                        <div className="text-xs text-gray-500">31 users</div>
                    </div>
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: 'view-all',
            label: (
                <div className="text-blue-500 p-2">
                    View all branches
                </div>
            ),
        },
    ];

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: 'alert',
            icon: <AlertOutlined />,
            label: 'Alert',
        },
        {
            key: 'user-device',
            icon: <UserOutlined />,
            label: 'User & Device',
            children: [
                {
                    key: 'users',
                    icon: <TeamOutlined />,
                    label: 'Users',
                },
                {
                    key: 'devices',
                    icon: <MobileOutlined />,
                    label: 'Devices',
                },
            ],
        },
        {
            key: 'site',
            icon: <EnvironmentOutlined />,
            label: 'Site',
            children: [
                {
                    key: 'sites',
                    icon: <EnvironmentOutlined />,
                    label: 'Sites',
                },
                {
                    key: 'checkpoint',
                    icon: <AimOutlined />,
                    label: 'Checkpoint',
                },
                {
                    key: 'geofence',
                    icon: <RadiusSettingOutlined />,
                    label: 'Geofence',
                },
            ],
        },
        {
            key: 'activity',
            icon: <HistoryOutlined />,
            label: 'Activity',
            children: [
                {
                    key: 'forms',
                    icon: <FormOutlined />,
                    label: 'Forms',
                },
                {
                    key: 'task',
                    icon: <CheckSquareOutlined />,
                    label: 'Task',
                },
                {
                    key: 'activity-log',
                    icon: <HistoryOutlined />,
                    label: 'Activity',
                },
            ],
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
            children: [
                {
                    key: 'sub-branch',
                    icon: <TeamOutlined />,
                    label: 'Sub Branch',
                },
                {
                    key: 'permission',
                    icon: <KeyOutlined />,
                    label: 'Permission',
                },
                {
                    key: 'label',
                    icon: <TagOutlined />,
                    label: 'Label',
                },
                {
                    key: 'license',
                    icon: <SafetyCertificateOutlined />,
                    label: 'License',
                },
            ],
        },
        {
            key: 'analytics',
            icon: <AreaChartOutlined />,
            label: 'Analytics',
        },
    ];

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
        <div className="flex h-screen bg-[#f8f9fa] dark:bg-gray-900">
            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-full bg-[#232838] dark:bg-gray-800 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
                {/* Logo */}
                <div className="flex items-center p-4 h-16 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">🚀</span>
                        {!collapsed && <span className="text-xl font-semibold">Web App</span>}
                    </div>
                </div>

                {/* Navigation */}
                <div className="py-4">
                    <div className="px-4 py-2 text-xs text-gray-400 uppercase">
                        {!collapsed && "DATABASE"}
                    </div>
                    
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={menuItems}
                        inlineCollapsed={collapsed}
                        className="bg-transparent border-none"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
                {/* Header */}
                <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-4 fixed right-0 left-0 z-10" 
                    style={{ left: collapsed ? '64px' : '256px' }}>
                    <div className="flex items-center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="text-lg"
                        />
                        <div className="ml-4 flex items-center space-x-1">
                            <span className="text-gray-600">Home</span>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-400">Dashboard</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button type="text" icon={<QuestionCircleOutlined />} />
                        <Button type="text" icon={<SettingOutlined />} />
                        <div className="flex items-center">
                            <Dropdown
                                menu={{ items: customerItems }}
                                trigger={['click']}
                                placement="bottomRight"
                                overlayClassName="w-64"
                            >
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg">
                                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm">T</span>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="text-sm font-medium">Main Brnach</div>
                                        <div className="text-xs text-gray-500">Branch Name A</div>
                                    </div>
                                    <CaretDownOutlined className="text-gray-400" />
                                </div>
                            </Dropdown>
                            <div className="ml-4">
                                <UserOutlined className="text-lg" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="pt-20 px-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 dark:text-gray-200">
                        <Title level={4} className="dark:text-gray-200">Body</Title>
                        {/* Add your content here */}
                    </div>
                </main>
            </div>

            {/* Floating Theme Toggle Button */}
            <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
                <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={currentTheme === 'dark' ? <BulbOutlined /> : <BulbFilled />}
                    onClick={toggleTheme}
                    className="shadow-lg hover:scale-110 transition-transform duration-200"
                    style={{
                        backgroundColor: currentTheme === 'dark' ? '#4B5563' : '#ffffff',
                        borderColor: currentTheme === 'dark' ? '#4B5563' : '#e5e7eb',
                        color: currentTheme === 'dark' ? '#ffffff' : '#000000'
                    }}
                />
            </div>
        </div>
    );
}

export default Dashboard; 