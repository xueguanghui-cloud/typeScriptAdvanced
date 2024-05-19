import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, UnorderedListOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps, theme } from "antd";
import { useLocation, useNavigate, useRoutes } from "react-router";
import routes from "../router";

const { Header, Sider, Content } = Layout;

const LayoutFn: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 菜单处理
  const location = useLocation();
  const naviagte = useNavigate();
  const menuClick: MenuProps["onClick"] = ({ item, key, keyPath, domEvent }) => {
    naviagte(key);
  };

  return (
    <div className="container">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          {!collapsed && <div className="logo-vertical">猫眼电影管理系统</div>}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            onClick={menuClick}
            items={[
              {
                key: "/movie",
                icon: <UnorderedListOutlined />,
                label: "电影列表",
              },
              {
                key: "/movie/add",
                icon: <VideoCameraAddOutlined />,
                label: "添加电影",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {useRoutes(routes)}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutFn;
