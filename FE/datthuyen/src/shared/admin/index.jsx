import React, { useState, useEffect } from "react";
import logo from "../../assets/img/black_logo.webp";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  ContainerOutlined,
  AppstoreOutlined,
  AuditOutlined,
  HomeOutlined,
  ExceptionOutlined ,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  DockerOutlined
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Layout, Menu, Modal, theme, Tooltip } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
  { label: "Home", key: "1", icon: <HomeOutlined />, link: "/admin" },
  {
    label: "Quản lý nhân viên",
    key: "2",
    icon: <UserOutlined />,
    link: "/admin/staff",
  },
  {
    label: "Quản lý khách hàng",
    key: "3",
    icon: <UserOutlined />,
    link: "/admin/customer",
  },
  {
    label: "Tài khoản",
    key: "TK_sub1",
    icon: <UserOutlined />,
    children: [
      { label: "Quản lý tài khoản", key: "4", link: "/admin/account" },
      { label: "Tài khoản hiện tại", key: "5" },
      {
        label: "Đăng xuất",
        key: "6",
        onClick: () => {
          Modal.confirm({
            title: "Bạn có muốn đăng xuất không?",
            onOk() {
              // Chuyển trang khi đăng xuất
              window.location.href = "/";
            },
          });
        },
      },
    ],
  },
  {
    label: "Quản lý bài viết",
    key: "sub2",
    icon: <ExceptionOutlined />,
    children: [
      { label: "Bài viết", key: "7" },
      { label: "Giới thiệu thuyền", key: "8", link: "/admin/introduceBoat" },
    ],
  },

  {
    label: "Quản lý thuyền",
    key: "9",
    icon: <DockerOutlined />,
    link: "/admin/boat",
  },
  {
    label: "Quản lý phòng",
    key: "10",
    icon: <AppstoreOutlined />,
    link: "/admin/room",
  },
  {
    label: "Quản lý chủ sở hữu",
    key: "11",
    icon: <TeamOutlined />,
    link: "/admin/owner",
  },
  {
    label: "Quản lý đặt thuyền",
    key: "14",
    icon: <AuditOutlined />,
    link: "/admin/booking",
  },
  {
    label: "Quản lý địa điểm",
    key: "12",
    icon: <EnvironmentOutlined />,
    link: "/admin/location",
  },
  {
    label: "Quản lý lịch trình",
    key: "13",
    icon: <ContainerOutlined />,
    link: "/admin/trip",
  },
];

const App = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Sử dụng hook useNavigate
  const user = JSON.parse(sessionStorage.getItem("user"));
  // console.log(user.account.Name);

  const [selectedKey, setSelectedKey] = useState(() => {
    // Tìm key của menu item dựa trên đường dẫn hiện tại
    const matchedItem =
      menuItems.find((item) => item.link === location.pathname) ||
      menuItems
        .flatMap((item) => item.children || [])
        .find((child) => child.link === location.pathname);

    return matchedItem ? matchedItem.key : "1"; // Mặc định về Home nếu không tìm thấy
  });

  const [selectedLabel, setSelectedLabel] = useState(() => {
    const item =
      menuItems.find((i) => i.key === selectedKey) ||
      menuItems
        .flatMap((i) => i.children || [])
        .find((c) => c.key === selectedKey);
    return item ? item.label : "Home";
  });
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // tìm kiếm key để cập nhật selectedKey và selectedLabel
  const handleMenuClick = (key) => {
    const item =
      menuItems.find((i) => i.key === key) ||
      menuItems.flatMap((i) => i.children || []).find((c) => c.key === key);
    if (item) {
      setSelectedLabel(item.label);
      setSelectedKey(key);
    }
    switch (key) {
      default:
        // Điều hướng đến link nếu tồn tại
        if (item.link) {
          navigate(item.link);
        }
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Link to="/user/home">
          <img
            src={logo}
            alt="logo"
            style={{ width: "100%", padding: "10px" }}
          />
        </Link>

        <Menu
          selectedKeys={[selectedKey]}
          theme="dark"
          mode="inline"
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Tooltip title="Thông báo">
              <BellOutlined
                style={{ fontSize: "30px", marginRight: "30px", color: "blue" }}
              />
            </Tooltip>

            <Tooltip title="Xem thông tin cá nhân">
              <Avatar
                icon={<UserOutlined />}
                style={{ marginRight: "10px", backgroundColor: "green" }}
              />
            </Tooltip>
            <p style={{ marginRight: "20px", fontSize: "20px" }}>
              {" "}
              {user.account.Name}
            </p>

            <Tooltip title="Đăng xuất">
              <LogoutOutlined
                style={{ fontSize: "30px", marginRight: "30px", color: "red" }}
                onClick={() => {
                  Modal.confirm({
                    title: "Bạn có muốn đăng xuất không?",
                    onOk() {
                      // Chuyển trang khi đăng xuất
                      window.location.href = "/";
                    },
                  });
                }}
              />
            </Tooltip>
          </div>
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item />
            <Breadcrumb.Item>{selectedLabel}</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Mixi ViVu ©{new Date().getFullYear()} Created by Vũ Đình Vinh
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
