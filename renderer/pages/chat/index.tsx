import React, { useEffect, useState } from "react";
import { getMyChatList, getUserList } from "../../src/apis/firebase";
import { useAuthContext } from "../../src/context/AuthContext";
import SideBar from "../../src/components/Sidebar";
import { useRouter } from "next/router";
import { Avatar, Space, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function list() {
  const [chatList, setChatList] = useState([]);
  const { uid, name } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    getMyChatList(uid).then(setChatList);
  }, []);

  const handleGoChatRoom = (roomId, yourName) => {
    router.push({
      pathname: `chat/${roomId}`,
      query: {
        roomId,
        yourName,
      },
    });
  };

  return (
    <SideBar>
      <p>{name}님의 1:1 채팅방 리스트 입니다</p>
      <hr />
      {chatList?.map((chat, index) => {
        const userName = chat[0].split("@")[1];
        const roomId = chat[1];
        return (
          <section className="userBox" key={roomId}>
            <div className="wrapper">
              <Space wrap size={16}>
                <Avatar shape="square" icon={<UserOutlined />} />
              </Space>
              <span className="name">{userName}</span>
            </div>
            <Button onClick={() => handleGoChatRoom(roomId, userName)}>
              채팅방으로 이동하기
            </Button>
          </section>
        );
      })}
    </SideBar>
  );
}
