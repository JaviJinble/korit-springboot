import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAuthStore from "../store/authStore";

function Oauth2CallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");

        if (!accessToken) {
            navigate("/login", {
                replace: true,
            });
        }
        setAccessToken(accessToken);
        navigate("/", {
            replace: true
        });

    }, []);

    return <></>;
}

export default Oauth2CallbackPage;