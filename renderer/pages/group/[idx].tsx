import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SideBar from "../../src/components/Sidebar";
import { Input, Button } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { getGroupMsg, setChatMsgInGroup } from "../../src/apis/firebase";
import { useAuthContext } from "../../src/context/AuthContext";

type TGropChat = {
  [key: string]: string;
};

export default function GroupChat() {
  const {
    query: { idx },
  } = useRouter();
  const { uid, name } = useAuthContext();

  const [groupChat, setGroupChat] = useState<any>();
  const [message, setMessage] = useState("");

  useEffect(() => {
    getGroupMsg(idx).then(setGroupChat);
  }, []);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }
    setMessage(null);
    await setChatMsgInGroup(idx, uid, name, message);
    getGroupMsg(idx).then(setGroupChat);
  };

  return (
    <SideBar>
      <p>그룹 채팅방 {idx}</p>
      <hr />
      {groupChat?.map((chat) => (
        <>
          <p>{chat.message}</p>
          <p>{chat.name}</p>
        </>
      ))}

      <form onClick={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="message"
          value={message || ""}
        />
        <button type="submit">
          <SendOutlined />
        </button>
        {/* <Input
          onChange={handleChange}
          name="message"
          value={message || ""}
          style={{ width: "calc(100% - 50px)" }}
          placeholder="보내실 메세지를 입력해주세요."
        />
        <Button
          type="primary"
          disabled
          style={{ width: "50px", backgroundColor: "gray" }}
        >
          <SendOutlined />
        </Button> */}
      </form>

      <style>{`
      .enter{
        font-size:2rem;
      }
      `}</style>
    </SideBar>
  );
}
