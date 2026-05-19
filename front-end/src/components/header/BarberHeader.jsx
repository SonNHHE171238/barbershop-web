// src/components/Header/BarberHeader.jsx
import { Layout, Button, Menu, Space, Avatar, Dropdown } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  BookOutlined,
  UserOutlined,
  StarOutlined,
  BarChartOutlined,
  LogoutOutlined,
  SettingOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const { Header } = Layout;

const BarberHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  // Get current selected menu key based on pathname
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/barber' ||path.includes('/calendar')) return '/barber/calendar';
    if (path.includes('/bookings')) return '/barber/bookings';
    if (path.includes('/absence')) return '/barber/absence';
  
    return '/barber/dashboard';
  };

  const menuItems = [
    // {
    //   key: '/barber/dashboard',
    //   icon: <DashboardOutlined />,
    //   label: 'Dashboard',
    // },
    {
      key: '/barber/calendar',
      icon: <CalendarOutlined />,
      label: 'Lịch làm việc',
    },
    {
      key: '/barber/bookings',
      icon: <BookOutlined />,
      label: 'Quản lý lịch hẹn',
    },
    {
      key: '/barber/absence',
      icon: <ExclamationCircleOutlined />,
      label: 'Quản lý nghỉ phép',
    }
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ cá nhân',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];

  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      handleLogout();
    } else if (key === 'profile') {
      navigate('/barber/profile');
    } else if (key === 'settings') {
      navigate('/barber/settings');
    }
  };

  return (
    <Header style={{
      background: '#fff',
      padding: '0 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Logo and Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <div style={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginRight: '32px',
          color: '#1890ff'
        }}>
          💈 Barber Portal
        </div>

        <Menu
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            border: 'none',
            flex: 1,
            justifyContent: 'flex-start'
          }}
        />
      </div>

      {/* User Info and Actions */}
      <Space>
        <span style={{ color: '#666' }}>
          Xin chào, <strong>{user?.name}</strong>
        </span>

        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: handleUserMenuClick,
          }}
          placement="bottomRight"
          arrow
        >
          <Button type="text" style={{ padding: '4px 8px' }}>
            <Avatar
              size="small"
              icon={<UserOutlined />}
              style={{ marginRight: 8 }}
            />
            <span>{user?.name}</span>
          </Button>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default BarberHeader;
