import { css, keyframes } from "@emotion/react";

const spin = keyframes`
    from { --angle: 0deg; }
    to { --angle: 360deg; }
`;

export const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 20px;
`;

export const card = css`
    position: relative;
    width: 100%;
    max-width: 420px;
    padding: 40px;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
    }

    &::before {
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: 22px;
        padding: 2px; 
        background: conic-gradient(from var(--angle), transparent 70%, #00f0ff, #ff0055);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.5s ease;
        animation: ${spin} 3s linear infinite;
        pointer-events: none;
    }

    &:hover::before {
        opacity: 1;
    }
`;

export const title = css`
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 10px;
    color: #ffffff;
    letter-spacing: 1px;
`;

export const linkContainer = css`
    text-align: right;
    font-size: 0.9rem;
    
    a {
        color: #00f0ff;
        transition: color 0.3s, text-shadow 0.3s;
        
        &:hover {
            color: #ff0055;
            text-shadow: 0 0 8px rgba(255, 0, 85, 0.6);
        }
    }
`;

export const inputGroup = css`
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
        font-size: 0.9rem;
        color: #a0aab5;
        margin-left: 4px;
    }

    input {
        padding: 14px 16px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #fff;
        font-size: 1rem;
        transition: all 0.3s ease;

        &::placeholder {
            color: rgba(255, 255, 255, 0.3);
        }

        &:focus {
            background: rgba(255, 255, 255, 0.1);
            border-color: #00f0ff;
            box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
        }
    }
`;

export const errorMsg = css`
    color: #ff4d4f;
    font-size: 0.8rem;
    margin-left: 4px;
    margin-top: -2px;
    text-shadow: 0 0 5px rgba(255, 77, 79, 0.4);
`;

export const button = css`
    margin-top: 15px;
    padding: 16px;
    border-radius: 12px;
    background: linear-gradient(135deg, #00f0ff 0%, #0051ff 100%);
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 81, 255, 0.3);
    position: relative;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 50%; height: 100%;
        background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
        transform: skewX(-20deg);
        transition: left 0.5s ease;
    }

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 81, 255, 0.5);
        
        &::after {
            left: 150%;
        }
    }

    &:active:not(:disabled) {
        transform: translateY(1px);
    }

    &:disabled {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.3);
        box-shadow: none;
        cursor: not-allowed;
    }
`;
