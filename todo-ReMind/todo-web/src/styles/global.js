import { css } from "@emotion/react";

export const global = css`

    @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Thin.woff2') format('woff2');
    font-weight: 100;
    font-display: swap;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraLight.woff2') format('woff2');
        font-weight: 200;
        font-display: swap;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Light.woff2') format('woff2');
        font-weight: 300;
        font-display: swap;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2') format('woff2');
        font-weight: 400;
        font-display: swap;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Medium.woff2') format('woff2');
        font-weight: 500;
        font-display: swap;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-SemiBold.woff2') format('woff2');
        font-weight: 600;
        font-display: swap;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Bold.woff2') format('woff2');
        font-weight: 700;
        font-display: swap;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraBold.woff2') format('woff2');
        font-weight: 800;
        font-display: swap;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Black.woff2') format('woff2');
        font-weight: 900;
        font-display: swap;
    }

    * {
        font-family: 'Pretendard', sans-serif;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        height: 100vh;
    }
    
    body {
        background-color: #111;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #root {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 24px;
        background: linear-gradient(135deg, rgb(10, 10, 10) 0%, rgb(26, 26, 46) 100%);
    }
`