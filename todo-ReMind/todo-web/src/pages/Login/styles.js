import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    box-sizing: border-box;
    padding: 44px 38px 40px;
    background: linear-gradient(160deg, rgb(12, 20, 69) 0%, rgb(26, 58, 107) 50%, rgb(15, 23, 42) 100%);
`;

export const main = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;
export const buttonGroup = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

export const loginButton = (color) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 16px;
    width: 100%;
    height: 52px;
    background-color:  ${color};
    color: #111827;
    font-weight: 700;
    text-decoration: none;
`;
