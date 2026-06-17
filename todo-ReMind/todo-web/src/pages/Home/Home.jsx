import TextButton from "../../components/buttons/TextButton/TextButton";
import Header from "../../components/Header/Header";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import { useMe } from "../../hooks/queries/useUser";
import * as s from "./styles";
function Home() {
    const meQuery = useMe();

    return (
        <div css={s.layout}>
            <Header>
                <h2 css={s.title}>ReMind</h2>
                <div css={s.profile(meQuery.data?.body.profileImage)}></div>
            </Header>
            <div css={s.main}>
                <div css={s.cards}>
                    <SummaryCard color="#0d7ff2" count={5} label="오늘" icon={<svg data-dc-tpl="86" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle data-dc-tpl="87" cx="8" cy="8" r="5.5" stroke="white" stroke-width="1.8"></circle><path data-dc-tpl="88" d="M8 5.5V8.5l2 1.5" stroke="white" stroke-width="1.8" stroke-linecap="round"></path></svg>} />
                    <SummaryCard color="#ff3838" count={6} label="예정" icon={<svg data-dc-tpl="94" width="15" height="15" viewBox="0 0 15 15" fill="none"><rect data-dc-tpl="95" x="1.5" y="2.5" width="12" height="11" rx="2" stroke="white" stroke-width="1.8"></rect><path data-dc-tpl="96" d="M1.5 6.5h12M5 1.5v3M10 1.5v3" stroke="white" stroke-width="1.8" stroke-linecap="round"></path></svg>} />
                    <SummaryCard color="#1c1c1e" count={11} label="전체" icon={<svg data-dc-tpl="102" width="16" height="12" viewBox="0 0 16 12" fill="none"><path data-dc-tpl="103" d="M1.5 2h13M1.5 6h13M1.5 10h9" stroke="white" stroke-width="1.8" stroke-linecap="round"></path></svg>} />
                    <SummaryCard color="#666666" count={3} label="완료됨" icon={<svg data-dc-tpl="109" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle data-dc-tpl="110" cx="8" cy="8" r="6.5" stroke="white" stroke-width="1.8"></circle><path data-dc-tpl="111" d="M4.5 8l2.5 2.5L11.5 5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>} />
                </div>
                <div css={s.listGroup}>
                    <header>
                        <h3>나의 목록</h3>
                        <TextButton>편집</TextButton>
                    </header>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home;
