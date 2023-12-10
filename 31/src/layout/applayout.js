import React from "react";
import { Outlet } from "react-router-dom";

import "./applayout.scss";
import AppMenu from "../component/appmenu";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../component/header2";
import { useEffect } from "react";

const AppLayout = () => {
  const navigate = useNavigate("");
  const location = useLocation("");

  useEffect(() => {
    const loggedInId = localStorage.getItem("loggedUserId");
    if (!loggedInId) navigate("/");
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className="mainAppcontent">
        <AppMenu />
        <Outlet />
      </div>
      <footer className="footerbottom">
        <div className="text-center mx-auto pt-3 pb-4 text-lightblue">
          &copy; Copyright 2023 - Exchange
        </div>
      </footer>
    </>
  );
};

export default AppLayout;
