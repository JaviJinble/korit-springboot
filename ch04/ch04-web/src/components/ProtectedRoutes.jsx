import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/authStore";

function ProtectedRoutes() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const isLoggedIn = !!accessToken;

    if(!isLoggedIn) {
        return <Navigate to={"/auth/signin"} replace={true} />
    }

    return <Outlet />
}

export function PublicOnlyRoute() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const isLoggedIn = !!accessToken;

    if (isLoggedIn) {
        return <Navigate to={"/dash"} replace={true} />
    }
    return <Outlet />
}

export default ProtectedRoutes;
