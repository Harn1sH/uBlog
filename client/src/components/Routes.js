import React from "react";
import Post from "../components/Post";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Routes = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default Routes;
