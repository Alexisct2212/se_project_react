import { Navigate } from "react-router-dom";
import { Children } from "react";

function ProtectedRoute({isLoggedIn,Children}){
if(!isLoggedIn){
    return<Navigate to='/' replace/>
}
return {Children}
}
export default ProtectedRoute