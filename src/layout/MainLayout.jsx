import React from "react";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div
        className="main-layout-container d-flex justify-content-center align-items-start"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="w-100" style={{ maxWidth: "1200px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
