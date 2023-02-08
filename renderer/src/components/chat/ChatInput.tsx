import React from "react";
import { SendOutlined } from "@ant-design/icons";

export default function ChatInput({ handleChange, handleSubmit, message }) {
  return (
    <form onClick={handleSubmit}>
      <div className="formWraper">
        <input
          className="input"
          type="text"
          onChange={handleChange}
          name="message"
          value={message || ""}
        />
        <button className="sendbtn" type="submit">
          <SendOutlined />
        </button>
      </div>
    </form>
  );
}
