import { css } from "@emotion/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { addTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from "../../api/todoApi";
import { useLogout } from "../../hooks/useAuth";

const emptyTodoForm = {
    content: "",
    deadline: "",
    priority: "MEDIUM",
};

const FILTERS = {
    ALL: "ALL",
    ACTIVE: "ACTIVE",
    COMPLETED: "COMPLETED",
};

const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineDate = new Date(`${deadline}T00:00:00`);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const formatDday = (daysLeft) => {
    if (daysLeft === 0) {
        return "D-Day";
    }
    if (daysLeft > 0) {
        return `D-${daysLeft}`;
    }
    return `D+${Math.abs(daysLeft)}`;
};

function Dash() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const logoutMutation = useLogout();
    const [todoForm, setTodoForm] = useState(emptyTodoForm);
    const [filter, setFilter] = useState(FILTERS.ALL);
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTodoForm, setEditingTodoForm] = useState(emptyTodoForm);

    const todosQuery = useQuery({
        queryKey: ["todos"],
        queryFn: getTodos,
    });

    const addTodoMutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            setTodoForm(emptyTodoForm);
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const toggleTodoMutation = useMutation({
        mutationFn: toggleTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const updateTodoMutation = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            setEditingTodoId(null);
            setEditingTodoForm(emptyTodoForm);
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const deleteTodoMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: (_, todoId) => {
            queryClient.setQueryData(["todos"], (oldData) => {
                if (!oldData?.body) {
                    return oldData;
                }

                return {
                    ...oldData,
                    body: oldData.body.filter((todo) => todo.id !== todoId),
                };
            });
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const todos = todosQuery.data?.body ?? [];
    const totalCount = todos.length;
    const activeCount = todos.filter((todo) => !todo.isCompleted).length;
    const completedCount = todos.filter((todo) => todo.isCompleted).length;
    const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
    const priorityCounts = todos.reduce(
        (counts, todo) => ({
            ...counts,
            [todo.priority ?? "MEDIUM"]: (counts[todo.priority ?? "MEDIUM"] ?? 0) + 1,
        }),
        { HIGH: 0, MEDIUM: 0, LOW: 0 }
    );
    const deadlineAlerts = todos
        .filter((todo) => !todo.isCompleted && !!todo.deadline)
        .map((todo) => ({
            ...todo,
            daysLeft: getDaysUntilDeadline(todo.deadline),
        }))
        .sort((a, b) => a.daysLeft - b.daysLeft)
        .slice(0, 5);
    const filteredTodos = todos.filter((todo) => {
        if (filter === FILTERS.ACTIVE) {
            return !todo.isCompleted;
        }
        if (filter === FILTERS.COMPLETED) {
            return todo.isCompleted;
        }
        return true;
    });

    const handleTodoFormChange = (e) => {
        setTodoForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEditingTodoFormChange = (e) => {
        setEditingTodoForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedContent = todoForm.content.trim();
        if (!trimmedContent) {
            return;
        }
        await addTodoMutation.mutateAsync({
            ...todoForm,
            content: trimmedContent,
            deadline: todoForm.deadline || null,
        });
    };

    const handleToggle = async (todoId) => {
        await toggleTodoMutation.mutateAsync(todoId);
    };

    const handleEditStart = (todo) => {
        setEditingTodoId(todo.id);
        setEditingTodoForm({
            content: todo.content,
            deadline: todo.deadline ?? "",
            priority: todo.priority ?? "MEDIUM",
        });
    };

    const handleEditCancel = () => {
        setEditingTodoId(null);
        setEditingTodoForm(emptyTodoForm);
    };

    const handleEditSave = async (todoId) => {
        const trimmedContent = editingTodoForm.content.trim();
        if (!trimmedContent) {
            return;
        }
        await updateTodoMutation.mutateAsync({
            todoId,
            ...editingTodoForm,
            content: trimmedContent,
            deadline: editingTodoForm.deadline || null,
        });
    };

    const handleDelete = async (todoId) => {
        if (!window.confirm("Todo를 삭제할까요?")) {
            return;
        }
        await deleteTodoMutation.mutateAsync(todoId);
    };

    return (
        <main css={container}>
            <section css={panel}>
                <div css={header}>
                    <h1>Todo</h1>
                    <div css={headerActions}>
                        <span>{totalCount} items</span>
                        <button type="button" onClick={() => navigate("/mypage")}>
                            마이페이지
                        </button>
                        <button type="button" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
                            로그아웃
                        </button>
                    </div>
                </div>

                <div css={summary}>
                    <div>
                        <strong>{totalCount}</strong>
                        <span>전체</span>
                    </div>
                    <div>
                        <strong>{completedCount}</strong>
                        <span>완료</span>
                    </div>
                    <div>
                        <strong>{activeCount}</strong>
                        <span>진행중</span>
                    </div>
                    <div>
                        <strong>{completionRate}%</strong>
                        <span>완료율</span>
                    </div>
                </div>

                <div css={dashboardDetails}>
                    <div css={priorityPanel}>
                        <div css={sectionTitle}>
                            <strong>Priority</strong>
                            <span>우선순위별 Todo</span>
                        </div>
                        <div css={priorityRows}>
                            <div>
                                <span css={priorityBadge("HIGH")}>HIGH</span>
                                <strong>{priorityCounts.HIGH}</strong>
                            </div>
                            <div>
                                <span css={priorityBadge("MEDIUM")}>MEDIUM</span>
                                <strong>{priorityCounts.MEDIUM}</strong>
                            </div>
                            <div>
                                <span css={priorityBadge("LOW")}>LOW</span>
                                <strong>{priorityCounts.LOW}</strong>
                            </div>
                        </div>
                    </div>

                    <div css={alertPanel}>
                        <div css={sectionTitle}>
                            <strong>Deadline Alert</strong>
                            <span>마감 임박 Todo</span>
                        </div>
                        {deadlineAlerts.length === 0 ? (
                            <p css={alertEmpty}>{totalCount === 0 ? "Todo를 추가하면 마감 알림이 표시됩니다." : "가까운 마감 일정이 없습니다."}</p>
                        ) : (
                            <ul css={alertList}>
                                {deadlineAlerts.map((todo) => (
                                    <li key={todo.id}>
                                        <div>
                                            <strong>{todo.content}</strong>
                                            <span>{todo.deadline}</span>
                                        </div>
                                        <span css={ddayBadge(todo.daysLeft)}>{formatDday(todo.daysLeft)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <form css={form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="content"
                        placeholder="할 일을 입력하세요"
                        value={todoForm.content}
                        onChange={handleTodoFormChange}
                    />
                    <input
                        type="date"
                        name="deadline"
                        value={todoForm.deadline}
                        onChange={handleTodoFormChange}
                    />
                    <select name="priority" value={todoForm.priority} onChange={handleTodoFormChange}>
                        <option value="HIGH">HIGH</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="LOW">LOW</option>
                    </select>
                    <button type="submit" disabled={addTodoMutation.isPending}>
                        추가
                    </button>
                </form>

                <div css={tabs}>
                    <button type="button" css={tabButton(filter === FILTERS.ALL)} onClick={() => setFilter(FILTERS.ALL)}>
                        전체
                    </button>
                    <button type="button" css={tabButton(filter === FILTERS.ACTIVE)} onClick={() => setFilter(FILTERS.ACTIVE)}>
                        진행중
                    </button>
                    <button type="button" css={tabButton(filter === FILTERS.COMPLETED)} onClick={() => setFilter(FILTERS.COMPLETED)}>
                        완료
                    </button>
                </div>

                {todosQuery.isLoading && <p css={message}>불러오는 중...</p>}
                {todosQuery.isError && <p css={message}>Todo 목록을 불러오지 못했습니다.</p>}

                {!todosQuery.isLoading && !todosQuery.isError && todos.length === 0 && (
                    <div css={emptyState}>
                        <strong>아직 등록된 할 일이 없습니다.</strong>
                        <span>오늘 할 일을 추가해보세요.</span>
                    </div>
                )}

                {!todosQuery.isLoading && !todosQuery.isError && todos.length > 0 && filteredTodos.length === 0 && (
                    <p css={message}>선택한 상태의 Todo가 없습니다.</p>
                )}

                {filteredTodos.length > 0 && (
                    <ul css={list}>
                        {filteredTodos.map((todo) => (
                            <li key={todo.id} css={item(todo.isCompleted)}>
                                <button
                                    type="button"
                                    css={checkButton(todo.isCompleted)}
                                    onClick={() => handleToggle(todo.id)}
                                    disabled={toggleTodoMutation.isPending}
                                    aria-label="완료 상태 변경"
                                >
                                    {todo.isCompleted ? "✓" : ""}
                                </button>
                                {editingTodoId === todo.id ? (
                                    <div css={editArea}>
                                        <input
                                            type="text"
                                            name="content"
                                            value={editingTodoForm.content}
                                            onChange={handleEditingTodoFormChange}
                                        />
                                        <input
                                            type="date"
                                            name="deadline"
                                            value={editingTodoForm.deadline}
                                            onChange={handleEditingTodoFormChange}
                                        />
                                        <select
                                            name="priority"
                                            value={editingTodoForm.priority}
                                            onChange={handleEditingTodoFormChange}
                                        >
                                            <option value="HIGH">HIGH</option>
                                            <option value="MEDIUM">MEDIUM</option>
                                            <option value="LOW">LOW</option>
                                        </select>
                                        <div css={actions}>
                                            <button
                                                type="button"
                                                onClick={() => handleEditSave(todo.id)}
                                                disabled={updateTodoMutation.isPending}
                                            >
                                                저장
                                            </button>
                                            <button type="button" onClick={handleEditCancel}>
                                                취소
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div css={todoBody}>
                                            <span css={contentText(todo.isCompleted)}>{todo.content}</span>
                                            <div css={meta}>
                                                <span>{todo.deadline || "기한 없음"}</span>
                                                <span css={priorityBadge(todo.priority)}>{todo.priority || "MEDIUM"}</span>
                                                <span>{todo.isCompleted ? "완료" : "진행중"}</span>
                                            </div>
                                        </div>
                                        <div css={actions}>
                                            <button type="button" onClick={() => handleEditStart(todo)}>
                                                수정
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(todo.id)}
                                                disabled={deleteTodoMutation.isPending}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}

const container = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 24px;
`;

const panel = css`
    width: min(860px, 100%);
    padding: 32px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    background: rgba(15, 23, 42, 0.72);
    backdrop-filter: blur(8px);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.32);
`;

const header = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;

    h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #ffffff;
    }

    span {
        color: #94a3b8;
        font-size: 0.95rem;
    }
`;

const headerActions = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;

    button {
        height: 34px;
        padding: 0 10px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #e2e8f0;
        font-size: 0.88rem;
        font-weight: 700;
    }

    button:hover:not(:disabled) {
        background: rgba(0, 168, 255, 0.35);
    }

    button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }

    @media (max-width: 720px) {
        flex-wrap: wrap;
    }
`;

const summary = css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 10px;

    div {
        padding: 14px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.06);
    }

    strong {
        display: block;
        color: #ffffff;
        font-size: 1.45rem;
    }

    span {
        color: #94a3b8;
        font-size: 0.9rem;
    }

    @media (max-width: 720px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const dashboardDetails = css`
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 10px;
    margin-bottom: 20px;

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
    }
`;

const priorityPanel = css`
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
`;

const alertPanel = css`
    padding: 14px;
    border: 1px solid rgba(0, 168, 255, 0.22);
    border-radius: 10px;
    background: rgba(0, 168, 255, 0.06);
`;

const sectionTitle = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;

    strong {
        color: #ffffff;
        font-size: 0.98rem;
    }

    span {
        color: #94a3b8;
        font-size: 0.82rem;
    }
`;

const priorityRows = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;

    div {
        display: flex;
        min-width: 0;
        flex-direction: column;
        gap: 8px;
        padding: 10px;
        border-radius: 9px;
        background: rgba(255, 255, 255, 0.05);
    }

    strong {
        color: #ffffff;
        font-size: 1.2rem;
    }
`;

const alertEmpty = css`
    padding: 17px 0 4px;
    color: #94a3b8;
    text-align: center;
    font-size: 0.92rem;
`;

const alertList = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 178px;
    overflow-y: auto;
    padding-right: 4px;
    list-style: none;

    li {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 9px;
        background: rgba(15, 23, 42, 0.4);
    }

    div {
        display: flex;
        min-width: 0;
        flex-direction: column;
        gap: 3px;
    }

    strong {
        color: #ffffff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    span {
        color: #94a3b8;
        font-size: 0.82rem;
    }
`;

const form = css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 160px 130px 88px;
    gap: 10px;
    margin-bottom: 20px;

    input,
    select {
        min-width: 0;
        padding: 14px 16px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
        font-size: 1rem;
    }

    select option {
        background: #0f172a;
        color: #ffffff;
    }

    button {
        border-radius: 10px;
        background: #00a8ff;
        color: #ffffff;
        font-weight: 700;
    }

    button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }

    @media (max-width: 720px) {
        grid-template-columns: 1fr;

        button {
            height: 46px;
        }
    }
`;

const tabs = css`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
`;

const tabButton = (isActive) => css`
    min-width: 74px;
    height: 36px;
    border: 1px solid ${isActive ? "rgba(0, 168, 255, 0.75)" : "rgba(255, 255, 255, 0.12)"};
    border-radius: 999px;
    background: ${isActive ? "rgba(0, 168, 255, 0.28)" : "rgba(255, 255, 255, 0.06)"};
    color: ${isActive ? "#ffffff" : "#cbd5e1"};
    font-weight: 700;
`;

const message = css`
    padding: 18px 0;
    color: #cbd5e1;
    text-align: center;
`;

const emptyState = css`
    display: flex;
    min-height: 180px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.18);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);

    strong {
        color: #ffffff;
        font-size: 1.05rem;
    }

    span {
        color: #94a3b8;
    }
`;

const list = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 320px;
    overflow-y: auto;
    padding-right: 4px;
    list-style: none;
`;

const item = (isCompleted) => css`
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
    min-height: 48px;
    padding: 10px 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.06);
    opacity: ${isCompleted ? 0.62 : 1};

    @media (max-width: 720px) {
        grid-template-columns: 34px minmax(0, 1fr);

        > div:last-child {
            grid-column: 2;
        }
    }
`;

const checkButton = (isCompleted) => css`
    width: 34px;
    height: 34px;
    border: 1px solid ${isCompleted ? "#22c55e" : "rgba(255, 255, 255, 0.24)"};
    border-radius: 50%;
    background: ${isCompleted ? "#22c55e" : "rgba(255, 255, 255, 0.08)"};
    color: #052e16;
    font-size: 1rem;
    font-weight: 800;
`;

const editArea = css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 150px 120px auto;
    grid-column: span 2;
    gap: 10px;

    input,
    select {
        min-width: 0;
        padding: 10px 12px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
    }

    select option {
        background: #0f172a;
        color: #ffffff;
    }

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
        grid-column: span 1;
    }
`;

const todoBody = css`
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 6px;
`;

const contentText = (isCompleted) => css`
    color: ${isCompleted ? "#94a3b8" : "#f8fafc"};
    text-decoration: ${isCompleted ? "line-through" : "none"};
    word-break: break-word;
`;

const meta = css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    span {
        color: #94a3b8;
        font-size: 0.82rem;
    }
`;

const priorityBadge = (priority) => {
    const colors = {
        HIGH: ["rgba(255, 0, 85, 0.18)", "#ff8ab3"],
        MEDIUM: ["rgba(0, 168, 255, 0.18)", "#7dd3fc"],
        LOW: ["rgba(34, 197, 94, 0.18)", "#86efac"],
    };
    const [background, color] = colors[priority] ?? colors.MEDIUM;

    return css`
        padding: 2px 8px;
        border-radius: 999px;
        background: ${background};
        color: ${color} !important;
        font-weight: 800;
    `;
};

const ddayBadge = (daysLeft) => {
    const isOverdue = daysLeft < 0;
    const isToday = daysLeft === 0;

    return css`
        min-width: 58px;
        padding: 5px 9px;
        border-radius: 999px;
        background: ${isOverdue
            ? "rgba(255, 0, 85, 0.2)"
            : isToday
              ? "rgba(255, 255, 255, 0.14)"
              : "rgba(0, 168, 255, 0.2)"};
        color: ${isOverdue ? "#ff8ab3" : isToday ? "#ffffff" : "#7dd3fc"} !important;
        font-size: 0.84rem !important;
        font-weight: 900;
        text-align: center;
    `;
};

const actions = css`
    display: flex;
    gap: 8px;
    justify-content: flex-end;

    button {
        min-width: 52px;
        height: 34px;
        padding: 0 10px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #e2e8f0;
        font-size: 0.88rem;
        font-weight: 700;
    }

    button:hover:not(:disabled) {
        background: rgba(0, 168, 255, 0.35);
    }

    button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }

    @media (max-width: 720px) {
        justify-content: flex-start;
    }
`;

export default Dash;
