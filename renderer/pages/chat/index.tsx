import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, theme } from "antd";
import Link from "next/link";
import { onAuth } from "../../src/apis/firebase";

const { Header, Content, Sider } = Layout;

export default function Chat() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    console.log("채팅방 입성");
    onAuth();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ margin: 0 }}>
        <Link href="/home">
          <p className="page">Login Page</p>
        </Link>
        <p className="page">User List</p>
        <p className="page">1:1 Chat</p>
        <p className="page">Group Chat</p>
      </Sider>

      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            Bill is a cat.
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
