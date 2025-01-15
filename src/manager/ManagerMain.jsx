import React,{useEffect} from "react";
import axios from 'axios'
import { Routes, Route, useNavigate} from "react-router-dom";
import ClusterviewDetails from "../manager/ClusterviewDetails";
import SetTime from "./SetTime";
import Nav from "./ManagerNav";
import ManagerSidebar from "./ManagerSidebar";
import Test from "./Test";
import ManagerPrivateRoute from "../Private/ManagerPrivateRoute";
import Economy from "./Economy";

const ManagerMain = () => {
  const BASEURl = process.env.REACT_APP_IP;
  const urlParams = new URLSearchParams(window.location.search);
  const mobno = urlParams.get("mobno");
  const navigate = useNavigate();
  console.log(mobno);

  useEffect(() => {
    if (mobno) {
      const data = {
        Mob: parseInt(mobno),
      };
      axios
        .post(`${BASEURl}/common_login/`, data)
        .then((response) => {
          console.log(response);
          localStorage.setItem("auth", JSON.stringify(response.data));
          navigate(`/manager/`);
        })
        .catch((error) => {
          console.log("There was an error fetching data!", error);
        });
    }
  });

  return (
    <div className="flex flex-col h-screen">
      <Nav />

      <div className="flex flex-1">
        <ManagerSidebar />

        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route element={<ManagerPrivateRoute />}>
              <Route path="/" element={<SetTime />} />
              <Route path="/economy/:id" element={<Economy/>} />
              <Route path="/clusterview/:id" element={<ClusterviewDetails />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ManagerMain;
