import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    margin: 30px auto;
    padding: 30px;
    width: 800px;
    border: 1px solid #dbdbdb;
`;

export const title = css`
    margin: 0 0 30px;
    font-size: 32px;
`;

export const form = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const input = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    padding: 10px;
    width: 100%;
    font-size: 15px;
`;

export const buttonBox = css`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    margin-top: 10px;
`;

export const button = css`
    border: 1px solid #dbdbdb;
    padding: 8px 15px;
    background-color: white;
    cursor: pointer;

    &:hover {
        background-color: #eeeeee;
    }
`;