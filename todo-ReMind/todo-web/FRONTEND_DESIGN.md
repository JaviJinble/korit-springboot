# Todo-Web 프론트엔드 설계서

## 접속 URL 설계

| URL | 페이지 | 설명 | 인증 필요 |
|-----|--------|------|----------|
| `/` | 홈 (리다이렉트) | 로그인 여부에 따라 분기 | - |
| `/login` | 로그인 페이지 | Google/Naver/Kakao 소셜 로그인 버튼 | ❌ |
| `/auth/oauth2/callback` | OAuth2 콜백 | 백엔드 리다이렉트 수신, JWT 저장 후 `/main`으로 이동 | ❌ |
| `/main` | 메인 (전체 할일) | 전체 Todo 목록 표시 | ✅ |
| `/main/category/:id` | 카테고리별 할일 | 특정 카테고리 Todo 목록 | ✅ |
| `/main/flagged` | 깃발 표시 할일 | isFlagged=true인 Todo 목록 | ✅ |
| `/main/completed` | 완료된 할일 | isCompleted=true인 Todo 목록 | ✅ |

---

## 필요한 파일 리스트

```
todo-web/src/
│
├── main.jsx                          # React 진입점 (BrowserRouter 설정)
├── App.jsx                           # 라우터 설정 (Routes/Route 정의)
│
├── api/
│   ├── axiosInstance.js              # Axios 기본 설정 (baseURL, Authorization 헤더 인터셉터)
│   ├── todoApi.js                    # Todo CRUD API 함수
│   ├── categoryApi.js                # Category CRUD API 함수
│   └── userApi.js                    # 유저 정보 API 함수
│
├── store/
│   ├── authStore.js                  # Zustand: accessToken, userId 상태
│   └── todoStore.js                  # Zustand: 선택된 카테고리 상태
│
├── hooks/
│   ├── useTodos.js                   # React Query: Todo 목록 fetch/mutation
│   ├── useCategories.js              # React Query: Category 목록 fetch/mutation
│   └── useMe.js                      # React Query: 유저 정보 fetch
│
├── pages/
│   ├── LoginPage.jsx                 # 소셜 로그인 버튼 페이지
│   ├── OAuth2CallbackPage.jsx        # accessToken 파싱 → 저장 → 리다이렉트
│   └── MainPage.jsx                  # Layout: 사이드바 + 콘텐츠 영역
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx               # 카테고리 목록, 특수 필터(깃발/완료) 메뉴
│   │   └── ProtectedRoute.jsx        # 미인증 시 /login으로 리다이렉트
│   │
│   ├── todo/
│   │   ├── TodoList.jsx              # Todo 목록 렌더링
│   │   ├── TodoItem.jsx              # 개별 Todo (체크박스, 제목, 깃발)
│   │   ├── TodoCreateModal.jsx       # Todo 생성 모달 (제목, 메모, 날짜, 우선순위)
│   │   └── TodoEditModal.jsx         # Todo 수정 모달
│   │
│   └── category/
│       ├── CategoryItem.jsx          # 사이드바 카테고리 항목 (아이콘, 이름, 미완료 수)
│       ├── CategoryCreateModal.jsx   # 카테고리 생성 모달 (이름, 색상, 아이콘)
│       └── CategoryEditModal.jsx     # 카테고리 수정 모달
│
└── styles/
    └── global.css                    # 전역 스타일
```

---

## 요구사항 정리

### 1. 인증 (Auth)

- OAuth2 소셜 로그인 지원: **Google, Naver, Kakao**
- 로그인 성공 시 백엔드가 `/auth/oauth2/callback?accessToken={token}`으로 리다이렉트
- `OAuth2CallbackPage`에서 URL 쿼리 파라미터의 `accessToken`을 파싱해 **localStorage에 저장**
- 이후 모든 API 요청 헤더에 `Authorization: Bearer {token}` 자동 첨부 (Axios 인터셉터)
- 인증 없이 `/main` 접근 시 `/login`으로 리다이렉트 (`ProtectedRoute`)

### 2. 사이드바

- 상단: 로그인된 유저 **프로필 이미지 + 닉네임**
- 특수 목록: **전체**, **깃발 표시**, **완료됨**
- 카테고리 목록: 이름, 아이콘, 색상, **미완료 Todo 수 배지** 표시
- 하단: **카테고리 추가** 버튼

### 3. Todo 목록

- 선택된 카테고리/필터에 따라 Todo 필터링 (클라이언트 사이드 필터)
- Todo 항목: **체크박스** (완료 토글), **제목**, **날짜**, **우선순위**, **깃발** 버튼
- 완료 체크 시 `PATCH /api/todos/{id}/complete` 호출 → 즉시 UI 반영
- 깃발 클릭 시 `PUT /api/todos/{id}` (isFlagged 토글)

### 4. Todo 생성/수정

- **생성**: 제목(필수), 카테고리 선택, 메모, 마감일/시간, 우선순위(0~3), 깃발
- **수정**: 생성 폼과 동일한 필드, 기존 값 pre-fill
- **삭제**: 수정 모달 하단 삭제 버튼

### 5. 카테고리 관리

- **생성**: 이름(필수, 중복 불가), 색상(color picker), 아이콘(이모지 선택)
- **수정**: 동일 필드
- **삭제**: 해당 카테고리의 Todo도 함께 정리 필요 (백엔드 정책 확인)

### 6. 상태 관리 (Zustand)

- `authStore`: `accessToken`, `userId` 전역 상태
- `todoStore`: 현재 선택된 카테고리 ID / 필터 타입 (`all` | `flagged` | `completed` | `category`)

### 7. 서버 상태 관리 (React Query)

- `useTodos`: Todo 목록 fetch, create/update/delete mutation
- `useCategories`: Category 목록 + 미완료 수 fetch, create/update/delete mutation
- `useMe`: 유저 정보 fetch (사이드바 프로필)

---

## 백엔드 API 요약

모든 요청에 `Authorization: Bearer {accessToken}` 헤더 필요

| 기능 | Method | Endpoint | 비고 |
|------|--------|----------|------|
| 내 정보 조회 | GET | `/api/users/me` | |
| 카테고리 목록 | GET | `/api/categories` | |
| 카테고리 생성 | POST | `/api/categories` | |
| 카테고리 수정 | PUT | `/api/categories/{id}` | |
| 카테고리 삭제 | DELETE | `/api/categories/{id}` | |
| 카테고리별 미완료 수 | GET | `/api/categories/count/completion/not` | |
| Todo 목록 | GET | `/api/todos` | |
| Todo 생성 | POST | `/api/todos` | |
| Todo 수정 | PUT | `/api/todos/{id}` | |
| 완료 토글 | PATCH | `/api/todos/{id}/complete` | |
| Todo 삭제 | DELETE | `/api/todos/{id}` | |

---

## 개발 순서 (권장)

1. `api/axiosInstance.js` — Axios 인터셉터 설정
2. `store/authStore.js` — 인증 상태 관리
3. `store/todoStore.js` — 필터/카테고리 선택 상태
4. `api/` — API 함수 전체 작성
5. `hooks/` — React Query 훅 작성
6. `pages/LoginPage.jsx` + `OAuth2CallbackPage.jsx` — 로그인 플로우
7. `components/layout/ProtectedRoute.jsx` — 인증 가드
8. `pages/MainPage.jsx` + `components/layout/Sidebar.jsx` — 메인 레이아웃
9. `components/todo/` — Todo CRUD UI
10. `components/category/` — Category CRUD UI
11. `App.jsx` — 라우터 최종 조립
