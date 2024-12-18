import Icon, { SettingOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, Space, theme } from 'antd';
import React, { useState } from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from "../store/store";
import { BagIcon } from './../components/icons/BagIcon';
import BasketIcon from './../components/icons/BasketIcon';
import GiftIcon from './../components/icons/GiftIcon';
import Home from './../components/icons/Home';
import UserIcon from './../components/icons/UserIcon';
import { logout } from './../http/api';
import { useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const getMenuItemByUserRole = (role: string) => {
  const baseMenuItems = [
    getItem(<NavLink to={"/"}>Home</NavLink>, 'home', <Icon component={Home} />),
    getItem(<NavLink to={"/products"}>Products</NavLink>, 'product', <Icon component={BasketIcon} />),
    getItem(<NavLink to={"/sales"}>Sales</NavLink>, 'sales', <Icon component={BagIcon} />),
    getItem(<NavLink to={"/promo"}>Promo</NavLink>, 'promo', <Icon component={GiftIcon} />),
  ]

  // add users items if user is admin using splice
  if(role === "admin"){
    baseMenuItems.splice(1, 0, getItem(<NavLink to={"/users"}>Users</NavLink>, 'users', <Icon component={UserIcon} />))
  }

  return baseMenuItems
}

export const DashboardLayout = () => {
  
  const location = useLocation();
  const { pathname } = location;
  const { user, removeUser } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuItem[] = user ? getMenuItemByUserRole(user.role) : [];
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { mutate: mutateLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      removeUser();
      window.location.href = "/auth/login";
    },
  })

  const profileItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Profile',
      extra: '⌘P',
    },
    {
      key: '3',
      label: 'Billing',
      extra: '⌘B',
    },
    {
      key: '4',
      label: 'Settings',
      icon: <SettingOutlined />,
      extra: '⌘S',
    },
    {
      type: 'divider',
    },
    {
      key: '5',
      label: 'Logout',
      extra: '⌘L',
      onClick: () => {
        mutateLogout();
      }
    },
  ];  

  if(!user){
    return <Navigate to={`/auth/login?returnTo=${pathname}`} />
  }
  // find key of active menu item
  const activeMenuItemKey = items.find((item: MenuItem) => item?.key === pathname.split("/")[1])?.key || 'home';
  
  return (
    <div>
      <Layout style={{ maxHeight: '100vh', minHeight: '100vh' }}>
      <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <h3 style={{ padding: '20px 30px', margin: '0' }}>Clotheer</h3>
        <Menu theme="light" defaultSelectedKeys={['home']} selectedKeys={[activeMenuItemKey.toString()]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: "0 24px", background: colorBgContainer }}>
          <Flex justify="space-between" align="center" >
            <Badge text={`You Are ${user?.role == "admin" ? "Admin": user?.role}`} status='success'/>
            <Flex align="center" gap={10}>
              <Badge dot={true}>
                <Icon component={BagIcon} />
              </Badge>
              <Dropdown menu={{ items: profileItems }}>
                <Space>
                  <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}><UserOutlined /></Avatar>
                </Space>
              </Dropdown>
            </Flex>
          </Flex>
        </Header>
        <Content style={{ margin: '16px 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}

          {/* <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div> */}
          <Outlet/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          All Rights Reserved by Clotheer
        </Footer>
      </Layout>
    </Layout>
    </div>
  )
}
