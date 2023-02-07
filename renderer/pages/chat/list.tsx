import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getUserList } from "../../src/apis/firebase";

export default function list() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getUserList().then((res) => console.log(res));
  }, []);
  return (
    <div>
      <Link href="/chat">chatRoom</Link>
      <p>List</p>
    </div>
  );
}
