import { Route, Routes } from "react-router";
import { ProtectedRoutes, PublicOnlyRoute } from "./components/routes/ProtectedRoutes";
import Login from "./pages/Login/Login";
import LoginCallback from "./pages/LoginCallback/LoginCallback";
import { Global } from "@emotion/react";
import { global } from "./styles/global";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import TodoList from "./pages/TodoList/TodoList";

function App() {
    return (
        <>
            <Global styles={global} />
            <RootLayout>
                <Routes>
                    <Route element={<PublicOnlyRoute />}>
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/oauth2/callback" element={<LoginCallback />} />
                    </Route>

                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<Home />} />

                        <Route path="/register" element={<Register />} />
                        <Route path="/categories/:categoryName/todos" element={<TodoList />} />
                    </Route>
                </Routes>
            </RootLayout>
        </>
    );
}

export default App;