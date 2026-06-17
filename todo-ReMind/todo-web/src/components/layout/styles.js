import { css } from "@emotion/react";

export const rootLayout = css`
    display: flex;
    flex-direction: column;
    border-radius: 44px;
    width: 390px;
    height: 844px;
    background-color: #fff;
    overflow: hidden;
`;

export const rootHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    box-sizing: border-box;
    padding: 0 28px 8px;
    width: 100%;
    height: 50px;
`;

export const time = css`
    font-size: 15px;
    font-weight: 600;
    line-height: 1;
    cursor: default;
`;

export const iconGroup = css`
    display: flex;
    gap: 5px;
`;