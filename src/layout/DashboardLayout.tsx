import React, { useState } from 'react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from "../store/store";
import Icon, { DownOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, Space, theme } from 'antd';
import { BagIcon } from './../components/icons/BagIcon';
import BasketIcon from './../components/icons/BasketIcon';
import GiftIcon from './../components/icons/GiftIcon';
import Home from './../components/icons/Home';
import UserIcon from './../components/icons/UserIcon';
import { useMutation } from '@tanstack/react-query';
import { logout } from './../http/api';

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

const items: MenuItem[] = [
  getItem(<NavLink to={"/"}>Home</NavLink>, '1', <Icon component={Home} />),
  getItem(<NavLink to={"/users"}>Users</NavLink>, '2', <Icon component={UserIcon} />),
  getItem(<NavLink to={"/products"}>Products</NavLink>, '3', <Icon component={BasketIcon} />),
  getItem(<NavLink to={"/sales"}>Sales</NavLink>, '3', <Icon component={BagIcon} />),
  getItem(<NavLink to={"/promo"}>Promo</NavLink>, '4', <Icon component={GiftIcon} />),
];

export const DashboardLayout = () => {

  const { user } = useAuthStore();
  if(user == null){
    return <Navigate to="/auth/login" replace={true}/>
  }

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { removeUser } = useAuthStore();
  const { mutate: mutateLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      removeUser();
      return;
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

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
      <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <h3 style={{ padding: '20px 30px', margin: '0' }}>Clotheer</h3>
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: "0 24px", background: colorBgContainer }}>
          <Flex justify="space-between" align="center" >
            <Badge text={user.role == "admin" ? "Admin" : user?.tenant?.name} status='success'/>
            <Flex align="center" gap={10}>
              <Badge dot={true}>
                <Icon component={BagIcon} />
              </Badge>
              <Dropdown menu={{ items: profileItems }}>
                <Space>
                  <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
                  <DownOutlined />
                </Space>
              </Dropdown>
            </Flex>
          </Flex>
        </Header>
        <Content style={{ margin: '0 16px' }}>
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
