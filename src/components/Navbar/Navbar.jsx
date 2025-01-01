/** @format */

import React, { useState } from "react";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="pl-10 pr-10 w-full flex items-center justify-between h-[70px] text-white bg-[#947f66]">
      <h2 className="text-2xl font-semibold">Online Market 🛒</h2>
      <div className="flex items-center gap-5">
        <div
          className={`p-[10px] w-[90px] text-center border-2 rounded-md cursor-pointer transition-all text-black duration-300 ${
            !isActive ? "bg-[#f7dfc3] border-white" : "bg-white  border-[#f7dfc3]"
          }`}
          onClick={() => setIsActive(false)}
        >
          <h3>Home</h3>
        </div>

        <div
          className={`p-[11px] text-black text-center border-2 rounded-md cursor-pointer transition-all duration-300 ${
            isActive ? "bg-[#f7dfc3]  border-white" : "bg-white  border-[#f7dfc3]"
          }`}
          onClick={() => setIsActive(true)}
        >
          <h3>Categories</h3>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
