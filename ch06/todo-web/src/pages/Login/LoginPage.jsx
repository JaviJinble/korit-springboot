import { Link } from "react-router";

function LoginPage() {
    const baseUrl = "http://localhost:8080/oauth2/authorization";

    return (
        <>
            <h1>Login</h1>
            <Link to={`${baseUrl}/google`}>google login</Link>
            <Link to={`${baseUrl}/naver`}>naver login</Link>
            <Link to={`${baseUrl}/kakao`}>kakao login</Link>
        </>
    );
}

export default LoginPage;
