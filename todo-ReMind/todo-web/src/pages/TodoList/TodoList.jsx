import { useNavigate, useParams, useSearchParams } from "react-router";
import { useTodoList } from "../../hooks/queries/useTodo";
import { useCategories, useCategoryNotCompletedCount } from "../../hooks/queries/useCategory";
import Header from "../../components/Header/Header";
import TextButton from "../../components/buttons/TextButton/TextButton";
import { PRIORITIES } from "../../constants/globalConstants";
import * as s from "./styles";
import { useTodoCompleteMutationMutation } from "../../hooks/mutations/useTodo";
import { useMe } from "../../hooks/queries/useUser";
import { useState } from "react";

function TodoList() {
    const [ searchParams ] = useSearchParams();
    const [ todo, setTodo ] = useState({
        
    })
    const navigate = useNavigate();
    const { categoryName } = useParams();
    const meQuery = useMe();
    const categoriesQuery = useCategories();
    const category = categoriesQuery.data?.body?.find(c => c.categoryName === categoryName);
    const categoryId = category?.categoryId;

    const todoListQuery = useTodoList();
    const todoList = todoListQuery.data?.body?.filter(todo => todo.categoryId === categoryId) || [];
    const completedTodoList = todoList.filter(todo => todo.completed);
    const notCompletedTodoList = todoList.filter(todo => !todo.completed);
    const categoryCountsQuery = useCategoryNotCompletedCount();
    const categoryCount = categoryCountsQuery.data?.body?.find(c => c.id === categoryId);

    const notCompletedCount = categoryCount?.notCompletedCount || 0;
    const completedCount = (categoryCount?.totalCount || 0) - notCompletedCount;

    const updateCompletionMutation = useTodoCompleteMutationMutation();

    const handleCompleteOnClick = (currentChecked, checked, todoId) => {
        updateCompletionMutation.mutateAsync({
            todoId: todoId,
            userId: meQuery.data.body.userId,
            completed: !currentChecked,
        });
    }
    console.log(notCompletedCount);
    console.log(completedCount);
    console.log(completedTodoList, notCompletedTodoList);

    return (
        <div css={s.layout}>
            <Header>
                <TextButton onClick={() => navigate("/")}>&lt;  홈</TextButton>
                <h4>{category?.categoryName}</h4>
                <TextButton>...</TextButton>
            </Header>
            <main css={s.main}>
                <div css={s.header(category?.categoryColor)}>
                    <div>{category?.categoryIcon}</div>
                    <div>
                        <div>{category?.categoryName}</div>
                        <div>{notCompletedCount}개의 할 일 </div>
                    </div>
                </div>
                <ul css={s.notCompletedUl}>
                    {
                        notCompletedTodoList.map(todo => (
                            <li key={todo.todoId}>
                                <div>
                                    <input type="checkbox" checked={todo.completed} onClick={() => {handleCompleteOnClick(todo.completed, todo.todoId)}} />
                                </div>
                                <div>
                                    <div>{todo.title}</div>
                                    <div>
                                        {PRIORITIES.find(p => p.id === todo.priority)?.icon}
                                    </div>
                                    <div>{todo.dueDate} {todo.dueTime}</div>
                                    <div>{todo.memo}</div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div css={s.completedTitle}>
                    완료됨 {completedCount}개
                </div>
                <ul css={s.completedUl}>
                    {
                        completedTodoList.map(todo => (
                            <li key={todo.todoId}>
                                <div>
                                    <input type="checkbox" checked={todo.completed} onClick={() => {handleCompleteOnClick(todo.completed, todo.todoId)}} />
                                </div>
                                <div>{todo.title}</div>
                            </li>
                        ))
                    }
                </ul>
                <div>
                    <TextButton onClick={() => navigate(`/register?categoryId=${categoryId}`)}>새로운 할 일 추가</TextButton>
                </div>
            </main>
        </div>
    )
}

export default TodoList;
