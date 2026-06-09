import { css } from "@emotion/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { addNote, deleteNote, getNotes, updateNote } from "../../api/noteApi";
import { useLogout } from "../../hooks/useAuth";

const emptyNoteForm = {
    title: "",
    content: "",
};

const formatDateTime = (dateTime) => {
    if (!dateTime) {
        return "-";
    }

    return new Date(dateTime).toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};

function Notes() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const logoutMutation = useLogout();
    const [isComposerOpen, setIsComposerOpen] = useState(false);
    const [noteForm, setNoteForm] = useState(emptyNoteForm);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editingNoteForm, setEditingNoteForm] = useState(emptyNoteForm);

    const notesQuery = useQuery({
        queryKey: ["notes"],
        queryFn: getNotes,
    });

    const addNoteMutation = useMutation({
        mutationFn: addNote,
        onSuccess: () => {
            setNoteForm(emptyNoteForm);
            setIsComposerOpen(false);
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    const updateNoteMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: () => {
            setEditingNoteId(null);
            setEditingNoteForm(emptyNoteForm);
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    const deleteNoteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
    });

    const notes = notesQuery.data?.body ?? [];

    const handleNoteFormChange = (e) => {
        setNoteForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEditingNoteFormChange = (e) => {
        setEditingNoteForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleComposerCancel = () => {
        setNoteForm(emptyNoteForm);
        setIsComposerOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = noteForm.title.trim();
        const content = noteForm.content.trim();

        if (!title || !content) {
            return;
        }

        await addNoteMutation.mutateAsync({ title, content });
    };

    const handleEditStart = (note) => {
        setEditingNoteId(note.id);
        setEditingNoteForm({
            title: note.title,
            content: note.content,
        });
    };

    const handleEditCancel = () => {
        setEditingNoteId(null);
        setEditingNoteForm(emptyNoteForm);
    };

    const handleEditSave = async (noteId) => {
        const title = editingNoteForm.title.trim();
        const content = editingNoteForm.content.trim();

        if (!title || !content) {
            return;
        }

        await updateNoteMutation.mutateAsync({ noteId, title, content });
    };

    const handleDelete = async (noteId) => {
        if (!window.confirm("이 메모를 삭제할까요?")) {
            return;
        }

        await deleteNoteMutation.mutateAsync(noteId);
    };

    return (
        <main css={container}>
            <section css={panel}>
                <div css={header}>
                    <div>
                        <h1>메모장</h1>
                        <span>나만 볼 수 있는 개인 메모</span>
                    </div>
                    <div css={headerActions}>
                        <button type="button" onClick={() => navigate("/dash")}>
                            대시보드
                        </button>
                        <button type="button" onClick={() => navigate("/calendar")}>
                            캘린더
                        </button>
                        <button type="button" onClick={() => navigate("/mypage")}>
                            마이페이지
                        </button>
                        <button type="button" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
                            로그아웃
                        </button>
                    </div>
                </div>

                <div css={composerToolbar}>
                    <div>
                        <strong>{notes.length}개의 메모</strong>
                        <span>최근 수정된 메모가 먼저 표시됩니다.</span>
                    </div>
                    {!isComposerOpen && (
                        <button type="button" onClick={() => setIsComposerOpen(true)}>
                            + 새 메모 작성
                        </button>
                    )}
                </div>

                {isComposerOpen && (
                    <form css={composerCard} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            placeholder="메모 제목"
                            maxLength={100}
                            value={noteForm.title}
                            onChange={handleNoteFormChange}
                        />
                        <textarea
                            name="content"
                            placeholder="메모 내용을 입력하세요"
                            value={noteForm.content}
                            onChange={handleNoteFormChange}
                        />
                        <div css={formActions}>
                            <button type="button" onClick={handleComposerCancel}>
                                취소
                            </button>
                            <button type="submit" disabled={addNoteMutation.isPending}>
                                저장
                            </button>
                        </div>
                    </form>
                )}

                {notesQuery.isLoading && <p css={message}>불러오는 중...</p>}
                {notesQuery.isError && <p css={message}>메모 목록을 불러오지 못했습니다.</p>}

                {!notesQuery.isLoading && !notesQuery.isError && notes.length === 0 && (
                    <div css={emptyState}>
                        <strong>아직 작성한 메모가 없습니다.</strong>
                        <span>기억해둘 내용을 첫 메모로 남겨보세요.</span>
                    </div>
                )}

                {notes.length > 0 && (
                    <ul css={noteList}>
                        {notes.map((note) => (
                            <li key={note.id} css={noteCard}>
                                {editingNoteId === note.id ? (
                                    <div css={editArea}>
                                        <input
                                            type="text"
                                            name="title"
                                            maxLength={100}
                                            value={editingNoteForm.title}
                                            onChange={handleEditingNoteFormChange}
                                        />
                                        <textarea
                                            name="content"
                                            value={editingNoteForm.content}
                                            onChange={handleEditingNoteFormChange}
                                        />
                                        <div css={formActions}>
                                            <button type="button" onClick={handleEditCancel}>
                                                취소
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleEditSave(note.id)}
                                                disabled={updateNoteMutation.isPending}
                                            >
                                                저장
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div css={noteHead}>
                                            <strong>{note.title}</strong>
                                            <span>수정 {formatDateTime(note.updatedAt || note.createdAt)}</span>
                                        </div>
                                        <p>{note.content}</p>
                                        <div css={noteFooter}>
                                            <span>작성 {formatDateTime(note.createdAt)}</span>
                                            <div css={cardActions}>
                                                <button type="button" onClick={() => handleEditStart(note)}>
                                                    수정
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(note.id)}
                                                    disabled={deleteNoteMutation.isPending}
                                                >
                                                    삭제
                                                </button>
                                            </div>
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
    width: min(980px, 100%);
    padding: 32px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    background: rgba(15, 23, 42, 0.72);
    backdrop-filter: blur(8px);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.32);

    @media (max-width: 560px) {
        padding: 22px;
    }
`;

const header = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;

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

const composerToolbar = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;

    > div {
        display: grid;
        gap: 4px;
    }

    strong {
        color: #ffffff;
        font-size: 1.04rem;
    }

    span {
        color: #94a3b8;
        font-size: 0.88rem;
    }

    button {
        height: 42px;
        padding: 0 16px;
        border-radius: 10px;
        background: #00a8ff;
        color: #ffffff;
        font-weight: 900;
        white-space: nowrap;
    }

    @media (max-width: 640px) {
        align-items: stretch;
        flex-direction: column;

        button {
            width: 100%;
        }
    }
`;

const composerCard = css`
    display: grid;
    gap: 14px;
    margin-bottom: 20px;
    padding: 18px;
    border: 1px solid rgba(0, 168, 255, 0.28);
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(0, 168, 255, 0.14), rgba(255, 255, 255, 0.065));
    box-shadow: 0 16px 36px rgba(0, 168, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.035);

    input,
    textarea {
        width: 100%;
        min-width: 0;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        background: rgba(15, 23, 42, 0.52);
        color: #ffffff;
    }

    input {
        height: 48px;
        padding: 0 16px;
        font-size: 1.05rem;
        font-weight: 800;
    }

    textarea {
        min-height: 190px;
        padding: 16px;
        font-size: 0.98rem;
        line-height: 1.65;
        resize: vertical;
    }

    input::placeholder,
    textarea::placeholder {
        color: rgba(226, 232, 240, 0.46);
    }

    input:focus,
    textarea:focus {
        border-color: rgba(0, 168, 255, 0.72);
        box-shadow: 0 0 0 3px rgba(0, 168, 255, 0.13);
    }
`;

const formActions = css`
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    button {
        min-width: 72px;
        height: 38px;
        padding: 0 14px;
        border-radius: 9px;
        color: #e2e8f0;
        font-weight: 800;
    }

    button:first-of-type {
        background: rgba(255, 255, 255, 0.1);
    }

    button:last-of-type {
        background: #00a8ff;
        color: #ffffff;
    }

    @media (max-width: 520px) {
        button {
            flex: 1;
        }
    }
`;

const noteList = css`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    list-style: none;

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

const noteCard = css`
    display: flex;
    min-width: 0;
    min-height: 260px;
    flex-direction: column;
    gap: 14px;
    padding: 18px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.075);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.035);

    p {
        flex: 1;
        color: #dbeafe;
        line-height: 1.68;
        overflow-wrap: anywhere;
        white-space: pre-wrap;
    }
`;

const noteHead = css`
    display: grid;
    gap: 6px;

    strong {
        min-width: 0;
        color: #ffffff;
        font-size: 1.12rem;
        overflow-wrap: anywhere;
    }

    span {
        color: #94a3b8;
        font-size: 0.78rem;
    }
`;

const noteFooter = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.09);

    > span {
        color: #94a3b8;
        font-size: 0.78rem;
    }

    @media (max-width: 520px) {
        align-items: flex-start;
        flex-direction: column;
    }
`;

const editArea = css`
    display: grid;
    gap: 14px;

    input,
    textarea {
        min-width: 0;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        background: rgba(15, 23, 42, 0.52);
        color: #ffffff;
    }

    input {
        height: 46px;
        padding: 0 14px;
        font-size: 1rem;
        font-weight: 800;
    }

    textarea {
        min-height: 190px;
        padding: 14px;
        line-height: 1.65;
        resize: vertical;
    }
`;

const cardActions = css`
    display: flex;
    justify-content: flex-end;
    gap: 8px;

    button {
        min-width: 52px;
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

const message = css`
    padding: 24px 0;
    color: #cbd5e1;
    text-align: center;
`;

const emptyState = css`
    display: flex;
    min-height: 240px;
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

export default Notes;
