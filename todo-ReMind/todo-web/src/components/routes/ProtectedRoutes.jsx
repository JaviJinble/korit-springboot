import { Navigate, Outlet } from "react-router";
import { useMe } from "../../hooks/queries/useUser";
import { useSpinnersStore } from "../../store/spinners";

export function ProtectedRoutes() {
    const meQuery = useMe();
    const setLoading = useSpinnersStore((state) => state.setLoading);
    setLoading(meQuery.isLoading);

    if (meQuery.isLoading) {
        return null;
    }

    const isLoggedIn = !!meQuery.data?.success;

    if (!isLoggedIn) {
        return <Navigate to={"/auth/login"} replace={true} />
    }

    return <Outlet />
}

export function PublicOnlyRoute() {
    const meQuery = useMe();
    const setLoading = useSpinnersStore((state) => state.setLoading);
    setLoading(meQuery.isLoading);

    const isLoggedIn = !!meQuery.data?.success;

    if (isLoggedIn) {
        return <Navigate to={"/"} replace={true} />
    }

    return <Outlet />
}
