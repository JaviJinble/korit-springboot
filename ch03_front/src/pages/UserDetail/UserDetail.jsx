import axios from "axios";
import * as s from "./styles";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

function UserDetail() {
    const { userId } = useParams();
    const emptyUser = {
        id: "",
        username: "",
        name: "",
        email: "",
        roles: [],
    }
    const [user, setUser] = useState(emptyUser);

    const getUserReq = async () => {
        let response = null;

        try {
            response = await axios.get(`http://localhost:8080/api/users/${userId}`)

        } catch (error) {
            response = error.response;
        }
        setUser(response.data.body);
    }

    useEffect(() => {
        getUserReq();
    }, []);

    return (
        <>
            <ul>
                <li>ID: {user.id}</li>
                <li>사용자이름: {user.username}</li>
                <li>성명: {user.name}</li>
                <li>이메일: {user.email}</li>
                <li>
                    권한:
                    <ol>
                        {user.roles.map(role => <li key={role.roleId}>{role.roleName}</li>)}
                    </ol>
                </li>
            </ul>
        </>
    )
}

export default UserDetail;