import { Link, useNavigate } from "react-router";
import * as s from "./styles";

function Login() {
    const baseUrl = "http://localhost:8080/oauth2/authorization";

    return (
        <>
            <div css={s.layout}>
                <div css={s.main}>
                    <div>
                        <svg data-dc-tpl="24" width="80" height="80" viewBox="0 0 80 80">
                            <defs data-dc-tpl="25">
                                <linearGradient data-dc-tpl="26" id="logoG" x1="0" y1="0" x2="1" y2="1">
                                    <stop data-dc-tpl="27" offset="0%" stop-color="#60A5FA"></stop>
                                    <stop data-dc-tpl="28" offset="100%" stop-color="#818CF8"></stop>
                                </linearGradient>
                            </defs>
                            <rect data-dc-tpl="29" width="80" height="80" rx="20" fill="url(#logoG)"></rect>
                            <path data-dc-tpl="30" d="M22 42l14 14L58 26" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                        </svg>
                    </div>
                    <h1>ReMind</h1>
                    <p>할 일을 더 스마트하게 관리하세요</p>
                    <div css={s.buttonGroup}>
                        <Link css={s.loginButton("#ffffff")} to={`${baseUrl}/google`} >
                            <svg data-dc-tpl="36" width="20" height="20" viewBox="0 0 24 24">
                                <path data-dc-tpl="37" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path data-dc-tpl="38" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path data-dc-tpl="39" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                <path data-dc-tpl="40" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            <span>Google로 계속하기</span>
                        </Link>
                        <Link css={s.loginButton("#03C75A")} to={`${baseUrl}/naver`} >
                            <svg data-dc-tpl="43" width="20" height="20" viewBox="0 0 20 20"><path data-dc-tpl="44" d="M2 2h5.5l5 8V2H18v16h-5.5l-5-8v8H2V2z" fill="white"></path></svg>
                            <span>Naver로 계속하기</span>
                        </Link>
                        <Link css={s.loginButton("#FEE500")} to={`${baseUrl}/kakao`} >
                            <svg data-dc-tpl="47" width="20" height="20" viewBox="0 0 20 20"><ellipse data-dc-tpl="48" cx="10" cy="9.5" rx="9.5" ry="7.8" fill="#3C1E1E"></ellipse><path data-dc-tpl="49" d="M6 13.5L4 18l5-3.5" fill="#3C1E1E"></path></svg>
                            <span>Kakao로 계속하기</span>
                        </Link>
                    </div>
                </div>
                <footer>
                    <p>KOREA IT ACADEMY BUSAN</p>
                </footer>

                <h1>로그인</h1>
            </div>
        </>
    )
}

export default Login;
