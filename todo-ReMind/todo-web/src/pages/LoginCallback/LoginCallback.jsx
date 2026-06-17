import { Navigate, useSearchParams } from "react-router";

function LoginCallback() {
    const [ searchParams ] = useSearchParams();
    const accessToken = searchParams.get("accessToken");
    localStorage.setItem("accessToken", accessToken);
    console.log(accessToken)

    return <Navigate to={"/"} replace={true} />
}

export default LoginCallback;
