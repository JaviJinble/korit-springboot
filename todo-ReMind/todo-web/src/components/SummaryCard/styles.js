import { css } from "@emotion/react";

export const card = (color) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    height: 100px;
    padding: 16px;
    border-radius: 12px;
    background-color: ${color};
    cursor: pointer;

    & > span {
        color: #ffffff;
        font-size: 14px;
        font-weight: 700;
    }
`;

export const cardTop = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    & strong {
        color: #ffffff;
        font-size: 36px;
        font-weight: 800;
        line-height: 1;
    }
`;

export const iconBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.18);;
`;