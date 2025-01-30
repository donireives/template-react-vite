import React, { useState, useEffect } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    BulbOutlined,
    BulbFilled,
    SettingOutlined,
    CaretDownOutlined,
    LogoutOutlined,
    DashboardOutlined,
    AlertOutlined,
    TeamOutlined,
    MobileOutlined,
    EnvironmentOutlined,
    AimOutlined,
    RadiusSettingOutlined,
    HistoryOutlined,
    FormOutlined,
    CheckSquareOutlined,
    KeyOutlined,
    TagOutlined,
    SafetyCertificateOutlined,
    AreaChartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { removeUserData, removeTokens } from '@/utils/storage';
import { useTheme } from '@/hooks/useTheme';
import { useThemeClass } from '@/hooks/useThemeClass';
import './MainLayout.css';

// Menu Items untuk Sidebar dengan path
const menuItems = [
    {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        path: '/dashboard'
    },
    {
        key: 'alert',
        icon: <AlertOutlined />,
        label: 'Alert',
        path: '/alert'
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
                path: '/users'
            },
            {
                key: 'devices',
                icon: <MobileOutlined />,
                label: 'Devices',
                path: '/devices'
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
                path: '/sites'
            },
            {
                key: 'checkpoint',
                icon: <AimOutlined />,
                label: 'Checkpoint',
                path: '/checkpoint'
            },
            {
                key: 'geofence',
                icon: <RadiusSettingOutlined />,
                label: 'Geofence',
                path: '/geofence'
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
                path: '/setting-sub-branch'
            },
            {
                key: 'permission',
                icon: <KeyOutlined />,
                label: 'Permission',
                path: '/setting-permission'
            },
            {
                key: 'label',
                icon: <TagOutlined />,
                label: 'Label',
                path: '/setting-label'
            },
            {
                key: 'license',
                icon: <SafetyCertificateOutlined />,
                label: 'License',
                path: '/setting-license'
            }
        ]
    },
    {
        key: 'analytics',
        icon: <AreaChartOutlined />,
        label: 'Analytics',
    },
];

// Customer Items untuk Branch Selector
const customerItems = [
    {
        key: 'branch-1',
        label: (
            <div className="d-flex align-items-center gap-3 p-2">
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
                    <span className="text-white small">B1</span>
                </div>
                <div>
                    <div className="fw-medium">SubBranch 1</div>
                    <div className="small text-muted">42 users</div>
                </div>
            </div>
        ),
    },
    {
        key: 'branch-2',
        label: (
            <div className="d-flex align-items-center gap-3 p-2">
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
                    <span className="text-white small">B2</span>
                </div>
                <div>
                    <div className="fw-medium">SubBranch 2</div>
                    <div className="small text-muted">38 users</div>
                </div>
            </div>
        ),
    },
    {
        key: 'branch-3',
        label: (
            <div className="d-flex align-items-center gap-3 p-2">
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
                    <span className="text-white small">B3</span>
                </div>
                <div>
                    <div className="fw-medium">SubBranch 3</div>
                    <div className="small text-muted">27 users</div>
                </div>
            </div>
        ),
    },
    {
        key: 'branch-4',
        label: (
            <div className="d-flex align-items-center gap-3 p-2">
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
                    <span className="text-white small">B4</span>
                </div>
                <div>
                    <div className="fw-medium">SubBranch 4</div>
                    <div className="small text-muted">35 users</div>
                </div>
            </div>
        ),
    },
    {
        key: 'branch-5',
        label: (
            <div className="d-flex align-items-center gap-3 p-2">
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
                    <span className="text-white small">B5</span>
                </div>
                <div>
                    <div className="fw-medium">SubBranch 5</div>
                    <div className="small text-muted">31 users</div>
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
            <div className="text-primary p-2">
                View all branches
            </div>
        ),
    },
];

function MainLayout({ children, activePage }) {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const { theme: currentTheme, toggleTheme } = useTheme();
    const { getTextClass, getTextMutedClass } = useThemeClass();

    const handleLogout = () => {
        removeUserData();
        removeTokens();
        navigate('/login');
    };

    const handleThemeToggle = () => {
        toggleTheme();
        window.location.reload();
    };

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

    // Sederhanakan handleMenuClick
    const handleMenuClick = ({ key }) => {
        // Cari item menu yang sesuai dengan key
        const findMenuItem = (items) => {
            for (let item of items) {
                if (item.key === key) return item;
                if (item.children) {
                    const found = findMenuItem(item.children);
                    if (found) return found;
                }
            }
            return null;
        };

        const menuItem = findMenuItem(menuItems);
        if (menuItem && menuItem.path) {
            navigate(menuItem.path);
        }
    };

    // Tentukan defaultOpenKeys berdasarkan activePage
    const getDefaultOpenKeys = () => {
        if (['label', 'sub-branch', 'permission', 'license'].includes(activePage)) {
            return ['settings'];
        }
        return [];
    };

    return (
        <div className="min-vh-100">
            {/* Sidebar */}
            <div className={`sidebar bg-dark text-white border-end border-secondary ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
                {/* Logo */}
                <div className="logo-section d-flex align-items-center">
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
                        defaultSelectedKeys={[activePage]}
                        defaultOpenKeys={getDefaultOpenKeys()}
                        style={{
                            backgroundColor: 'transparent'
                        }}
                        onClick={handleMenuClick}
                    />
                </div>
            </div>

            {/* Overlay for mobile */}
            <div 
                className="sidebar-overlay" 
                onClick={() => setCollapsed(true)}
                style={{ display: !collapsed ? 'block' : 'none' }}
            />

            {/* Header */}
            <header className={`main-header border-bottom border-secondary ${currentTheme === 'dark' ? 'bg-dark' : 'bg-white'} ${collapsed ? 'main-header-collapsed' : 'main-header-expanded'}`}>
                <div className="d-flex justify-content-between align-items-center h-100 px-3">
                    {/* Left Side */}
                    <div className="d-flex align-items-center">
                        {/* Toggle Sidebar Button - Selalu tampil */}
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className={`${getTextClass()} mobile-visible`}
                        />

                        {/* Branch Selector Dropdown */}
                        <Dropdown
                            menu={{ items: customerItems }}
                            placement="bottomLeft"
                            trigger={['click']}
                        >
                            <Button
                                type="text"
                                className={`ms-3 ${getTextClass()}`}
                                icon={<SettingOutlined />}
                            >
                                <span className="d-none d-sm-inline">Select Branch</span>
                                <CaretDownOutlined className="ms-1" />
                            </Button>
                        </Dropdown>
                    </div>

                    {/* Right Side Menu Items */}
                    <div className="d-flex align-items-center gap-2">
                        <Button
                            type="text"
                            icon={currentTheme === 'dark' ? <BulbFilled /> : <BulbOutlined />}
                            onClick={handleThemeToggle}
                            className={getTextClass()}
                        />

                        <Dropdown
                            menu={{ items: userMenuItems }}
                            placement="bottomRight"
                            trigger={['click']}
                        >
                            <Button
                                type="text"
                                className={getTextClass()}
                                icon={<UserOutlined />}
                            >
                                <span className="ms-2 d-none d-sm-inline">Admin</span>
                                <CaretDownOutlined className="ms-1" />
                            </Button>
                        </Dropdown>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className={`main-content ${collapsed ? 'main-content-collapsed' : 'main-content-expanded'}`}>
                <main className={`px-3 pt-3 min-vh-100 ${currentTheme === 'dark' ? 'bg-dark text-white' : 'bg-light'}`}>
                    {children}
                </main>
            </div>
        </div>
    );
}

export default MainLayout; 