import * as s from "./styles";
function SummaryCard({ color, count, label, icon }) {

    return (
        <>
                <div css={s.card(color)}>
                    <div css={s.cardTop}>
                        <div css={s.iconBox}>
                            {icon}
                        </div>
                        <strong>{count}</strong>
                    </div>
                    <span >{label}</span>
                </div>
        </>
    );
}

export default SummaryCard;