import React from "react";
import { Outlet } from "react-router-dom";
import Loader from "./Loader";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";

const AquaPrivateRoute = ({url}) => {
  const auth = { token: localStorage.getItem("auth") };
  console.log(auth)
  const tokenObject =
   JSON.parse(auth.token);
  console.log(tokenObject?.category);
  // const category = "master"

  // return category === "master" ? (
      return tokenObject?.category === "master" ? (
    <div>
      <Nav />
      <div className="App flex">
        <Sidebar url={url} />
        <Outlet />
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default AquaPrivateRoute;
