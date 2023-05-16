import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../scenes/login/Login";
import { changeUserLogin } from "../redux/authSlice";

const LoginSucces = () => {
  const useLogin = useSelector((state) => state.auth.isLogin);
  const role = JSON.parse(localStorage.getItem("role"));

  const dispatch = useDispatch();

  useEffect(() => {
    if (role === 0 || role === 1) {
      dispatch(changeUserLogin(true));
    } else {
      dispatch(changeUserLogin(false));
    }
  }, [role]);

  return <>{useLogin ? <Outlet></Outlet> : <Login></Login>}</>;
};

export default LoginSucces;
