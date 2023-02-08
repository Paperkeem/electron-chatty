import React from "react";
import SideBar from "../../src/components/Sidebar";
import { useAuthContext } from "../../src/context/AuthContext";

export default function index() {
  const { uid, email, name } = useAuthContext();
  return (
    <SideBar>
      <p>별명 : {name}</p>
      <hr />
      <p>이메일 : {email}</p>
      <hr />
      <p>아이디 고유 번호 : {uid}</p>
      <hr />
    </SideBar>
  );
}
