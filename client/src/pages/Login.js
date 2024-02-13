import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // console.log(values);
    try {
      const response = await axios.post("/api/user/login", values);
      if (response.data.success) {
        toast.success(response.data.message);

        toast("redirecting to home page");
        localStorage.setItem("token", response.data.data);
        console.log(response.data.data);
        navigate("/booking");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error("Giriş yapılamadı");
    }
    if (!validateEmail(values.email)) {
      setEmailError("Geçersiz email adresi");
    } else {
      setEmailError("");
    }
  };
  const [emailError, setEmailError] = useState("");
  const [form] = Form.useForm();
  return (
    <div className="auth flex justify-center text-center items-center p-2 h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="auth-form card w-[400px]">
        <h1 className="mt-4 text-xl font-bold">Login</h1>
        <Form layout="vertical" className="m-4" onFinish={onFinish}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Lütfen email adresinizi girin!",
              },
            ]}
            label="Email"
            name="email"
          >
            <Input placeholder="Email" />
          </Form.Item>
          {emailError && <div style={{ color: "red" }}>{emailError}</div>}
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" />
          </Form.Item>
          <Button
            className="primary-button bg-[#211C6A] text-white h-[40px] w-full mt-3 mb-3"
            htmlType="submit"
          >
            Login
          </Button>
          <Link to="/register" className="text-black underline mt-2 ">
            Register
          </Link>
        </Form>
      </div>
    </div>
  );
}
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
export default Login;
