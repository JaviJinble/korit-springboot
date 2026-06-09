import { css } from "@emotion/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";

function OAuth2Redirect() {
    const location = useLocation();
    const navigate = useNavigate();
    const saveToken = useAuthStore((state) => state.saveToken);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get("accessToken");

        if (!accessToken) {
            alert("소셜 로그인 토큰을 받지 못했습니다.");
            navigate("/auth/signin", { replace: true });
            return;
        }

        saveToken(accessToken);
        navigate("/dash", { replace: true });
    }, [location.search, navigate, saveToken]);

    return (
        <main css={container}>
            <p>소셜 로그인을 처리하는 중입니다...</p>
        </main>
    );
}

const container = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    color: #e2e8f0;
`;

export default OAuth2Redirect;
