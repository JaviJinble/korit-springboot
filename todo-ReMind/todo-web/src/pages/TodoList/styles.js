import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;
`;

export const main = css`
    width: 100%;
    height: 647px;
    overflow-y: auto;
    
`;

export const header = (color) => css`
    display: flex;
    gap: 14px;
    padding: 20px 20px 8px;

    & > div:nth-of-type(1) {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 54px;
        height: 54px;
        background-color: ${color};
        overflow: hidden;
        font-size: 26px;
    }

    & > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        justify-content: center;

        & > div:nth-of-type(1) {
            font-size: 26px;
            font-weight: 600;
            color: ${color};
        }

        & > div:nth-of-type(2) {
            font-size: 13px;
            color: #8e8e93;
        }
    }
`;

export const notCompletedUl = css`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0;
    padding: 8px 16px 4px;

    & > li {
        display: flex;
        box-sizing: border-box;
        border-radius: 13px;
        padding: 14px;
        background-color: #ffffff;
        box-shadow: #0000000f 0px 1px 4px;
    }
    `;

export const completedTitle = css`
    padding: 22px 20px 8px;
    font-size: 13px;
    color: #8e8e93;
`;

export const completedUl = css`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0;
    padding: 8px 16px 4px;

    & > li {
        display: flex;
        box-sizing: border-box;
        border-radius: 13px;
        padding: 14px;
        background-color: #ffffff;
        box-shadow: #0000000f 0px 1px 4px;
        
        & > div:nth-of-type(2) {
            color: #c7c7cc;
            text-decoration: line-through;
        }
    }

`;

