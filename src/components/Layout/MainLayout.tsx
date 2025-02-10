import React, { useState } from 'react'
import { Button, Menu, Dropdown, MenuProps } from 'antd'
import type { MenuProps as AntdMenuProps} from 'antd'
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
  TagOutlined,
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
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
    children: [
      {
        key: 'label',
        icon: <TagOutlined />,
        label: 'Label',
      }
    ]
  }
]

// Customer Items untuk Branch Selector
const customerItems: MenuItem[] = [
  {
    key: 'branch-1',
    label: (
      <div className="flex items-center gap-3 p-2">
        <div className="rounded-full bg-primary flex items-center justify-center w-8 h-8">
          <span className="text-white text-sm">B1</span>
        </div>
        <div>
          <div className="font-medium">SubBranch 1</div>
          <div className="text-sm text-gray-500">42 users</div>
        </div>
      </div>
    ),
  }
]

// Di luar component
const menuPaths = new Map([
  ['dashboard', '/dashboard'],
  ['alert', '/alert'],
  ['label', '/setting-label'],
])

export default function MainLayout({ children, activePage }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const handleLogout = () => {
    removeUserData()
    removeTokens()
    navigate('/login')
  }

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
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

  const handleMenuClick: AntdMenuProps['onClick'] = ({ key }) => {
    const path = menuPaths.get(key.toString())
    if (path) {
      navigate(path)
    }
  }

  const getDefaultOpenKeys = (): string[] => {
    if (['label', 'sub-branch', 'permission', 'license'].includes(activePage)) {
      return ['settings']
    }
    return []
  }

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <div className={`sidebar ${theme === 'dark' ? 'bg-[#001529]' : 'bg-white'} ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
        {/* Logo Section */}
        <div className="logo-section flex items-center">
          <div className="flex items-center">
            <span className="text-2xl">🚀</span>
            {!collapsed && <span className="ml-2 text-2xl">Web App</span>}
          </div>
        </div>

        {/* Navigation */}
        <Menu
          theme={theme}
          mode="inline"
          defaultSelectedKeys={[activePage]}
          defaultOpenKeys={getDefaultOpenKeys()}
          items={menuItems}
          onClick={handleMenuClick}
          inlineCollapsed={collapsed}
          className="border-none"
        />
      </div>

      {/* Overlay for mobile */}
      {!collapsed && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Header */}
      <header className={`main-header border-b ${theme === 'dark' ? 'bg-[#001529] text-white border-[#303030]' : 'bg-white border-[#f0f0f0]'} ${collapsed ? 'main-header-collapsed' : 'main-header-expanded'}`}>
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
            <Button
              type="text"
              icon={theme === 'dark' ? <BulbFilled /> : <BulbOutlined />}
              onClick={handleThemeToggle}
            />

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
      <div className={`main-content ${theme === 'dark' ? 'dark' : ''} ${collapsed ? 'main-content-collapsed' : 'main-content-expanded'}`}>
        <div className="main-content-inner">
          {children}
        </div>
      </div>
    </div>
  )
}