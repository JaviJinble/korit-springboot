import { useState } from "react";
import TextButton from "../../components/buttons/TextButton/TextButton";
import Header from "../../components/Header/Header";
import { useCategories } from "../../hooks/queries/useCategory";
import { useBottomModalStore } from "../../store/modalStore";
import * as s from "./styles";
import { useTodoRegisterMutation } from "../../hooks/mutations/useTodo";
import { useMe } from "../../hooks/queries/useUser";
import { PRIORITIES } from "../../constants/globalConstants";

function Register() {
    const [ todo, setTodo ] = useState({
        userId: 0,
        categoryId: 10,
        title: "",
        memo: "",
        dueDate: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`,
        dueTime: `${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}`,
        priority: 1,
        flagged: false,
    });

    const meQuery = useMe();
    const categoriesQuery = useCategories();
    const setModalOpen = useBottomModalStore(state => state.setOpen);
    const setModalChildren = useBottomModalStore(state => state.setChildren)

    

    const todoRegisterMutation = useTodoRegisterMutation();

    const handleCategorySelectOnClick = () => {
        setModalChildren(<CategoryModal categories={categoriesQuery.data?.body} todo={todo} setTodo={setTodo} />);
        setModalOpen(true);
    }

    const handlePrioritySelectOnClick = () => {
        setModalChildren(<PriorityModal priorities={PRIORITIES} todo={todo} setTodo={setTodo} />);
        setModalOpen(true);
    }

    const handleInputOnChange = (e) => {
        setTodo(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleCheckBoxOnChange = (e) => {
        setTodo(prev => ({
            ...prev,
            [e.target.name]: e.target.checked,
        }))
    }

    const handleRegisterOnClick = () => {
        const { flagged, ...todoData } = todo;
        const newTodo = {
            ...todoData,
            userId: meQuery.data.body.userId,
            isFlagged: flagged,
        }
        todoRegisterMutation.mutateAsync(newTodo);
    }


    return (
        <div css={s.layout}>
            <Header>
                <TextButton>취소</TextButton>
                <h4>새로운 할 일</h4>
                <TextButton weight={600} onClick={handleRegisterOnClick}>완료</TextButton>
            </Header>
            <main>
                <div css={s.titleAndMemo}>
                    <input type="text" placeholder="제목" name="title" value={todo.title} onChange={handleInputOnChange} />
                    <textarea placeholder="메모" name="memo" value={todo.memo} onChange={handleInputOnChange} ></textarea>
                </div>
                <ul css={s.listGroup}>
                    <li>
                        <div css={s.iconBox("#ff3b30")}>
                            <svg data-dc-tpl="249" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect data-dc-tpl="250" x="1" y="2" width="12" height="11" rx="2" stroke="white" stroke-width="1.6"></rect><path data-dc-tpl="251" d="M1 5.5h12M4.5 1v3M9.5 1v3" stroke="white" stroke-width="1.6" stroke-linecap="round"></path></svg>
                        </div>
                        <div>날짜</div>
                        <div>
                            <input type="date" name="dueDate" value={todo.dueDate} onChange={handleInputOnChange}/>
                        </div>
                    </li>
                    <li>
                        <div css={s.iconBox("#5856d6")}>
                            <svg data-dc-tpl="256" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle data-dc-tpl="257" cx="7" cy="7" r="5.5" stroke="white" stroke-width="1.6"></circle><path data-dc-tpl="258" d="M7 4.5V7.5l2 2" stroke="white" stroke-width="1.6" stroke-linecap="round"></path></svg>
                        </div>
                        <div>시간</div>
                        <div>
                            <input type="time" name="dueTime" value={todo.dueTime} onChange={handleInputOnChange} />
                        </div>
                    </li>
                </ul>
                <ul css={s.listGroup}>
                    <li css={s.liButton} onClick={handleCategorySelectOnClick}>
                        <div css={s.iconBox(categoriesQuery.data?.body?.find(c => c.categoryId === todo.categoryId)?.categoryColor)}>
                            <svg data-dc-tpl="264" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect data-dc-tpl="265" x="1" y="4" width="12" height="9" rx="2" stroke="white" stroke-width="1.6"></rect><path data-dc-tpl="266" d="M1 7h12M4 4V2.5a2 2 0 014 0V4" stroke="white" stroke-width="1.5" stroke-linecap="round"></path></svg>
                        </div>
                        <div>카테고리</div>
                        <div>
                            <div css={s.categorySelectedColor(categoriesQuery.data?.body?.find(c => c.categoryId === todo.categoryId)?.categoryColor)}></div>
                            <div>{categoriesQuery.data?.body?.find(c => c.categoryId === todo.categoryId)?.categoryName}</div>
                            <div>
                                <svg data-dc-tpl="271" width="7" height="12" viewBox="0 0 7 12" fill="none"><path data-dc-tpl="272" d="M1 1l5 5-5 5" stroke="#C7C7CC" stroke-width="1.8" stroke-linecap="round"></path></svg>
                            </div>
                        </div>
                    </li>
                    <li css={s.liButton} onClick={handlePrioritySelectOnClick}>
                        <div css={s.iconBox(PRIORITIES.find(p => p.id === todo.priority)?.color)}>
                            <svg data-dc-tpl="275" width="14" height="14" viewBox="0 0 14 14" fill="none"><path data-dc-tpl="276" d="M7 2v6M7 11v1" stroke="white" stroke-width="2" stroke-linecap="round"></path></svg>
                        </div>
                        <div>우선순위</div>
                        <div>
                            <div>{PRIORITIES.find(p => p.id === todo.priority)?.name}</div>
                            <div>
                                <svg data-dc-tpl="271" width="7" height="12" viewBox="0 0 7 12" fill="none"><path data-dc-tpl="272" d="M1 1l5 5-5 5" stroke="#C7C7CC" stroke-width="1.8" stroke-linecap="round"></path></svg>
                            </div>
                        </div>
                    </li>
                    <li css={s.liButton}>
                        <div css={s.iconBox("#ff9500")}>
                            <svg data-dc-tpl="284" width="12" height="14" viewBox="0 0 12 14" fill="none"><path data-dc-tpl="285" d="M1.5 1.5v12M1.5 1.5h8l-2 4.5 2 4.5H1.5" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </div>
                        <div>깃발 표시</div>
                        <div>
                            <label css={s.toggleCheckBox} >
                                <input type="checkbox" name="flagged" checked={todo.flagged} onChange={handleCheckBoxOnChange}/>
                                <div>
                                    <div></div>
                                </div>
                            </label>
                        </div>
                    </li>
                </ul>
            </main>
        </div>
    )
}

export default Register;


function CategoryModal({categories, todo, setTodo}) {
    const setModalOpen = useBottomModalStore(state => state.setOpen);
    
    const handleSelectOnClick = (categoryId) => {
        setTodo(prev => ({
            ...prev,
            categoryId,
        }));
        setModalOpen(false);
    }

    const handleCancelOnClick = () => {
        setModalOpen(false);
    }

    return <div css={s.modalLayout}>
        <h3>카테고리 선택</h3>
        <ul>
            {
                categories?.map(c => (
                    <li key={c.categoryId} css={s.selectedLi(todo.categoryId === c.categoryId)}
                        onClick={() => handleSelectOnClick(c.categoryId)}>
                        <div css={s.modalListIcon(c.categoryColor)}>
                            {c.categoryIcon}
                        </div>
                        <div>{c.categoryName}</div>
                        <div>{todo.categoryId === c.categoryId && <svg data-dc-tpl="340" width="17" height="13" viewBox="0 0 17 13" fill="none"><path data-dc-tpl="341" d="M1.5 6.5L6 11L15.5 1.5" stroke="#007AFF" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>}</div>
                        </li>
                ))
            }
        </ul>

        <button onClick={handleCancelOnClick}>취소</button>
    </div>
}

function PriorityModal({ priorities, todo, setTodo }) {
    const setModalOpen = useBottomModalStore(state => state.setOpen);
    
    const handleSelectOnClick = (priority) => {
        setTodo(prev => ({
            ...prev,
            priority,
        }));
        setModalOpen(false);
    }

    const handleCancelOnClick = () => {
        setModalOpen(false);
    }
    
    return <div css={s.modalLayout}>
        <h3>우선순위 선택</h3>
        <ul>
            {
                priorities?.map(p => (
                    <li key={p.id} css={s.selectedLi(todo.priority === p.id)}
                        onClick={() => handleSelectOnClick(p.id)}>
                        <div css={s.modalListIcon(p.color)}>
                            {p.icon}
                        </div>
                        <div>{p.name}</div>
                        <div>{todo.priority === p.id && <svg data-dc-tpl="340" width="17" height="13" viewBox="0 0 17 13" fill="none"><path data-dc-tpl="341" d="M1.5 6.5L6 11L15.5 1.5" stroke="#007AFF" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>}</div>
                        </li>
                ))
            }
        </ul>

        <button onClick={handleCancelOnClick}>취소</button>
    </div>
}
