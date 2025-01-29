import React, { useEffect, useState } from 'react';
import { Button, Typography, theme, Dropdown, Space, Menu } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DashboardOutlined,
    HistoryOutlined,
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
    LogoutOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { getUserData, removeUserData, removeTokens } from '@/utils/storage';
import { useTheme } from '@/hooks/useTheme';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Dashboard.css';
import { useThemeClass } from '@/hooks/useThemeClass';

const { Title } = Typography;

// Tambahkan CSS untuk sidebar
const sidebarStyle = {
    width: '256px',
    minHeight: '100vh',
    transition: 'width 0.3s ease'
};

const collapsedSidebarStyle = {
    width: '80px',
    minHeight: '100vh',
    transition: 'width 0.3s ease'
};

const mainContentStyle = {
    marginLeft: '256px',
    transition: 'margin-left 0.3s ease'
};

const collapsedMainContentStyle = {
    marginLeft: '80px',
    transition: 'margin-left 0.3s ease'
};

function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const userData = getUserData();
    const { token: { colorBgContainer } } = theme.useToken();
    const { theme: currentTheme, toggleTheme } = useTheme();
    const { getTextClass, getBgClass, getTextMutedClass } = useThemeClass();

    // Definisikan URL tile untuk light dan dark mode
    const mapTiles = {
        dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    };

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

    const handleLogout = () => {
        removeUserData();
        removeTokens();
        navigate('/login');
    };

    // Tambahkan items untuk user dropdown
    const userMenuItems = [
        {
            key: 'profile',
            label: 'My Profile',
            icon: <UserOutlined />,
            onClick: () => navigate('/profile')
        },
        {
            type: 'divider'
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: handleLogout
        }
    ];

    useEffect(() => {
        if (!userData) {
            navigate('/login');
        }
    }, [navigate]);

    if (!userData) return null;

    return (
        <div className="min-vh-100">
            {/* Sidebar */}
            <div 
                className="position-fixed top-0 start-0 bg-dark text-white border-end border-secondary" 
                style={collapsed ? collapsedSidebarStyle : sidebarStyle}
            >
                {/* Logo */}
                <div className="d-flex align-items-center p-3 border-bottom border-secondary">
                    <div className="d-flex align-items-center">
                        <span className="fs-4">🚀</span>
                        {!collapsed && <span className="ms-2 fs-4">Web App</span>}
                    </div>
                </div>

                {/* Navigation */}
                <div className="py-3">
                    {!collapsed && (
                        <div className="px-3 py-2 text-uppercase small text-muted">
                            DATABASE
                        </div>
                    )}
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={menuItems}
                        inlineCollapsed={collapsed}
                        className="border-0"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div style={collapsed ? collapsedMainContentStyle : mainContentStyle}>
                {/* Header */}
                <nav className={`navbar navbar-expand-lg fixed-top border-bottom border-secondary ${currentTheme === 'dark' ? 'bg-dark' : 'bg-white'}`}
                    style={collapsed ? collapsedMainContentStyle : mainContentStyle}>
                    <div className="container-fluid">
                        <div className="d-flex align-items-center">
                            <Button
                                type="text"
                                icon={collapsed ? 
                                    <MenuUnfoldOutlined className={getTextClass()} /> : 
                                    <MenuFoldOutlined className={getTextClass()} />
                                }
                                onClick={() => setCollapsed(!collapsed)}
                                className="fs-5"
                            />
                            <div className="ms-3">
                                <span className={getTextClass()}>Dashboard</span>
                                <span className="text-muted mx-2">/</span>
                                <span className="text-muted">Dashboard</span>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <Button
                                type="text"
                                icon={<QuestionCircleOutlined className={getTextClass()} />} 
                            />
                            <Button 
                                type="text" 
                                icon={currentTheme === 'dark' ? 
                                    <BulbOutlined className="text-white" /> : 
                                    <BulbFilled className="text-dark" />
                                }
                                onClick={toggleTheme}
                            />
                            <Button type="text" 
                                icon={<SettingOutlined className={getTextClass()} />} 
                            />
                            <Dropdown
                                menu={{ items: customerItems }}
                                trigger={['click']}
                                placement="bottomRight"
                            >
                                <div className="d-flex align-items-center gap-2 cursor-pointer">
                                    <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center" 
                                        style={{width: '32px', height: '32px'}}>
                                        <span className="text-white">T</span>
                                    </div>
                                    <div className="d-none d-md-block">
                                        <div className={`small fw-medium ${getTextClass()}`}>
                                            Main Branch
                                        </div>
                                        <div className={getTextMutedClass()}>
                                            Branch Name A
                                        </div>
                                    </div>
                                    <CaretDownOutlined className={getTextClass()} />
                                </div>
                            </Dropdown>
                            <Dropdown
                                menu={{ items: userMenuItems }}
                                trigger={['click']}
                                placement="bottomRight"
                            >
                                <div className="ms-3 cursor-pointer">
                                    <UserOutlined className={`fs-5 ${getTextClass()}`} />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className={`pt-5 mt-4 px-4 min-vh-100 ${currentTheme === 'dark' ? 'bg-dark text-white' : 'bg-light'}`}>
                    <div className={`rounded shadow ${currentTheme === 'dark' ? 'bg-darker' : 'bg-white'}`}>
                        {/* Map Header */}
                        <div className="d-flex align-items-center justify-content-between p-4 border-bottom border-secondary">
                            <div className="d-flex gap-3">
                                <button className="btn btn-primary">ACTIVITY</button>
                                <button className="btn btn-secondary">MAPS</button>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <div className={getTextClass()}>Tracking</div>
                                <button className="btn btn-secondary">FILTER</button>
                                <div className="d-flex align-items-center gap-2">
                                    <span className={getTextClass()}>Active Users</span>
                                    <span className="badge bg-secondary">1</span>
                                </div>
                            </div>
                        </div>

                        {/* Map Container */}
                        <div className="position-relative" style={{height: '80vh'}}>
                            <div className="position-absolute top-0 start-0 mt-4 ms-4 z-3 d-flex gap-2">
                                <button className="btn btn-primary">Map</button>
                                <button className="btn btn-secondary">Satellite</button>
                            </div>
                            
                            <MapContainer 
                                center={[-6.2088, 106.8456]} 
                                zoom={5} 
                                className="h-100 w-100"
                                zoomControl={false}
                            >
                                <TileLayer
                                    url={currentTheme === 'dark' ? mapTiles.dark : mapTiles.light}
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                />
                                <Marker position={[-6.2088, 106.8456]}>
                                    <Popup>Test Location</Popup>
                                </Marker>
                            </MapContainer>

                            {/* Active Users Sidebar */}
                            <div className="position-absolute top-0 end-0 mt-5 me-4 p-4 rounded shadow-lg" 
                                style={{
                                    width: '16rem',
                                    zIndex: 1000,
                                    backgroundColor: currentTheme === 'dark' ? '#1a1f2c' : 'white'
                                }}>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-secondary rounded-circle" style={{width: '32px', height: '32px'}}></div>
                                    <div>
                                        <div className={getTextClass()}>Test2</div>
                                        <div className={getTextMutedClass()}>
                                            Last Login: 2025-01-10 11:25:14
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard; 