import { Navigate } from "react-router-dom";
import React from "react";

function ProtectedRoute({isLoggedIn,Children}){
    return isLoggedIn ? Children : <Navigate to="/" replace />;
}
export default ProtectedRoute