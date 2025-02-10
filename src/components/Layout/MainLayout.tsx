import React, { useState, useEffect } from 'react'
import { Button, Menu, Dropdown, MenuProps } from 'antd'
import type { MenuProps as AntdMenuProps} from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  CaretDownOutlined,
  LogoutOutlined,
  DashboardOutlined,
  AlertOutlined,
  TagOutlined,
  TeamOutlined,
  MobileOutlined,
  EnvironmentOutlined,
  AimOutlined,
  RadiusSettingOutlined,
  HistoryOutlined,
  FormOutlined,
  CheckSquareOutlined,
  KeyOutlined,
  SafetyCertificateOutlined,
  AreaChartOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { removeUserData, removeTokens } from '../../utils/storage'
import './MainLayout.css'

interface MainLayoutProps {
  children: React.ReactNode
  activePage: string
}

// Definisikan type untuk menu items
type MenuItem = Required<MenuProps>['items'][number]

// Menu Items untuk Sidebar
const menuItems: MenuItem[] = [
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
      }
    ]
  },
  {
    key: 'analytics',
    icon: <AreaChartOutlined />,
    label: 'Analytics',
  },
]

// Customer Items untuk Branch Selector
const customerItems: MenuItem[] = [
  {
    key: 'branch-1',
    label: (
      <div className="flex items-center gap-3 p-2">
        <div className="rounded-full bg-primary flex items-center justify-center w-8 h-8">
          <span className="text-sm">B1</span>
        </div>
        <div>
          <div className="font-medium">SubBranch 1</div>
          <div className="text-sm text-gray-500">description</div>
        </div>
      </div>
    ),
  }
]

// Di luar component
const menuPaths = new Map([
  ['dashboard', '/dashboard'],
  ['alert', '/alert'],
  ['users', '/users'],
  ['devices', '/devices'],
  ['sites', '/sites'],
  ['checkpoint', '/checkpoint'],
  ['geofence', '/geofence'],
  ['forms', '/forms'],
  ['task', '/task'],
  ['activity-log', '/activity-log'],
  ['sub-branch', '/setting-sub-branch'],
  ['permission', '/setting-permission'],
  ['label', '/setting-label'],
  ['license', '/setting-license'],
  ['analytics', '/analytics'],
])

export default function MainLayout({ children, activePage }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  // Tambahkan useEffect untuk handle resize window
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true)
      }
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleLogout = () => {
    removeUserData()
    removeTokens()
    navigate('/login')
  }

  const userMenuItems: MenuItem[] = [
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
  ]

  // Tambahkan handler untuk menu click pada mobile
  const handleMenuClick: AntdMenuProps['onClick'] = ({ key }) => {
    const path = menuPaths.get(key.toString())
    if (path) {
      navigate(path)
      // Auto collapse pada mobile setelah menu diklik
      if (window.innerWidth <= 768) {
        setCollapsed(true)
      }
    }
  }

  const getDefaultOpenKeys = (): string[] => {
    const parentMenus = {
      users: 'user-device',
      devices: 'user-device',
      sites: 'site',
      checkpoint: 'site',
      geofence: 'site',
      forms: 'activity',
      task: 'activity',
      'activity-log': 'activity',
      'sub-branch': 'settings',
      permission: 'settings',
      label: 'settings',
      license: 'settings',
    }
    
    return [parentMenus[activePage as keyof typeof parentMenus]].filter(Boolean)
  }

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <div className={`sidebar bg-white ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
        {/* Logo Section */}
        <div className="logo-section flex items-center">
          <div className="flex items-center">
            <span className="text-2xl">🚀</span>
            {!collapsed && <span className="ml-2 text-2xl">Web App</span>}
          </div>
        </div>

        {/* Navigation */}
        <Menu
          mode="inline"
          defaultSelectedKeys={[activePage]}
          defaultOpenKeys={getDefaultOpenKeys()}
          items={menuItems}
          onClick={handleMenuClick}
          inlineCollapsed={collapsed}
          className="border-none"
        />
      </div>

      {/* Overlay - tambahkan onClick untuk collapse */}
      {!collapsed && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Header */}
      <header className={`main-header border-b bg-white ${collapsed ? 'main-header-collapsed' : 'main-header-expanded'}`}>
        <div className="flex justify-between items-center h-full px-6">
          {/* Left Side */}
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="mobile-visible"
            />

            <Dropdown menu={{ items: customerItems }} trigger={['click']}>
              <Button type="text" className="ml-4">
                <span className="hidden sm:inline">Select Branch</span>
                <CaretDownOutlined className="ml-1" />
              </Button>
            </Dropdown>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
              <Button type="text">
                <UserOutlined />
                <span className="ml-2 hidden sm:inline">Admin</span>
                <CaretDownOutlined className="ml-1" />
              </Button>
            </Dropdown>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={`main-content ${collapsed ? 'main-content-collapsed' : 'main-content-expanded'}`}>
        <div className="main-content-inner">
          {children}
        </div>
      </div>
    </div>
  )
}