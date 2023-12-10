import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/header";
import Footer from "../component/footer";
import { useNavigate, useLocation } from "react-router-dom";

const Mainlayout = () => {
  const navigate = useNavigate("");
  const location = useLocation("");

  useEffect(() => {
    const loggedInId = localStorage.getItem("loggedUserId");
    if (!loggedInId) navigate("/");
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Mainlayout;
