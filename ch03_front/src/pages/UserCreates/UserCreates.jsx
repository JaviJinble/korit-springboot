import { useNavigate } from "react-router";
import * as s from "./styles";
import { useState } from "react";
import axios from "axios";

function UserCreates() {
    const navigate = useNavigate();
    const emptyUser = {
        username: "",
        password: "",
        name: "",
        email: "",
    }

    const [inputValue, setInputValue] = useState(emptyUser);

    const handleInputChange = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegisterPromiseOnClick = () => {
        axios.post("http://localhost:8080/api/users", inputValue)
        .then((response) => {console.log(response)})
        .catch((error) => {console.log(error.response)})
    }

    // axios.post(url, inputValue); 객체만 넣어도 된다
    // inputValue 인터페이스를 DTO 와 맟쳐줘야한다.
    // .then로 response 안 객체 정보들을 볼수 있다. data.body, messages , status 등등 .catch로 error 메세지를 확인가능하다
    const handleSubmitClick = async () => {
        const url = "http://localhost:8080/api/users";
        await axios.post(url, inputValue);
        alert("사용자 추가 완료");
        navigate("/users");
    };

    return (
        <>
            <div css={s.layout}>
                <h1>사용자 추가 페이지</h1>

                <div css={s.form}>
                    <input type="text" name="username" placeholder="사용자이름" value={inputValue.username} onChange={handleInputChange} />
                    <input type="password" name="password" placeholder="비밀번호" value={inputValue.password} onChange={handleInputChange} />
                    <input type="text" name="name" placeholder="성명" value={inputValue.name} onChange={handleInputChange} />
                    <input type="text" name="email" placeholder="이메일" value={inputValue.email} onChange={handleInputChange} />
                </div>

                <div css={s.buttonContainer}>
                    <button onClick={() => navigate("/users")} >뒤로가기</button>
                    <button onClick={handleSubmitClick}>추가하기</button>
                </div>

            </div>
        </>
    )
}

export default UserCreates;