import React, { useState } from "react";
import Link from "next/link";
import { Button, Form, Input } from "antd";
import { signInEmail, writeUserData } from "../src/apis/firebase";
import { useRouter } from "next/router";
import { User } from "./home";

export default function signIn() {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    signInEmail(user.email, user.password, user.name)
      .then((res) => {
        const {
          user: { uid, email, displayName },
        } = res;
        writeUserData(uid, email, user.name);
        router.push("/list");
        setUser({ email: "", name: "", password: "" });
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div style={{ width: "100vw" }}>
        <h1 style={{ textAlign: "center" }}>Sign In</h1>
        <h1 style={{ textAlign: "center" }}>Here!</h1>

        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: "0 auto" }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="아이디"
            name="useremail"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              name="email"
              onChange={handleChange}
              value={user?.email || ""}
              placeholder="아이디는 {abcd@abcd.abc}의 규칙으로 적어주세요"
            />
          </Form.Item>

          <Form.Item
            label="별명"
            name="username"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              name="name"
              onChange={handleChange}
              value={user?.name || ""}
              placeholder="별명을 적어주세요"
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
              placeholder="비밀번호는 7자리 이상으로 적어주세요"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSubmit}
              style={{ width: "100%" }}
            >
              Sign in
            </Button>

            <Link href="/home">
              <span style={{ color: "gray", cursor: "pointer" }}>
                /아이디가 있다면? 로그인 페이지로/
              </span>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
