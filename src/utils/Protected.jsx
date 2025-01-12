import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "../component/admin/Sidebar";
import AdminNavbar from "../component/admin/AdminNavbar";
import UserNavbar from "../component/UserNavbar";
import { isAuth } from "./isAuth";

export function ProtectedRoutes() {
  const location = useLocation();
  const auth = isAuth();

  return auth ? (
    <div className="h-screen">
      <UserNavbar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export function AdminProtectedRoutes({ role }) {
  const location = useLocation();
  const auth = isAuth();

  return (auth && auth.role === role) || auth.role === "staff" ? (
    <div className=" w-full">
      <AdminNavbar />
      <div className="flex w-full overflow-y-hidden">
        <Sidebar />
        <div className="container flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

// export function ProtectedAdmin({ isAuth }) {
//   const location = useLocation();
//   return isAuth !== null && isAuth.role === "admin" ? (
//     <div className="h-screen">
//       <Outlet />
//     </div>
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// }

// export function ProtectedStaff({ isAuth }) {
//   const location = useLocation();
//   return isAuth !== null && isAuth.role === "" ? (
//     <div className="h-screen">
//       <Outlet />
//     </div>
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// }
