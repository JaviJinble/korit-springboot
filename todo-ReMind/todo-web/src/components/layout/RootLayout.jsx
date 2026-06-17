import { useEffect, useState } from "react";
import * as s from "./styles";
import { useSpinnersStore } from "../../store/spinners";
import Spinners from "../Spinners/Spinners";

function RootLayout({ children }) {
    const isLoading = useSpinnersStore((state) => state.isLoading);
    
    const [time, setTime] = useState("00:00");

    useEffect(() => {
        setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            if (time !== `${hours}:${minutes}`) {
                setTime(`${hours}:${minutes}`);
            }
        }, 1000);
    }, []);

    return (
        <div css={s.rootLayout}>
            <header css={s.rootHeader}>
                <div css={s.time}>
                    {time}
                </div>
                <div css={s.iconGroup}>
                    <svg data-dc-tpl="8" width="17" height="11" viewBox="0 0 17 11">
                        <rect data-dc-tpl="9" x="0" y="7" width="3" height="4" rx="0.5" fill="#1C1C1E"></rect>
                        <rect data-dc-tpl="10" x="4.5" y="4.5" width="3" height="6.5" rx="0.5" fill="#1C1C1E"></rect>
                        <rect data-dc-tpl="11" x="9" y="2" width="3" height="9" rx="0.5" fill="#1C1C1E"></rect>
                        <rect data-dc-tpl="12" x="13.5" y="0" width="3" height="11" rx="0.5" fill="#1C1C1E"></rect>
                    </svg>
                    <svg data-dc-tpl="13" width="16" height="12" viewBox="0 0 16 12" fill="none">
                        <path data-dc-tpl="14" d="M8 2.5C10.5 2.5 12.7 3.6 14.2 5.3L15.5 3.8C13.6 1.5 10.9 0 8 0S2.4 1.5.5 3.8L1.8 5.3C3.3 3.6 5.5 2.5 8 2.5z" fill="#1C1C1E"></path>
                        <path data-dc-tpl="15" d="M8 5.5C9.7 5.5 11.2 6.3 12.2 7.5L13.5 6C12.1 4.4 10.2 3.3 8 3.3S3.9 4.4 2.5 6L3.8 7.5C4.8 6.3 6.3 5.5 8 5.5z" fill="#1C1C1E"></path>
                        <circle data-dc-tpl="16" cx="8" cy="10.5" r="1.5" fill="#1C1C1E"></circle>
                    </svg>
                    <svg data-dc-tpl="17" width="26" height="12" viewBox="0 0 26 12" fill="none">
                        <rect data-dc-tpl="18" x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke="#1C1C1E" strokeOpacity="0.35"></rect>
                        <rect data-dc-tpl="19" x="2" y="2" width="16" height="8" rx="2" fill="#1C1C1E"></rect>
                        <path data-dc-tpl="20" d="M24 4.5v3a1.5 1.5 0 000-3z" fill="#1C1C1E" fillOpacity="0.4"></path>
                    </svg>
                </div>
            </header>
            <div css={s.main}>
                {isLoading && <Spinners />}
                {children}
            </div>
        </div>
    )
}

export default RootLayout;
