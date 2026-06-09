import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getNotes } from "../../api/noteApi";
import { getTodos } from "../../api/todoApi";
import { useLogout, useMe, useUpdateProfile } from "../../hooks/useAuth";

const emptyProfileForm = {
    name: "",
    email: "",
    bio: "",
};

function MyPage() {
    const navigate = useNavigate();
    const meQuery = useMe();
    const todosQuery = useQuery({
        queryKey: ["todos"],
        queryFn: getTodos,
    });
    const notesQuery = useQuery({
        queryKey: ["notes"],
        queryFn: getNotes,
    });
    const logoutMutation = useLogout();
    const updateProfileMutation = useUpdateProfile();
    const user = meQuery.data?.body;
    const todos = todosQuery.data?.body ?? [];
    const notes = notesQuery.data?.body ?? [];
    const completedTodoCount = todos.filter((todo) => todo.isCompleted ?? todo.completed).length;
    const totalTodoCount = todos.length;
    const activeTodoCount = totalTodoCount - completedTodoCount;
    const [isEditing, setIsEditing] = useState(false);
    const [profileForm, setProfileForm] = useState(emptyProfileForm);

    useEffect(() => {
        if (!user) {
            return;
        }

        setProfileForm({
            name: user.name ?? "",
            email: user.email ?? "",
            bio: user.bio ?? "",
        });
    }, [user]);

    const handleProfileFormChange = (e) => {
        setProfileForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEditStart = () => {
        if (user) {
            setProfileForm({
                name: user.name ?? "",
                email: user.email ?? "",
                bio: user.bio ?? "",
            });
        }
        setIsEditing(true);
    };

    const handleEditCancel = () => {
        setProfileForm({
            name: user?.name ?? "",
            email: user?.email ?? "",
            bio: user?.bio ?? "",
        });
        setIsEditing(false);
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const name = profileForm.name.trim();
        const email = profileForm.email.trim();
        const bio = profileForm.bio.trim();

        if (!name || !email) {
            return;
        }

        await updateProfileMutation.mutateAsync({ name, email, bio });
        setIsEditing(false);
    };

    return (
        <main css={container}>
            <section css={panel}>
                <div css={header}>
                    <div>
                        <h1>마이페이지</h1>
                        <span>프로필과 활동을 한눈에 확인하세요.</span>
                    </div>
                    <div css={headerActions}>
                        <button type="button" onClick={() => navigate("/dash")}>
                            대시보드
                        </button>
                        <button type="button" onClick={() => navigate("/notes")}>
                            메모장
                        </button>
                        <button type="button" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
                            로그아웃
                        </button>
                    </div>
                </div>

                {meQuery.isLoading && <p css={message}>불러오는 중...</p>}
                {meQuery.isError && <p css={message}>사용자 정보를 불러오지 못했습니다.</p>}

                {!!user && !isEditing && (
                    <div css={contentStack}>
                        <section css={profileHero}>
                            <div css={avatarWrap}>
                                <div css={avatar}>{(user.name || user.username || "?").slice(0, 1).toUpperCase()}</div>
                            </div>
                            <div css={heroBody}>
                                <div css={heroTitleRow}>
                                    <div>
                                        <h2>{user.name}</h2>
                                        <p>{user.email}</p>
                                    </div>
                                    <span css={roleBadge}>{user.role || "USER"}</span>
                                </div>
                                <p css={heroBio}>{user.bio || "아직 자기소개가 없습니다. 프로필을 수정해 나를 소개해보세요."}</p>
                                <button type="button" css={primaryButton} onClick={handleEditStart}>
                                    프로필 수정
                                </button>
                            </div>
                        </section>

                        <section css={activityPanel}>
                            <div css={sectionTitle}>
                                <strong>내 활동 요약</strong>
                                <span>Todo와 메모 데이터를 기준으로 계산됩니다.</span>
                            </div>
                            <div css={activityGrid}>
                                <ActivityItem label="총 Todo" value={totalTodoCount} />
                                <ActivityItem label="완료 Todo" value={completedTodoCount} />
                                <ActivityItem label="진행 중 Todo" value={activeTodoCount} />
                                <ActivityItem label="작성 메모" value={notes.length} />
                            </div>
                            {(todosQuery.isLoading || notesQuery.isLoading) && <p css={subMessage}>활동 데이터를 불러오는 중...</p>}
                            {(todosQuery.isError || notesQuery.isError) && <p css={subMessage}>활동 요약을 불러오지 못했습니다.</p>}
                        </section>

                        <section css={accountCard}>
                            <div css={sectionTitle}>
                                <strong>계정 정보</strong>
                                <span>로그인과 식별에 사용되는 기본 정보입니다.</span>
                            </div>
                            <div css={accountGrid}>
                                <InfoChip label="사용자명" value={user.username} />
                                <InfoChip label="이름" value={user.name} />
                                <InfoChip label="이메일" value={user.email} />
                                <InfoChip label="권한" value={user.role} />
                            </div>
                        </section>
                    </div>
                )}

                {!!user && isEditing && (
                    <form css={editCard} onSubmit={handleProfileSubmit}>
                        <div css={editHeader}>
                            <div css={smallAvatar}>{(profileForm.name || user.username || "?").slice(0, 1).toUpperCase()}</div>
                            <div>
                                <strong>프로필 수정</strong>
                                <span>이름, 이메일, 자기소개를 업데이트합니다.</span>
                            </div>
                        </div>
                        <label>
                            <span>이름</span>
                            <input
                                type="text"
                                name="name"
                                maxLength={50}
                                value={profileForm.name}
                                onChange={handleProfileFormChange}
                            />
                        </label>
                        <label>
                            <span>이메일</span>
                            <input
                                type="email"
                                name="email"
                                maxLength={100}
                                value={profileForm.email}
                                onChange={handleProfileFormChange}
                            />
                        </label>
                        <label>
                            <span>자기소개</span>
                            <textarea
                                name="bio"
                                maxLength={500}
                                placeholder="간단한 자기소개를 입력하세요"
                                value={profileForm.bio}
                                onChange={handleProfileFormChange}
                            />
                        </label>
                        <div css={formActions}>
                            <button type="button" onClick={handleEditCancel}>
                                취소
                            </button>
                            <button type="submit" disabled={updateProfileMutation.isPending}>
                                저장
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </main>
    );
}

function ActivityItem({ label, value }) {
    return (
        <div>
            <strong>{value}</strong>
            <span>{label}</span>
        </div>
    );
}

function InfoChip({ label, value }) {
    return (
        <div>
            <span>{label}</span>
            <strong>{value || "-"}</strong>
        </div>
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
    width: min(880px, 100%);
    padding: 34px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 18px;
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
    gap: 18px;
    margin-bottom: 24px;

    h1 {
        color: #ffffff;
        font-size: 2rem;
        font-weight: 800;
    }

    span {
        color: #94a3b8;
    }

    @media (max-width: 720px) {
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

const contentStack = css`
    display: grid;
    gap: 14px;
`;

const profileHero = css`
    display: grid;
    grid-template-columns: 118px minmax(0, 1fr);
    gap: 22px;
    padding: 24px;
    border: 1px solid rgba(0, 168, 255, 0.26);
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(0, 168, 255, 0.16), rgba(255, 255, 255, 0.07));
    box-shadow: 0 18px 42px rgba(0, 168, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.04);

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 16px;
        text-align: center;
    }
`;

const avatarWrap = css`
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

const avatar = css`
    display: grid;
    width: 104px;
    height: 104px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    background: radial-gradient(circle at 32% 28%, #7dd3fc, #00a8ff 54%, #075985);
    color: #ffffff;
    font-size: 2.4rem;
    font-weight: 900;
    box-shadow: 0 18px 34px rgba(0, 168, 255, 0.24);
`;

const heroBody = css`
    display: grid;
    gap: 14px;
    min-width: 0;
`;

const heroTitleRow = css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;

    h2 {
        color: #ffffff;
        font-size: 1.6rem;
        font-weight: 900;
        overflow-wrap: anywhere;
    }

    p {
        margin-top: 4px;
        color: #a5b4fc;
        overflow-wrap: anywhere;
    }

    @media (max-width: 640px) {
        align-items: center;
        flex-direction: column;
    }
`;

const roleBadge = css`
    flex-shrink: 0;
    padding: 6px 10px;
    border: 1px solid rgba(125, 211, 252, 0.28);
    border-radius: 999px;
    background: rgba(0, 168, 255, 0.18);
    color: #7dd3fc;
    font-size: 0.78rem;
    font-weight: 900;
`;

const heroBio = css`
    min-height: 54px;
    color: #dbeafe;
    line-height: 1.65;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
`;

const primaryButton = css`
    justify-self: start;
    height: 40px;
    padding: 0 16px;
    border-radius: 10px;
    background: #00a8ff;
    color: #ffffff;
    font-weight: 900;

    @media (max-width: 640px) {
        justify-self: stretch;
    }
`;

const activityPanel = css`
    padding: 18px;
    border: 1px solid rgba(0, 168, 255, 0.2);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.055);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.035);
`;

const sectionTitle = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;

    strong {
        color: #ffffff;
        font-size: 1.02rem;
    }

    span {
        color: #94a3b8;
        font-size: 0.82rem;
    }

    @media (max-width: 560px) {
        align-items: flex-start;
        flex-direction: column;
        gap: 4px;
    }
`;

const activityGrid = css`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;

    div {
        min-width: 0;
        padding: 14px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        background: rgba(15, 23, 42, 0.42);
    }

    strong {
        display: block;
        color: #ffffff;
        font-size: 1.45rem;
        font-weight: 900;
    }

    span {
        color: #94a3b8;
        font-size: 0.82rem;
    }

    @media (max-width: 680px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const accountCard = css`
    padding: 18px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.05);
`;

const accountGrid = css`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;

    div {
        min-width: 0;
        padding: 14px;
        border-radius: 12px;
        background: rgba(15, 23, 42, 0.36);
    }

    span {
        display: block;
        margin-bottom: 6px;
        color: #94a3b8;
        font-size: 0.82rem;
    }

    strong {
        color: #ffffff;
        overflow-wrap: anywhere;
    }

    @media (max-width: 560px) {
        grid-template-columns: 1fr;
    }
`;

const editCard = css`
    display: grid;
    gap: 16px;
    padding: 22px;
    border: 1px solid rgba(0, 168, 255, 0.24);
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(0, 168, 255, 0.13), rgba(255, 255, 255, 0.06));
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.035);

    label {
        display: grid;
        gap: 8px;
    }

    label > span {
        color: #cbd5e1;
        font-size: 0.9rem;
        font-weight: 800;
    }

    input,
    textarea {
        width: 100%;
        min-width: 0;
        padding: 14px 15px;
        border: 1px solid rgba(0, 168, 255, 0.24);
        border-radius: 12px;
        background: rgba(15, 23, 42, 0.5);
        color: #ffffff;
        font-size: 1rem;
    }

    textarea {
        min-height: 170px;
        line-height: 1.65;
        resize: vertical;
    }

    textarea::placeholder {
        color: rgba(226, 232, 240, 0.46);
    }

    input:focus,
    textarea:focus {
        border-color: rgba(0, 168, 255, 0.72);
        box-shadow: 0 0 0 3px rgba(0, 168, 255, 0.13);
    }
`;

const editHeader = css`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 2px;

    strong {
        display: block;
        color: #ffffff;
        font-size: 1.2rem;
        font-weight: 900;
    }

    span {
        color: #94a3b8;
        font-size: 0.9rem;
    }
`;

const smallAvatar = css`
    display: grid;
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 50%;
    background: #00a8ff;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 900;
`;

const formActions = css`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 4px;

    button {
        min-width: 76px;
        height: 40px;
        padding: 0 14px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
        color: #e2e8f0;
        font-weight: 800;
    }

    button:last-of-type {
        background: #00a8ff;
        color: #ffffff;
    }

    button:hover:not(:disabled) {
        background: rgba(0, 168, 255, 0.35);
    }

    button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }

    @media (max-width: 520px) {
        button {
            flex: 1;
        }
    }
`;

const message = css`
    padding: 20px 0;
    color: #cbd5e1;
    text-align: center;
`;

const subMessage = css`
    margin-top: 10px;
    color: #94a3b8;
    font-size: 0.86rem;
    text-align: center;
`;

export default MyPage;
