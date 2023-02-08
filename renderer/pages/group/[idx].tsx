import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import SideBar from "../../src/components/Sidebar";
import { Input, Button } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { getGroupMsg, setChatMsgInGroup } from "../../src/apis/firebase";
import { useAuthContext } from "../../src/context/AuthContext";
import ChatMsg from "../../src/components/chat/ChatMsg";

export default function GroupChat() {
  const {
    query: { idx },
  } = useRouter();
  const { uid, name } = useAuthContext();

  const [groupChat, setGroupChat] = useState<any>();
  const [message, setMessage] = useState("");

  const chatWindowRef = useRef(null);

  useEffect(() => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    console.log(chatWindowRef.current.scrollTop);
    console.log(chatWindowRef.current.scrollHeight);
  }, [groupChat]);

  useEffect(() => {
    getGroupMsg(idx).then(setGroupChat);
  }, []);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || message.trim() === "") {
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

      <section className="chatForm" ref={chatWindowRef}>
        <div className="chatWindow">
          {groupChat?.length === 0 && <p>지금 바로 채팅을 시작해보세요!</p>}
          {groupChat?.map((chat, index) => {
            if (chat.name == name) {
              return (
                <div key={index} className="mychat">
                  <ChatMsg chat={chat} />
                </div>
              );
            } else {
              return (
                <div key={index} className="yourchat">
                  <ChatMsg chat={chat} />
                </div>
              );
            }
          })}
        </div>
      </section>

      <form onClick={handleSubmit}>
        <div className="formWraper">
          <input
            className="input"
            type="text"
            onChange={handleChange}
            name="message"
            value={message || ""}
          />
          <button className="sendbtn" type="submit">
            <SendOutlined />
          </button>
        </div>
      </form>

      <style>{`
      .chatForm{
        border: 0px solid gray;
        min-height: 70vh;
        max-height: 70vh;
        overflow-y: auto;
      }
      .mychat{
        text-align: right;
        margin-bottom: 10px;
      }
      .yourchat {
        margin-bottom: 10px;
      }
      .mychat p, 
      .yourchat p {
        font-size: 0.7rem;
        padding: 3px;
      }
      .mychat span{
        background-color: #192a56;
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
      }
      .yourchat span{
        background-color: #718093;
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
      }

      .formWraper{
        display: flex;
      }
      .input {
        padding: 10px 20px;
        border: 1px solid lightgray;
        border-radius: 20px;
        width: 95%;
        margin-right: 5px;
      }

      .sendbtn {
        padding: 10px 20px;
        border: 1px solid lightgray;
        border-radius: 20px;
        background-color: #192a56;
        color: white;
      }
      `}</style>
    </SideBar>
  );
}
