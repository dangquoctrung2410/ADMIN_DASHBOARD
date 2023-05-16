import React from "react";
import { Button, Form, Input } from "antd";
import axios from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSucces } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { logginSucces as login } from "../../redux/usersSlice";

import "./LoginStyle.css";

const Login = () => {
    const nav = useNavigate();
    const dispath = useDispatch();
    const isLogin = useSelector((state) => state.auth.isLogin);
    console.log(isLogin);

    const onFinish = async (values) => {
        const result = await axios.post(
            "http://localhost:8080/api/user/v1/user-login",
            {
                email: values.email,
                password: values.password,
            }
        );
        console.log(result);
        // console.log("check  result.data.access_token :", result.data.access_token);

        if (result.errCode === 0) {
            // localStorage.setItem("access token", result.data.access_token);
            localStorage.setItem("role", result.user.role);
            localStorage.setItem("infoUser", JSON.stringify(result.user));
            dispath(loginSucces(result.user));
            dispath(login(result.user));
            nav("/");
        } else {
            alert(result.errMessage);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className="form-login">
            <Box
                sx={{
                    padding: 20,
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px",
                }}
                className="form-box"
            >
                <Form
                    name="basic"
                    style={{
                        maxWidth: 600,
                        width: 320,
                        margin: 10,
                        position: "relative",
                    }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item className="title">
                        <h1 className="form-title">LOGIN</h1>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input placeholder="User Name" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            LOGIN
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <div className="form-footer">
                            <div className="go">
                                <i className="fab fa-google"></i> Google
                            </div>
                            <div className="fb">
                                <i className="fab fa-facebook"></i> Facebook
                            </div>
                        </div>
                    </Form.Item>
                </Form>
            </Box>
        </div>
    );
};

export default Login;
