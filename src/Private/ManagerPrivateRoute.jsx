import React from 'react'
import { Outlet } from 'react-router-dom'

const ManagerPrivateRoute = () => {
    const auth = { token: localStorage.getItem('auth') };
    const tokenObject = JSON.parse(auth.token);
    console.log(tokenObject?.category);
  
    return ["manager", "owner"].includes(tokenObject?.category) ? (
        <Outlet />
      ) : (
        <h2>Manager side</h2>
      );
    
}

export default ManagerPrivateRoute