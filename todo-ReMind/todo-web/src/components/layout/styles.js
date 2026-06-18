import { css } from "@emotion/react";

export const rootLayout = css`
    position: relative;
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

export const main = css`
    position: relative;
    display: flex;
    width: 100%;
    flex-grow: 1;
    background-color:  #F5F5FA;
`;

export const modalLayout = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000088;

    @keyframes open {
        from {
            bottom: -100%;
        }

        to {
            bottom: 0;
        }
    }

    & > div {
        position: absolute;
        bottom: 0;
        border-radius: 14px 14px 0 0;
        width: 100%;
        min-height: 200px;
        background-color: #ffffff;
        animation-name: open;
        animation-duration: 0.3s;
        animation-timing-function: ease-out;
        animation-iteration-count: 1;

        & > header {
            display: flex;
            justify-content: center;
            box-sizing: border-box;
            padding: 10px 0 4px;
            height: 19px;

            & > div {
                border-radius: 5px;
                width: 36px;
                height: 5px;
                background-color: #d1d1d6;
            }
        }
    }
`;