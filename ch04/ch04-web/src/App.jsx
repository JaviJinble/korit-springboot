import { Route, Routes } from "react-router";
import { Global } from "@emotion/react";
import ProtectedRoutes, { PublicOnlyRoute } from "./components/ProtectedRoutes";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import DeepSpaceLayout from "./components/DeepSpaceLayout/DeepSpaceLayout";
import { globalStyles } from "./styles/global";
import Dash from "./pages/Dash/Dash";
import MyPage from "./pages/MyPage/MyPage";

function App() {

    return (
        <>
            <Global styles={globalStyles} />
            <DeepSpaceLayout>
                <Routes>
                    <Route path="/" element={<></>} />

                    <Route element={<PublicOnlyRoute />}>
                      <Route path="/auth/signup" element={<SignUp />} />
                      <Route path="/auth/signin" element={<SignIn />} />
                    </Route>

                    <Route element={<ProtectedRoutes />}>
                      <Route path="/dash" element={<Dash />} />
                      <Route path="/mypage" element={<MyPage />} />
                    </Route>
                </Routes>
            </DeepSpaceLayout>
        </>
    )
}

export default App;
