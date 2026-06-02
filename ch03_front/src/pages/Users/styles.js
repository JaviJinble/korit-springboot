import { css } from "@emotion/react";

export const table = css`
    
    height: 700px;
    overflow-y: auto;

    & > table {
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        border-collapse: collapse;
        width: 100%;
    }

    & th, & td {
        border: 1px solid #dbdbdb;
        padding: 5px 10px;
    }
`;