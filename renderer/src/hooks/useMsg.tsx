import React, { useState } from "react";

export default function useMsg(callback, obj) {
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!message || message.trim() === "") {
      return;
    }
    setMessage(null);
    callback.mutate({ ...obj, message });
  };
  return { message, handleChange, handleSubmit };
}
