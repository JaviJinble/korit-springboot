import { ProtecctedRoutes, PublicOnlyRoute } from "./components/routes/ProtectedRoutes";
import { Route, Routes } from "react-router";
import LoginPage from "./pages/Login/LoginPage";
import LoginCallback from "./pages/LoginCallback/LoginCallback";
import MainPage from "./pages/MainPage";

function App() {

  return (
    <>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/auth/login" element={<LoginPage/>} />
          <Route path="/auth/oauth2/callback" element={<LoginCallback/>} />
        </Route>
        <Route element={<ProtecctedRoutes />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/main/category/:id" element={<MainPage />} />
          <Route path="/main/flagged" element={<MainPage />} />
          <Route path="/main/completed" element={<MainPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
