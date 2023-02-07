import React, { PropsWithChildren, useReducer } from "react";
import { Breadcrumb, Layout, theme, Button } from "antd";
import Link from "next/link";
import { Logout } from "../apis/firebase";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";

const { Header, Content, Sider } = Layout;

export default function SideBar({ children }: PropsWithChildren) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();
  const { user } = useAuthContext();

  const handleLogout = () => {
    router.push("/home");
    Logout();
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ margin: 0 }}>
        <Button onClick={handleLogout} style={{ margin: 10 }}>
          Logout
        </Button>
        <Link href="/chat">
          <p className="page">User List</p>
        </Link>
        <p className="page">1:1 Chat</p>
        <p className="page">Group Chat</p>
      </Sider>

      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{user?.name}님 안녕하세요!</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              height: "90vh",
              overflowY: "scroll",
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
      <style jsx>{`
        .page {
          color: white;
          padding: 10px 20px;
          cursor: pointer;
        }
      `}</style>
    </Layout>
  );
}
