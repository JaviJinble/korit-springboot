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
    margin-bottom: 28px;
    gap: 12px;
    padding: 12px 14px 0;
`;

export const main = css`
    box-sizing: border-box;
    padding: 20px 16px 24px;
    height: 647px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;


export const listGroup = (isEdit) => css`

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
            display: flex;
            box-sizing: border-box;
            padding: 13px 16px;
            width: 100%;
            height: 60px;
            background-color: #ffffff;
            cursor: pointer;

            & > div {
                transition: all 0.3s ease-in-out;
                transform: translateX(${isEdit ? "0%" : "-100%"});
                display: flex;
                flex-shrink: 0;
                justify-content: flex-start;
                align-items: center;
                width: ${isEdit ? "40px" : "0px"};
                height: 100%;
                overflow: hidden;

                & > div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    background-color: #ff3b30;
                }
            }


            & > a {
                display: flex;
                align-items: center;
                gap: 13px;
                flex-grow: 1;
                height: 100%;
                width: 100%;
                font-size: 17px;
                font-weight: 600;
                text-decoration: none;
                color: #1c1c1e;
            }
        }

        & > li:not(li:nth-last-of-type(1)) {
            border-bottom: 1px solid #f5f5f7;
            height: 61px;
        }
    }
`;

export const categoryIcon = (color) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-radius: 50%;
    padding-bottom: 4px;
    width: 34px;
    height: 34px;
    background-color: ${color};

`;

export const categoryName = css`
    flex-grow: 1;
`;

export const categoryCount = css`
    display: flex;
    align-items: center;
    gap: 13px;
    color: #8e8e93;
    font-weight: 600;
`;

export const categoryColorLabel = (color) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    background-color: ${color};
    cursor: pointer;

    & > input {
        display: none;
    }

    & > input:checked + div {
        position: absolute;
        box-sizing: border-box;
        border-radius: 50%;
        border: 3px solid #277aee;
        width: 44px;
        height: 44px;
    }
`;

export const modalHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px 16px;
    
    & > h3 {
        margin: 0;
        font-size: 18px;
    }

    & > div {
        padding-bottom: 2px;
        width: 32px;
        height: 32px;
    }
`;

export const modalInput = css`
    display: flex;
    align-items: center;
    gap: 5px;
    box-sizing: border-box;
    margin: 0 16px 16px;
    border-radius: 12px;
    padding: 14px 16px;
    background-color: #f2f2f7;
    

    & > input {
        outline: none;
        border: none;
        flex-grow: 1;
        background-color: transparent;
        font-size: 16px;
        cursor: pointer;


        &::placeholder {
            color: #bbbbbb;
        }
    }

`;

export const madalListTitle = css`
    margin-bottom: 10px;
    padding: 0 16px;
    font-size: 12px;
    font-weight: 600;
    color: #8e8e93;
`;

export const colorGroup = css`
    display: flex;
    gap: 10px;
    padding: 0 16px 14px;
`;

export const iconGroup = css`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0 16px 14px;
`;

export const categoryIconLabel = css`



    & > input {
        display: none;
    }

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        width: 40px;
        height: 40px;
        background-color: #f2f2f7;
        cursor: pointer;
    }

    & > input:checked + div {
        background-color: #007aff1f;
    }
`;

export const modalButtonGroup = (color) => css`
    display: flex;
    gap: 10px;
    padding: 4px 16px 30px;

    & > button {
        flex-grow: 1;
        box-sizing: border-box;
        border: none;
        border-radius: 14px;
        padding: 15px;
        height: 49px;
        font-size: 16px;
        font-weight: 600;
        color: #1c1c1e;
        background-color: #f2f2f7;
        cursor: pointer;
    }

    & > button:nth-of-type(2) {
        color: #ffffff;
        background-color: ${color};
    }
`;
