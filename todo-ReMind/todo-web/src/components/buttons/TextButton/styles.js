import { css } from "@emotion/react";

export const button = (weight) => css`
    border: none;
    background-color: transparent;
    color: #007aff;
    font-size: 15px;
    font-weight: ${weight ?? 400};
    cursor: pointer;
`;