import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/user/register", values);
      if (response.data.success) {
        toast.success(response.data.message);

        toast("redirecting to login");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
    if (!validateEmail(values.email)) {
      setEmailError("Geçersiz email adresi");
    } else {
      setEmailError("");
    }
  };
  const [form] = Form.useForm();
  const [emailError, setEmailError] = useState("");

  return (
    <div className="auth flex justify-center text-center items-center p-2 h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="auth-form card w-[400px]">
        <h1 className="mt-4 text-xl font-bold">Register</h1>
        <Form className="m-4" layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Lütfen e-posta adresinizi girin!",
              },
              {
                type: "email",
                message: "Geçerli bir e-posta adresi girin!",
              },
              {
                validator: (_, value) =>
                  validateEmail(value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Geçerli bir e-posta adresi girin!")
                      ),
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
            Register
          </Button>
          <Link to="/login" className="text-black underline mt-2 ">
            Login
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
export default Register;
