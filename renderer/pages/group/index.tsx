import React, { useEffect, useState } from "react";
import SideBar from "../../src/components/Sidebar";
import { Button } from "antd";
import { getGroupList, makeGroupChat, onAuth } from "../../src/apis/firebase";
import Link from "next/link";

export default function groupchat() {
  const [groupList, setGroupList] = useState<string[]>();

  useEffect(() => {
    getGroupList().then(setGroupList);
  }, []);

  const handleMakeGroup = async () => {
    const len = Number(groupList.length + 1);
    await makeGroupChat(len);
    getGroupList().then(setGroupList);
  };

  return (
    <SideBar>
      <Button onClick={handleMakeGroup}>새로운 그룹 채팅 생성하기</Button>
      <section>
        {groupList?.map((group, idx) => (
          <Link href={`/group/${idx + 1}`} key={idx}>
            <div className="group">{group}</div>
          </Link>
        ))}
      </section>
      <style jsx>
        {`
          .group {
            padding-top: 15px;
            padding-bottom: 15px;
          }
          .group:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
        `}
      </style>
    </SideBar>
  );
}
