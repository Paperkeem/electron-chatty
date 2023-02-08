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

  const handleLogout = () => {
    router.push("/home");
    Logout();
  };

  return (
    <Layout style={{ minHeight: "97vh" }}>
      <Sider style={{ margin: 0 }}>
        <Button onClick={handleLogout} style={{ margin: 10 }}>
          Logout
        </Button>
        <Link href="/list">
          <p className="page">User List</p>
        </Link>
        <Link href="/chat">
          <p className="page">My 1:1 Chat List</p>
        </Link>
        <Link href="/group">
          <p className="page">Group Chat</p>
        </Link>
        <Link href="/info">
          <p className="page">Your Infomation</p>
        </Link>
      </Sider>

      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
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
