import { Link } from "react-router";
import TextButton from "../../components/buttons/TextButton/TextButton";
import Header from "../../components/Header/Header";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import { useCategories, useCategoryColorsAndIcons, useCategoryNotCompletedCount } from "../../hooks/queries/useCategory";
import { useMe } from "../../hooks/queries/useUser";
import * as s from "./styles";
import { useBottomModalStore } from "../../store/modalStore";
import { useState } from "react";
import { useCategoryDeleteMutation, useCategoryRegisterMutation } from "../../hooks/mutations/useCategory";

function Home() {
    // React Query 훅을 호출하면 서버 데이터와 함께 로딩 상태, 오류 상태 등을 관리할 수 있다.
    const meQuery = useMe();
    const categoriesQuery = useCategories();
    const categoryNotCompletedCountQuery = useCategoryNotCompletedCount();

    // Zustand 스토어에서 모달을 여는 함수와 모달에 표시할 컴포넌트를 가져온다.
    const setModalOpen = useBottomModalStore((state) => (state.setOpen));
    const setModalChildren = useBottomModalStore(state => (state.setChildren));

    const [ isEdit, setEdit ] = useState(false);

    const handleChangeModeOnClick = (state) => {
        setEdit(state);
    }


    const categoryDeleteMutation = useCategoryDeleteMutation();    
    const handleDeleteCategory = (e, categoryId) => {
        categoryDeleteMutation.mutateAsync(categoryId);
    };


    // 모달의 내용으로 CategoryRegister 컴포넌트를 지정한 뒤 모달을 연다.
    const handleCategoryRegisterOnclick = () => {
        setModalOpen(true);
        setModalChildren(<CategoryRegister />);
    };

    


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
                <div css={s.listGroup(isEdit)}>
                    <header>
                        <h3>나의 목록</h3>
                        {
                            isEdit
                                ? <TextButton onClick={() => handleChangeModeOnClick(false)}>완료</TextButton>
                                : <TextButton onClick={() => handleChangeModeOnClick(true)}>편집</TextButton>
                        }
                    </header>
                    <ul>
                        {
                            // 카테고리 조회 중에는 목록을 그리지 않고, 조회가 끝나면 배열을 순회한다.
                            // 응답 body가 없을 때는 빈 배열을 사용하여 map 오류를 방지한다.
                            categoriesQuery.isLoading
                                ? <></>
                                : (categoriesQuery.data?.body ?? []).map(category => (
                                    // map으로 JSX를 만들 때 key는 각 항목을 구분할 수 있는 고유값이어야 한다.
                                    <li key={category.categoryId}>
                                        <div>
                                            <div onClick={(e) => handleDeleteCategory(e, category.categoryId)}>
                                                <svg data-dc-tpl="122" width="10" height="2" viewBox="0 0 10 2" fill="none"><rect data-dc-tpl="123" width="10" height="2" rx="1" fill="white"></rect></svg>
                                            </div>
                                        </div>
                                        <Link to={`/categories/${category.categoryName}/todos`}>
                                            <div css={s.categoryIcon(category.categoryColor)}>{category.categoryIcon}</div>
                                            <div css={s.categoryName}>{category.categoryName}</div>
                                            <div css={s.categoryCount}>
                                                <span>{
                                                    categoryNotCompletedCountQuery.isLoading ||
                                                    categoryNotCompletedCountQuery.data.body
                                                        .find(count => count.id === category.categoryId)
                                                        ?.notCompletedCount || "0"
                                                }
                                                </span>
                                                <svg data-dc-tpl="128" width="8" height="13" viewBox="0 0 8 13" fill="none" style={{ "margin-left": "4px" }}><path data-dc-tpl="129" d="M1 1l6 5.5L1 12" stroke="#C7C7CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
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
    // 모달에서 사용할 색상·아이콘 데이터와 현재 로그인 사용자 정보를 조회한다.
    const colorsAndIconsQuery = useCategoryColorsAndIcons();
    const setModalOpen = useBottomModalStore((state) => (state.setOpen));
    const meQuery = useMe();

    // 서버에 카테고리 생성 요청을 보내는 React Query mutation 훅이다.
    const categoryRegisterMutation = useCategoryRegisterMutation();

    // 사용자가 입력하거나 선택한 새 카테고리 값을 하나의 객체로 관리한다.
    const [newCategory, setNewCategory] = useState({
        categoryName: "",
        colorId: 1,
        iconId: 15,
    });
    const colors = colorsAndIconsQuery.data?.body.categoryColors ?? [];
    const icons = colorsAndIconsQuery.data?.body.categoryIcons ?? [];

    // 저장된 ID를 실제 색상값과 아이콘 문자로 변환하여 화면 미리보기에 사용한다.
    const selected = {
        color: colors.find(c => c.id === newCategory.colorId)?.color,
        icon: icons.find(i => i.id === newCategory.iconId)?.icon,
    }

    // name 속성을 객체의 key로 사용하면 여러 입력을 하나의 함수로 처리할 수 있다.
    const handleInputOnChange = (e) => {
        setNewCategory(prev => ({
            // 기존 속성은 유지하고 현재 입력에 해당하는 속성만 덮어쓴다.
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    // 라디오 버튼의 name(colorId 또는 iconId)에 선택한 id를 저장한다.
    const handleRadioOnChange = (e, id) => {
        setNewCategory(prev => ({
            ...prev,
            [e.target.name]: id,
        }))
    } 

    const handleRegisterOnClick = () => {
        // 백엔드 CategoryCreateRequest 필드명에 맞춰 요청 데이터를 구성한다.
        const data = {
            userId: meQuery.data.body.userId,
            name: newCategory.categoryName,
            colorId: newCategory.colorId,
            iconId: newCategory.iconId,
        }

        // mutateAsync가 POST 요청을 실행하고, 성공 시 mutation 훅에서 관련 쿼리를 갱신한다.
        categoryRegisterMutation.mutateAsync(data);
        setModalOpen(false);
    }

    return <div>
        <header css={s.modalHeader}>
            <h3>새로운 목록</h3>
            <div css={s.categoryIcon(selected.color)}>{selected.icon}</div>
        </header>
        <div css={s.modalInput}>
            <svg data-dc-tpl="312" width="16" height="16" viewBox="0 0 16 16" fill="none"><path data-dc-tpl="313" d="M2 8h12M2 4.5h12M2 11.5h8" stroke="#8E8E93" stroke-width="1.8" stroke-linecap="round"></path></svg>
            {/* value와 onChange를 함께 사용하여 React state가 입력값을 관리하는 제어 컴포넌트로 만든다. */}
            <input type="text" placeholder="목록 이름" name="categoryName" value={newCategory.categoryName} onChange={handleInputOnChange} />
        </div>
        <div css={s.madalListTitle}>색상</div>
        <div css={s.colorGroup}>
            {
                colors.map(c => (
                    <label key={c.id} css={s.categoryColorLabel(c.color)}>
                        <input type="radio" name="colorId" checked={c.color === selected.color} onChange={(e) => handleRadioOnChange(e, c.id)} />
                        <div></div>
                    </label>
                ))
            }
        </div>
        <div css={s.madalListTitle}>아이콘</div>
        <div css={s.iconGroup}>
            {
                icons.map(i => (
                    <label key={i.id} css={s.categoryIconLabel}>
                        <input type="radio" name="iconId" checked={i.icon === selected.icon} onChange={(e) => handleRadioOnChange(e, i.id)} />
                        <div>{i.icon}</div>
                    </label>
                ))
            }
        </div>
        <div css={s.modalButtonGroup(selected.color)}>
            <button onClick={() => setModalOpen(false)}>취소</button>
            <button onClick={handleRegisterOnClick}>추가</button>
        </div>
    </div>
}
