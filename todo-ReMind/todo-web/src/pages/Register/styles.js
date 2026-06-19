import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    & > main {
        box-sizing: border-box;
        padding: 16px;
    }
`;

export const titleAndMemo = css`
    box-sizing: border-box;
    border-radius: 14px;
    padding: 14px 16px 12px;
    box-shadow: #0000000f 0px 1px 4px;
    background-color: #ffffff;
    overflow: hidden;

    & > input {
        border: none;
        outline: none;
        border-bottom: 1px solid #f1f1f8;
        padding-bottom: 14px;
        width: 100%;
        background-color: transparent;
        font-size: 18px;
        font-weight: 600;
        &::placeholder {
            color: #bbbbbb;
        }
    }

    & > textarea {
        resize: none;
        border: none;
        outline: none;
        width: 100%;
        height: 67px;
        padding-top: 12px;
        background-color: transparent;
        font-size: 15px;
        &::placeholder {
            color: #bbbbbb;
        }

        &::-webkit-scrollbar {
            display: none;
        }
    }
`;