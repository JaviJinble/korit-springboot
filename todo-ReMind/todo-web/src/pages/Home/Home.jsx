import { Link } from "react-router";
import TextButton from "../../components/buttons/TextButton/TextButton";
import Header from "../../components/Header/Header";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import { useCategories, useCategoryColorsAndIcons, useCategoryNotCompletedCount } from "../../hooks/queries/useCategory";
import { useMe } from "../../hooks/queries/useUser";
import * as s from "./styles";
import { useBottomModalStore } from "../../store/modalStore";
import { useState } from "react";

function Home() {
    const meQuery = useMe();
    const categoriesQuery = useCategories();
    const categoryNotCompletedCountQuery = useCategoryNotCompletedCount();

    const setModalOpen = useBottomModalStore((state) => (state.setOpen));
    const setModalChildren = useBottomModalStore(state => (state.setChildren));

    const handleCategoryRegisterOnclick = () => {
        setModalOpen(true);
        setModalChildren(<CategoryRegister />);
    }

    console.log(categoriesQuery.data);

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
                        {
                            categoriesQuery.isLoading
                                ? <></>
                                : (categoriesQuery.data?.body ?? []).map(category => (
                                    <li key={category.categoryId}>
                                        <Link to={`/categories/${category.categoryName}/todos`}>
                                            <div css={s.categoryIcon(category.categoryColor)}>{category.categoryIcon}</div>
                                            <div css={s.categoryName}>{category.categoryName}</div>
                                            <div css={s.categoryCount}>
                                                <span>{
                                                    categoryNotCompletedCountQuery.isLoading ||
                                                    categoryNotCompletedCountQuery.data.body
                                                    .find(count => count.id === category.categoryId)
                                                    .notCompletedCount || "0"
                                                }
                                                </span>
                                                <svg data-dc-tpl="128" width="8" height="13" viewBox="0 0 8 13" fill="none" style={{"margin-left": "4px"}}><path data-dc-tpl="129" d="M1 1l6 5.5L1 12" stroke="#C7C7CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                            </div>
                                        </Link>
                                    </li>
                                ))
                        }
                    </ul>
                    <TextButton onClick={handleCategoryRegisterOnclick}>새로운 목록 추가</TextButton>
                </div>
            </div>
        </div>
    )
}

export default Home;

function CategoryRegister() {
    const colorsAndIconsQuery = useCategoryColorsAndIcons();
    const [ newCategory, setNewCategory ] = useState({
        name: "",
        colorId: 1,
        iconId: 15,
    });
    const colors = colorsAndIconsQuery.data?.body.categoryColors ?? [];
    const icons = colorsAndIconsQuery.data?.body.categoryIcons ?? [];

    const selected = {
        color: colors.find(c => c.id === newCategory.colorId)?.color,
        icon: icons.find(i => i.id === newCategory.iconId)?.icon,
    }

    return <div>
        <header>
            <h3>새로운 목록</h3>
            <div css={s.categoryIcon(selected.color)}>{selected.icon}</div>
        </header>
        <div>
            <input type="text" />
        </div>
        <div>
            {
                colors.map(c => (
                    <label key={c.id}>
                        <input type="radio" />
                        {c.color}
                    </label>
                ))
            }
        </div>
        <div>
            {
                icons.map(i => (
                    <label key={i.id}>
                        <input type="radio" />
                        {i.icon}
                    </label>
                ))
            }
        </div>
    </div>
}
