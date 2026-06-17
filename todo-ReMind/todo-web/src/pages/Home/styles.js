import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;


`;

export const title = css`
    margin: 0;
    font-size: 28px;

`;

export const profile = (url) => css`
    box-shadow: 0 0 3px 3px #dbdbdb;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    background-color: #dbdbdb;
    background-image: url("${url}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
`;

export const cards = css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 12px 14px 0;
`;
export const main = css`
    box-sizing: border-box;
    padding: 20px 16px 24px;
    flex-grow: 1;
`;


export const listGroup = css`

    & > header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 0 2px;

        & > h3 {
            margin: 0;
            font-size: 20px;
        }

    }

    & > ul {
        box-shadow: #0000000f 0px 1px 4px;
        margin: 0;
        padding: 0;
        list-style-type: none;
        border-radius: 14px;
        overflow: hidden;

        & > li {
            box-sizing: border-box;
            padding: 13px 16px;
            height: 60px;
            background-color: #ffffff;
            cursor: pointer;
        }

        & > li:not(li:nth-last-child(1)) {
            border-bottom: 1px solid #f5f5f7;
            height: 61px;
        }
    }
`;