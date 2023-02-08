import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { logInEmail } from "../src/apis/firebase";

export type User = {
  email: string;
  name?: string;
  password: string;
};

export default function Home() {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    logInEmail(user.email, user.password)
      .then(() => {
        router.push("/list");
        setUser({ email: "", password: "" });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div style={{ width: "100vw" }}>
        <h1 style={{ textAlign: "center" }}>Hello,</h1>
        <h1 style={{ textAlign: "center" }}>Chatty!</h1>

        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: "0 auto" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="아이디"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              name="email"
              onChange={handleChange}
              value={user?.email || ""}
            />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              name="password"
              onChange={handleChange}
              value={user?.password || ""}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSubmit}
              style={{ width: "100%" }}
            >
              Log in
            </Button>

            <Link href="/signIn">
              <span style={{ color: "gray", cursor: "pointer" }}>
                /아이디가 없다면? 회원 가입 페이지로/
              </span>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
