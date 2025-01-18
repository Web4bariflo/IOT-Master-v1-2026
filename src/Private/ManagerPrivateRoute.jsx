import React from "react";
import { Outlet } from "react-router-dom";
import ManagerNav from "../manager/ManagerNav"
import ManagerSidebar from "../manager/ManagerSidebar"

const ManagerPrivateRoute = () => {
  const auth = { token: localStorage.getItem("auth") };
  const tokenObject = JSON.parse(auth.token);
  console.log(tokenObject?.category);

  return ["manager", "owner"].includes(tokenObject?.category) ? (
    <div className="flex flex-col h-screen">
      <ManagerNav/>
      <div className="flex flex-1">
        <ManagerSidebar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <h2>Manager side</h2>
  );
};

export default ManagerPrivateRoute;
