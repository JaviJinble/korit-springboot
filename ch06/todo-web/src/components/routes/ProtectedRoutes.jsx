import { Navigate, Outlet } from "react-router";
import { useMe } from "../../hooks/queries/useUser";

export function ProtecctedRoutes() {
    const accessToken = localStorage.getItem("accessToken");
    const meQuery = useMe();

    if (!accessToken) {
        return <Navigate to="/auth/login" replace={true} />;
    }

    if (meQuery.isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!meQuery.data?.success) {
        return <Navigate to="/auth/login" replace={true} />;
    }

    return <Outlet />;
}

export function PublicOnlyRoute() {
    const accessToken = localStorage.getItem("accessToken");
    const meQuery = useMe();

    if (!accessToken) {
        return <Outlet />;
    }

    if (meQuery.isLoading) {
        return <h1>Loading...</h1>;
    }

    if (meQuery.data?.success) {
        return <Navigate to="/" replace={true} />;
    }

    return <Outlet />;
}
