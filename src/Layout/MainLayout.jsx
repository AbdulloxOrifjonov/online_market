/** @format */

import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-[100%] w-[100%]">
      <div>
        <Navbar />
      </div>
      <div className="max-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
