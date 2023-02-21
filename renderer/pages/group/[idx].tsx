import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import SideBar from "../../src/components/Sidebar";
import { useAuthContext } from "../../src/context/AuthContext";
import ChatMsg from "../../src/components/chat/ChatMsg";
import ChatInput from "../../src/components/chat/ChatInput";
import useGroup from "../../src/hooks/useGroup";
import useScroll from "../../src/hooks/useScroll";
import useMsg from "../../src/hooks/useMsg";

export default function GroupChat() {
  const {
    query: { idx },
  } = useRouter();
  const { uid, name } = useAuthContext();

  const {
    groupQuery: { data: groupChat },
    sendGroupQuery,
  } = useGroup(idx as string);

  const { chatWindowRef } = useScroll(groupChat);
  const { message, handleChange, handleSubmit } = useMsg(sendGroupQuery, {
    idx,
    uid,
    name,
  });

  return (
    <SideBar>
      <p className="chatptag">그룹 채팅방 {idx}</p>
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

      <ChatInput
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        message={message}
      />
    </SideBar>
  );
}
