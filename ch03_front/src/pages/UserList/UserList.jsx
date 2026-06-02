import axios from "axios";
import * as s from "./styles";
import { useState } from "react";

function UserList() {
    const [ users, setUsers ] = useState([]);

    const handleUserListLoadOnClick = async() => {
        let response = null;
        try {
            response = await axios.get("http://localhost:8080/api/users");
        } catch (error) {
            response = error.response;
        }
        console.log(response);
        setUsers(response.data.body);

    }

    return (
        <>
            <div>
                <div>
                    <button onClick={handleUserListLoadOnClick}>사용자정보 불러오기</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>사용자이름</th>
                            <th>성명</th>
                            <th>이메일</th>
                            <th>권한</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.roles.map(role => <span key={user.id + "," + role.roleId}>[{role.roleId}:{role.roleName}]</span>)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default UserList;