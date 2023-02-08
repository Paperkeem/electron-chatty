import React from "react";

export default function ChatMsg({ chat }) {
  return (
    <>
      <p>{chat.name}</p>
      <span>{chat.message}</span>
    </>
  );
}
