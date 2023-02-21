import React from "react";
import { getMyChatList } from "../../src/apis/firebase";
import { useAuthContext } from "../../src/context/AuthContext";
import SideBar from "../../src/components/Sidebar";
import { useRouter } from "next/router";
import { Avatar, Space, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import LoadingSpinner from "../../src/components/ui/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

export default function list() {
  const { uid, name } = useAuthContext();
  const router = useRouter();

  const { isLoding, data: chatList } = useQuery(
    ["chatList"],
    () => getMyChatList(uid),
    { staleTime: 1000 * 60 * 5 }
  );

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
      {isLoding && <LoadingSpinner />}
      {chatList?.map((chat, index) => {
        const userName = chat[0].split("@")[1];
        const roomId = chat[1];
        return (
          <section className="userBox" key={roomId as string}>
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
