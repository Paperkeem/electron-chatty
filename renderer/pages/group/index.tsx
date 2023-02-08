import React, { useEffect, useState } from "react";
import Link from "next/link";
import SideBar from "../../src/components/Sidebar";
import { getGroupList, makeGroupChat } from "../../src/apis/firebase";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

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
      <Button onClick={handleMakeGroup} style={{ marginBottom: "20px" }}>
        새로운 그룹 채팅 생성하기
      </Button>
      <section>
        {groupList?.map((group, idx) => (
          <Link href={`/group/${idx + 1}`} key={idx}>
            <div className="group">
              <span className="icon">
                <UserOutlined style={{ color: "white" }} />
              </span>
              {group}
            </div>
          </Link>
        ))}
      </section>
      <style jsx>
        {`
          .group {
            padding-top: 25px;
            padding-bottom: 25px;
            cursor: pointer;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          }
          .group:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
          .icon {
            padding: 7px;
            margin-right: 7px;
            border-radius: 5px;
            background-color: lightgray;
          }
        `}
      </style>
    </SideBar>
  );
}
