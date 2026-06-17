import * as s from "./styles";
function TextButton({ children, onClick, disabled, weight }) {

    return (
        <>
            <button css={s.button(weight)} onClick={onClick} disabled={disabled}>
                {children}
            </button>
        </>
    )
}

export default TextButton;