import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import { useLogout, useMe } from "../../hooks/useAuth";

function MyPage() {
    const navigate = useNavigate();
    const meQuery = useMe();
    const logoutMutation = useLogout();
    const user = meQuery.data?.body;

    return (
        <main css={container}>
            <section css={panel}>
                <div css={header}>
                    <h1>My Page</h1>
                    <span>Account</span>
                </div>

                {meQuery.isLoading && <p css={message}>불러오는 중...</p>}
                {meQuery.isError && <p css={message}>내 정보를 불러오지 못했습니다.</p>}

                {!!user && (
                    <div css={infoList}>
                        <div>
                            <span>username</span>
                            <strong>{user.username}</strong>
                        </div>
                        <div>
                            <span>name</span>
                            <strong>{user.name}</strong>
                        </div>
                        <div>
                            <span>email</span>
                            <strong>{user.email}</strong>
                        </div>
                        <div>
                            <span>role</span>
                            <strong>{user.role}</strong>
                        </div>
                    </div>
                )}

                <div css={actions}>
                    <button type="button" onClick={() => navigate("/dash")}>
                        Todo로 이동
                    </button>
                    <button type="button" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
                        로그아웃
                    </button>
                </div>
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
    width: min(520px, 100%);
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
        color: #ffffff;
        font-size: 2rem;
        font-weight: 700;
    }

    span {
        color: #94a3b8;
    }
`;

const message = css`
    padding: 20px 0;
    color: #cbd5e1;
    text-align: center;
`;

const infoList = css`
    display: flex;
    flex-direction: column;
    gap: 10px;

    div {
        display: grid;
        grid-template-columns: 110px 1fr;
        gap: 14px;
        padding: 14px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.06);
    }

    span {
        color: #94a3b8;
        font-size: 0.9rem;
    }

    strong {
        min-width: 0;
        color: #ffffff;
        overflow-wrap: anywhere;
    }
`;

const actions = css`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 24px;

    button {
        height: 38px;
        padding: 0 14px;
        border-radius: 9px;
        background: rgba(255, 255, 255, 0.1);
        color: #e2e8f0;
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

export default MyPage;
