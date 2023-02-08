import React, { useEffect, useState } from "react";
import { getUserList } from "../../src/apis/firebase";
import { useAuthContext } from "../../src/context/AuthContext";
import SideBar from "../../src/components/Sidebar";
import { Avatar, Space, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function list() {
  const [userList, setUserList] = useState([]);
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    getUserList().then(setUserList);
  }, []);

  const handleGoChatRoom = () => {};

  return <SideBar>1:1 채팅방 리스트</SideBar>;
}
