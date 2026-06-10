import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { getTodos } from "../../api/todoApi";
import { useLogout } from "../../hooks/useAuth";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const PRIORITY_LABELS = {
    HIGH: "높음",
    MEDIUM: "보통",
    LOW: "낮음",
};

const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const getMonthDays = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDate = new Date(year, month, 1);
    const startDate = new Date(year, month, 1 - firstDate.getDay());

    return Array.from({ length: 42 }, (_, index) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + index);
        return date;
    });
};

const moveMonth = (date, amount) => new Date(date.getFullYear(), date.getMonth() + amount, 1);

function Calendar() {
    const navigate = useNavigate();
    const logoutMutation = useLogout();
    const todayKey = formatDateKey(new Date());
    const [currentMonth, setCurrentMonth] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });
    const [selectedDate, setSelectedDate] = useState(todayKey);

    const todosQuery = useQuery({
        queryKey: ["todos"],
        queryFn: getTodos,
    });

    const todos = useMemo(() => todosQuery.data?.body ?? [], [todosQuery.data]);
    const todosByDeadline = useMemo(
        () =>
            todos.reduce((groups, todo) => {
                if (!todo.deadline) {
                    return groups;
                }

                return {
                    ...groups,
                    [todo.deadline]: [...(groups[todo.deadline] ?? []), todo],
                };
            }, {}),
        [todos]
    );
    const monthDays = useMemo(() => getMonthDays(currentMonth), [currentMonth]);
    const selectedTodos = todosByDeadline[selectedDate] ?? [];
    const currentMonthLabel = `${currentMonth.getFullYear()}년 ${currentMonth.getMonth() + 1}월`;

    return (
        <main css={container}>
            <section css={panel}>
                <div css={header}>
                    <div>
                        <h1>Todo 캘린더</h1>
                        <span>마감일 기준 월간 일정</span>
                    </div>
                    <div css={headerActions}>
                        <button type="button" onClick={() => navigate("/dash")}>
                            대시보드
                        </button>
                        <button type="button" onClick={() => navigate("/mypage")}>
                            마이페이지
                        </button>
                        <button type="button" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
                            로그아웃
                        </button>
                    </div>
                </div>

                <div css={monthToolbar}>
                    <button type="button" onClick={() => setCurrentMonth((prev) => moveMonth(prev, -1))}>
                        이전
                    </button>
                    <strong>{currentMonthLabel}</strong>
                    <button type="button" onClick={() => setCurrentMonth((prev) => moveMonth(prev, 1))}>
                        다음
                    </button>
                </div>

                {todosQuery.isLoading && <p css={message}>불러오는 중...</p>}
                {todosQuery.isError && <p css={message}>캘린더 데이터를 불러오지 못했습니다.</p>}

                {!todosQuery.isLoading && !todosQuery.isError && (
                    <div css={calendarLayout}>
                        <section css={calendarPanel}>
                            <div css={weekdayGrid}>
                                {WEEKDAYS.map((weekday) => (
                                    <span key={weekday}>{weekday}</span>
                                ))}
                            </div>
                            <div css={dayGrid}>
                                {monthDays.map((date) => {
                                    const dateKey = formatDateKey(date);
                                    const dayTodos = todosByDeadline[dateKey] ?? [];
                                    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                                    const isToday = dateKey === todayKey;
                                    const isSelected = dateKey === selectedDate;

                                    return (
                                        <button
                                            key={dateKey}
                                            type="button"
                                            css={dayCell({ isCurrentMonth, isToday, isSelected })}
                                            onClick={() => setSelectedDate(dateKey)}
                                        >
                                            <span>{date.getDate()}</span>
                                            {dayTodos.length > 0 && (
                                                <div css={dayTodoPreview}>
                                                    {dayTodos.slice(0, 2).map((todo) => (
                                                        <small key={todo.id} css={previewItem(todo.isCompleted)}>
                                                            {todo.content}
                                                        </small>
                                                    ))}
                                                    {dayTodos.length > 2 && <em>+{dayTodos.length - 2}</em>}
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        <aside css={selectedPanel}>
                            <div css={sectionTitle}>
                                <strong>{selectedDate}</strong>
                                <span>{selectedTodos.length}개 Todo</span>
                            </div>
                            {selectedTodos.length === 0 ? (
                                <p css={emptyText}>이 날짜에 마감 예정인 할 일이 없습니다.</p>
                            ) : (
                                <ul css={selectedList}>
                                    {selectedTodos.map((todo) => (
                                        <li key={todo.id} css={selectedItem(todo.isCompleted)}>
                                            <strong>{todo.content}</strong>
                                            <div css={meta}>
                                                <span css={priorityBadge(todo.priority)}>
                                                    {PRIORITY_LABELS[todo.priority] || "보통"}
                                                </span>
                                                <span>{todo.isCompleted ? "완료" : "진행 중"}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </aside>
                    </div>
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
    width: min(1080px, 100%);
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
    margin-bottom: 22px;

    h1 {
        color: #ffffff;
        font-size: 2rem;
        font-weight: 700;
    }

    span {
        color: #94a3b8;
    }

    @media (max-width: 760px) {
        align-items: flex-start;
        flex-direction: column;
    }
`;

const headerActions = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    flex-wrap: wrap;

    button {
        height: 34px;
        padding: 0 10px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #e2e8f0;
        font-weight: 700;
    }

    button:hover:not(:disabled) {
        background: rgba(0, 168, 255, 0.35);
    }
`;

const monthToolbar = css`
    display: grid;
    grid-template-columns: 80px minmax(0, 1fr) 80px;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;

    strong {
        color: #ffffff;
        font-size: 1.24rem;
        text-align: center;
    }

    button {
        height: 38px;
        border-radius: 10px;
        background: rgba(0, 168, 255, 0.18);
        color: #e0f2fe;
        font-weight: 800;
    }
`;

const calendarLayout = css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 16px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const calendarPanel = css`
    min-width: 0;
`;

const weekdayGrid = css`
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 8px;
    margin-bottom: 8px;

    span {
        color: #7dd3fc;
        font-size: 0.84rem;
        font-weight: 800;
        text-align: center;
    }

    @media (max-width: 560px) {
        gap: 5px;
    }
`;

const dayGrid = css`
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 8px;

    @media (max-width: 560px) {
        gap: 5px;
    }
`;

const dayCell = ({ isCurrentMonth, isToday, isSelected }) => css`
    display: flex;
    min-width: 0;
    min-height: 104px;
    flex-direction: column;
    gap: 8px;
    padding: 10px;
    border: 1px solid ${isSelected ? "rgba(0, 168, 255, 0.86)" : "rgba(255, 255, 255, 0.1)"};
    border-radius: 10px;
    background: ${isSelected ? "rgba(0, 168, 255, 0.18)" : "rgba(255, 255, 255, 0.055)"};
    color: ${isCurrentMonth ? "#f8fafc" : "rgba(148, 163, 184, 0.46)"};
    text-align: left;
    box-shadow: ${isSelected ? "0 0 0 3px rgba(0, 168, 255, 0.11)" : "none"};

    > span {
        display: grid;
        width: 28px;
        height: 28px;
        place-items: center;
        border-radius: 999px;
        background: ${isToday ? "rgba(0, 168, 255, 0.9)" : "transparent"};
        color: ${isToday ? "#ffffff" : "inherit"};
        font-weight: 900;
    }

    &:hover {
        border-color: rgba(0, 168, 255, 0.58);
        background: rgba(0, 168, 255, 0.12);
    }

    @media (max-width: 720px) {
        min-height: 84px;
        padding: 8px;
    }

    @media (max-width: 520px) {
        min-height: 58px;
        gap: 4px;
        padding: 6px;

        > span {
            width: 24px;
            height: 24px;
            font-size: 0.82rem;
        }
    }
`;

const dayTodoPreview = css`
    display: grid;
    gap: 4px;
    min-width: 0;

    em {
        color: #7dd3fc;
        font-size: 0.76rem;
        font-style: normal;
        font-weight: 800;
    }

    @media (max-width: 520px) {
        small {
            display: none;
        }
    }
`;

const previewItem = (isCompleted) => css`
    min-width: 0;
    overflow: hidden;
    padding: 4px 6px;
    border-radius: 7px;
    background: rgba(0, 168, 255, 0.16);
    color: ${isCompleted ? "#94a3b8" : "#e0f2fe"};
    font-size: 0.72rem;
    text-decoration: ${isCompleted ? "line-through" : "none"};
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const selectedPanel = css`
    min-width: 0;
    padding: 16px;
    border: 1px solid rgba(0, 168, 255, 0.22);
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(0, 168, 255, 0.11), rgba(255, 255, 255, 0.05));
`;

const sectionTitle = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;

    strong {
        color: #ffffff;
    }

    span {
        color: #94a3b8;
        font-size: 0.82rem;
    }
`;

const selectedList = css`
    display: grid;
    gap: 10px;
    list-style: none;
`;

const selectedItem = (isCompleted) => css`
    display: grid;
    gap: 8px;
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    background: rgba(15, 23, 42, 0.48);
    opacity: ${isCompleted ? 0.62 : 1};

    strong {
        color: #ffffff;
        text-decoration: ${isCompleted ? "line-through" : "none"};
        overflow-wrap: anywhere;
    }
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

const emptyText = css`
    padding: 24px 0;
    color: #cbd5e1;
    text-align: center;
`;

const message = css`
    padding: 24px 0;
    color: #cbd5e1;
    text-align: center;
`;

export default Calendar;
