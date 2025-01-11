import React from 'react'
import { Outlet } from 'react-router-dom'

const AquaPrivateRoute = () => {
  const auth = { token: localStorage.getItem('auth') };
  const tokenObject = JSON.parse(auth.token);
  console.log(tokenObject?.category);

  return tokenObject?.category === "master" ? (<Outlet/>) : (<h2>Aqua login</h2>);
};

export default AquaPrivateRoute