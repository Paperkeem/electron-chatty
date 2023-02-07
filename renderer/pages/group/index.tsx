import React from "react";
import SideBar from "../../src/components/Sidebar";
import { Button } from "antd";
import { getGroupList, onAuth } from "../../src/apis/firebase";

export default function groupchat() {
  const handleMakeGroup = () => {
    getGroupList().then(console.log);
    location.reload();
  };

  return (
    <SideBar>
      <p>그룹 채팅방입니다.</p>
      <Button onClick={handleMakeGroup}>그룹 채팅 만들기</Button>
    </SideBar>
  );
}
