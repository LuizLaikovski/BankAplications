import { Navigate } from "react-router";
import type { JSX } from "react/jsx-dev-runtime";

const ProtectedRoutes = (children: JSX.Element) => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/" replace />

    return children;
}
 
export default ProtectedRoutes;