import { useRouter } from "next/router";
import React from "react";
import SideBar from "../../src/components/Sidebar";

export default function GroupChat() {
  const {
    query: { idx },
  } = useRouter();
  return (
    <SideBar>
      <p>그룹 채팅방 {idx}</p>
    </SideBar>
  );
}
