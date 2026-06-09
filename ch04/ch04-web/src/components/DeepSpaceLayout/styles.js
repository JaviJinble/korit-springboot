import { css, keyframes } from "@emotion/react";

const generateStars = (count, size) => {
    let stars = [];
    for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        stars.push(`${x}px ${y}px #FFF`);
    }
    return stars.join(', ');
};

const stars1 = generateStars(700);
const stars2 = generateStars(200);
const stars3 = generateStars(100);

const animStar = keyframes`
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(-2000px);
    }
`;

export const layoutContainer = css`
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
`;

export const contentWrapper = css`
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

export const layer1 = css`
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: ${stars1};
    animation: ${animStar} 50s linear infinite;

    &:after {
        content: " ";
        position: absolute;
        top: 2000px;
        width: 1px;
        height: 1px;
        background: transparent;
        box-shadow: ${stars1};
    }
`;

export const layer2 = css`
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: ${stars2};
    animation: ${animStar} 100s linear infinite;

    &:after {
        content: " ";
        position: absolute;
        top: 2000px;
        width: 2px;
        height: 2px;
        background: transparent;
        box-shadow: ${stars2};
    }
`;

export const layer3 = css`
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: ${stars3};
    animation: ${animStar} 150s linear infinite;

    &:after {
        content: " ";
        position: absolute;
        top: 2000px;
        width: 3px;
        height: 3px;
        background: transparent;
        box-shadow: ${stars3};
    }
`;
