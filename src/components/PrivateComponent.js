import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent=()=>{

    // Check if user is authenticated
    const auth= localStorage.getItem('user');
    return auth?<Outlet />:<Navigate to="/signup"/>
}

export default PrivateComponent
