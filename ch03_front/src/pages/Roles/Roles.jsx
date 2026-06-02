import { useQuery } from "@tanstack/react-query";
import * as s from "./styles";
import axios from "axios";

function Roles() {
    const rolesQuery = useQuery({
        queryKey: ["roles"],
        queryFn: async () => {
            const url = "http://localhost:8080/api/roles";
            const response = await axios.get(url);
            return response.data;
        },
    });

    const roles = rolesQuery.data;

   return (
        <>
           <div>
                <h1>권한 목록</h1>
                <table css={s.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>권한이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles?.map(role => (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.roleName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
           </div>
        </>
    )
}

export default Roles;