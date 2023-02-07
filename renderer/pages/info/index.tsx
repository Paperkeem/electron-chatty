import React from "react";
import SideBar from "../../src/components/Sidebar";
import { useAuthContext } from "../../src/context/AuthContext";

export default function index() {
  const { user } = useAuthContext();
  return (
    <SideBar>
      <p>별명 : {user?.name}</p>
      <hr />
      <p>이메일 : {user?.email}</p>
      <hr />
      <p>아이디 고유 번호 : {user?.uid}</p>
      <hr />
    </SideBar>
  );
}
