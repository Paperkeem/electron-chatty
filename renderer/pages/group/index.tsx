import React, { useEffect, useState } from "react";
import Link from "next/link";
import SideBar from "../../src/components/Sidebar";
import { getGroupList, makeGroupChat } from "../../src/apis/firebase";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../src/components/ui/LoadingSpinner";

export default function groupchat() {
  const { isLoding, data: groupList } = useQuery(["groupList"], getGroupList, {
    staleTime: 1000 * 60 * 5,
  });

  const queryClicent = useQueryClient();
  const makeGroup = useMutation(
    ({ len }) => {
      makeGroupChat(len);
    },
    {
      onSuccess: () => {
        queryClicent.invalidateQueries(["groupList"]);
      },
    }
  );

  const handleMakeGroup = async () => {
    const len = Number(groupList.length + 1);
    makeGroup.mutate({ len });
  };

  return (
    <SideBar>
      <Button onClick={handleMakeGroup} style={{ marginBottom: "20px" }}>
        새로운 그룹 채팅 생성하기
      </Button>
      <section>
        {isLoding && <LoadingSpinner />}
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
