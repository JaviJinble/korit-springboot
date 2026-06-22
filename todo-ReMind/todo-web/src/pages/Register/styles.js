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

export const listGroup = css`
    list-style-type: one;
    margin: 0;
    padding: 0;
    margin-top: 12px;
    border-radius: 14px;
    box-shadow: #0000000f 0px 1px 4px;
    overflow: hidden;

    & > li {
        display: flex;
        align-items: center;
        gap: 14px;
        box-sizing: border-box;
        padding: 14px 16px;
        background-color: #ffffff;

        & > div:nth-of-type(2) {
            flex-grow: 1;
            font-size: 16px;
        }

        & > div:nth-of-type(3) {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            color: #8e8e93;
        }

        & input {
            border: none;
            color: #007aff;
            font-size: 14px;
        }
    }


    & > li:not(li:nth-last-of-type(1)) {
        border-bottom: 1px solid #f1f1f8;
    }
`;

export const iconBox = (color) => css`
    display: flex;
    justify-content: center;
    align-items:  center;
    border-radius: 8px;
    width: 30px;
    height: 30px;
    background-color: ${color};
`;

export const liButton = css`
    cursor: pointer;
`;

export const categorySelectedColor = (color) => css`
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: ${color};
`;

export const toggleCheckBox = css`
    position: relative;
    box-sizing: border-box;
    border-radius: 31px;
    width: 51px;
    height: 31px;
    overflow: hidden;
    cursor: pointer;

    & > input {
        display: none;
    }

    & > div {
        width: 100%;
        height: 100%;
        background-color: #d1d1d6;
        transition: background-color 0.2s ease-in-out;

        & > div {
            transition: left 0.2s ease-in-out;
            position: absolute;
            top: 2px;
            left: 2px;
            border-radius: 50%;
            width: 27px;
            height: 27px;
            background-color: #ffffff;
            box-shadow: #00000033 0px 2px 6px;
        }
    }

    & > input:checked + div {
        background-color: #34c759;
    }

    & > input:checked + div > div {
        left: 22px;
    }    
`;


export const modalLayout = css`
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;

    & > h3 {
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 10px 0 4px;
        width: 100%;
        font-size: 13px;
        font-weight: 500;
        color: #8e8e93;
    }

    & > ul {
        list-style-type: none;
        margin: 0;
        padding: 0;

        & > li {
            display: flex;
            align-items: center;
            gap: 14px;
            border-top: 1px solid #f1f1f8;
            padding: 14px 20px;
            cursor: pointer;
            
            & > div:nth-of-type(2) {
                flex-grow: 1;
            }
        }

    }

    & > button {
        margin: 10px 16px 0px;
        border: none;
        border-radius: 14px;
        padding: 16px;
        font-size: 17px;
        font-weight: 600;
        color: #007aff;
        cursor: pointer;

    }
`;

export const selectedLi = (isSelected) => css`
    background-color: ${isSelected ? "#007aff0f" : "transparent"};
`;

export const modalListIcon = (color) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    background-color: ${color};
    color: #ffffff;
`;

