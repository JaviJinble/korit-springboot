import { css } from "@emotion/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addTodo, getTodos, toggleTodo } from "../../api/todoApi";

function Dash() {
    const queryClient = useQueryClient();
    const [content, setContent] = useState("");

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
                            <span>{todo.content}</span>
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
    grid-template-columns: 34px 1fr;
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

export default Dash;
