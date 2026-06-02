import { Route, Routes } from "react-router";
import Users from "./pages/Users/Users";
import Roles from "./pages/Roles/Roles";
import UserCreates from "./pages/UserCreates/UserCreates";
import UserList from "./pages/UserList/UserList";
import UserDetail from "./pages/UserDetail/UserDetail";


function App() {

   return (
        <>
           <Routes>
                <Route path="/users/create" element ={<UserCreates/>} />
                <Route path="/users/" element ={<Users />} />
                <Route path="/users/userlist" element ={<UserList />} />
                <Route path="/users/:userId" element ={<UserDetail />} />
                <Route path="/roles/create" element ={<></>} />
                <Route path="/roles" element ={<Roles  />} />
                <Route path="*" element={<>페이지를 찾을 수 없습니다.</>} />
           </Routes>
        </>
    )
}

export default App;