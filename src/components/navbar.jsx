import React, { useState } from "react";
import PP from "../assets/pp.png";
import { Link } from "react-router-dom";

function Navbar({open, setOpen}) {
  const username = localStorage.getItem("username");

  return (
    <>
      {/* Sidebar */}
         <nav className={`${open ? "w-64" : "w-0"} sticky top-0 h-screen overflow-y-auto transition-all duration-300 overflow-x-hidden bg-slate-900 text-white flex-shrink-0`}>   
        <div className="flex flex-col gap-6 mt-20 ml-5">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/subscription">Subscription Plan</Link>
        </div>

        <div className="flex items-center gap-3 absolute bottom-2 ml-3">
          <img src={PP} alt="pp" className="w-10 h-10 rounded-full " />
          <p className="font-semibold">{username}</p>
        </div>
      </nav>
    </>
  );
}

export default Navbar;