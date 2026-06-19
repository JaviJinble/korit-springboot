import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    box-sizing: border-box;
    padding: 0 20px 12px;
    width: 100%;
    height: 64px;
    background-color: #ffffff;

    & > h4 {
        margin: 0;
        font-size: 17px;
        font-weight: 600;
    }
`;