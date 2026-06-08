import { css } from "@emotion/react";

export const globalStyles = css`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        width: 100%;
        height: 100%;
        font-family: 'Outfit', sans-serif;
        background-color: #050914; /* Deep space background */
        color: #e0e6ed;
        overflow-x: hidden;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        cursor: pointer;
        border: none;
        outline: none;
        font-family: inherit;
    }

    input {
        font-family: inherit;
        outline: none;
    }

    @property --angle {
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
    }

    ::selection {
        background: rgba(0, 240, 255, 0.4);
        color: #ffffff;
        text-shadow: 0 0 8px rgba(0, 240, 255, 0.8);
    }

    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: rgba(5, 9, 20, 0.8);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 4px;
        transition: background 0.3s ease;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #00f0ff, #ff0055);
        box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
    }

    html {
        scroll-behavior: smooth;
    }
`;
