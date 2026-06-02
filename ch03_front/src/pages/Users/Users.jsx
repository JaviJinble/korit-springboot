import { useQuery } from "@tanstack/react-query";
import * as s from "./styles";
import axios from "axios";
import { useNavigate } from "react-router";

function Users() {
    const navigate = useNavigate();

    const usersQuery = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const url = "http://localhost:8080/api/users";
            const response = await axios.get(url);
            return response.data.body;
        }
    })

    const users = usersQuery.data;
    const isLoading = usersQuery.isLoading;

    return (
        <>
            <div css={s.table}>
                <button onClick={() => navigate("/users/create")}>사용자 추가</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>사용자이름</th>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>권한ID</th>
                            <th>권한이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && users?.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.roles?.map(role => role.roleId).join(", ")}</td>
                                <td>{user.roles?.map(role => role.roleName).join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Users;