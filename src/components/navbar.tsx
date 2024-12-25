"use client";
import React from "react";
import { LogoutFn } from "../../actions/auth/logout";

const Navbar = () => {
  const handdlelgoout = () => {
    LogoutFn();
  };
  return <button onClick={handdlelgoout}>Logout</button>;
};

export default Navbar;
