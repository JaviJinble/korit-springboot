import { css } from "@emotion/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from "../../api/todoApi";

function Dash() {
    const queryClient = useQueryClient();
    const [content, setContent] = useState("");
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingContent, setEditingContent] = useState("");

    const todosQuery = useQuery({
        queryKey: ["todos"],
        queryFn: getTodos,
    });

    const addTodoMutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            setContent("");
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
            setEditingContent("");
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const deleteTodoMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const todos = todosQuery.data?.body ?? [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedContent = content.trim();
        if (!trimmedContent) {
            return;
        }
        await addTodoMutation.mutateAsync(trimmedContent);
    };

    const handleToggle = async (todoId) => {
        await toggleTodoMutation.mutateAsync(todoId);
    };

    const handleEditStart = (todo) => {
        setEditingTodoId(todo.id);
        setEditingContent(todo.content);
    };

    const handleEditCancel = () => {
        setEditingTodoId(null);
        setEditingContent("");
    };

    const handleEditSave = async (todoId) => {
        const trimmedContent = editingContent.trim();
        if (!trimmedContent) {
            return;
        }
        await updateTodoMutation.mutateAsync({ todoId, content: trimmedContent });
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
                    <span>{todos.length} items</span>
                </div>

                <form css={form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="할 일을 입력하세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type="submit" disabled={addTodoMutation.isPending}>
                        추가
                    </button>
                </form>

                {todosQuery.isLoading && <p css={message}>불러오는 중...</p>}
                {todosQuery.isError && <p css={message}>Todo 목록을 불러오지 못했습니다.</p>}

                <ul css={list}>
                    {todos.map((todo) => (
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
                                        value={editingContent}
                                        onChange={(e) => setEditingContent(e.target.value)}
                                    />
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
                                    <span>{todo.content}</span>
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
    width: min(720px, 100%);
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

const form = css`
    display: grid;
    grid-template-columns: 1fr 88px;
    gap: 10px;
    margin-bottom: 20px;

    input {
        min-width: 0;
        padding: 14px 16px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
        font-size: 1rem;
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
`;

const message = css`
    padding: 18px 0;
    color: #cbd5e1;
    text-align: center;
`;

const list = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
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

    span {
        color: ${isCompleted ? "#94a3b8" : "#f8fafc"};
        text-decoration: ${isCompleted ? "line-through" : "none"};
        word-break: break-word;
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
    grid-template-columns: minmax(0, 1fr) auto;
    grid-column: span 2;
    gap: 10px;

    input {
        min-width: 0;
        padding: 10px 12px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
    }
`;

const actions = css`
    display: flex;
    gap: 8px;

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
`;

export default Dash;
