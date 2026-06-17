import { css } from "@emotion/react";

export const global = css`
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