import React, { useEffect, useState } from "react";
import { getUserList } from "../../src/apis/firebase";
import { useAuthContext } from "../../src/context/AuthContext";
import SideBar from "../../src/components/Sidebar";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function list() {
  const [userList, setUserList] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    getUserList().then(setUserList);
  }, []);

  return (
    <SideBar>
      {userList?.map((user, index) => (
        <div
          key={index}
          style={{
            padding: 10,
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            cursor: "pointer",
          }}
        >
          <Space wrap size={16}>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Space>
          <span style={{ paddingLeft: 10 }}>{user.name}</span>
        </div>
      ))}
    </SideBar>
  );
}
