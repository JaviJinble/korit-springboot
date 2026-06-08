import * as s from "./styles";

function DeepSpaceLayout({ children }) {
    return (
        <div css={s.layoutContainer}>
            <div css={s.layer1}></div>
            <div css={s.layer2}></div>
            <div css={s.layer3}></div>
            
            <div css={s.contentWrapper}>
                {children}
            </div>
        </div>
    );
}

export default DeepSpaceLayout;
