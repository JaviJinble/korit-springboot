import TextButton from "../../components/buttons/TextButton/TextButton";
import Header from "../../components/Header/Header";
import * as s from "./styles";

function Register() {

    return (
           <div css={s.layout}>
             <Header>
                <TextButton>취소</TextButton>
                <h4>새로운 할 일</h4>
                <TextButton weight={600}>완료</TextButton>
             </Header>
             <main>
                <div css={s.titleAndMemo}>
                    <input type="text" placeholder="제목"/>
                    <textarea placeholder="메모" ></textarea>
                </div>
                <ul>
                    <li>
                        <div>아이콘</div>
                        <div>날짜</div>
                        <div>
                            <input type="date" />
                        </div>
                    </li>
                    <li>
                        <div>아이콘</div>
                        <div>시간</div>
                        <div>
                            <input type="time" />
                        </div>
                    </li>
                </ul>
                <ul>
                    <li>
                        <div>아이콘</div>
                        <div>카테고리</div>
                        <div>
                            <div>카테고리색상</div>
                            <div>카테고리명</div>
                            <div>화살표</div>
                        </div>
                    </li>
                    <li>
                        <div>아이콘</div>
                        <div>우선순위</div>
                        <div>
                            <div>없음</div>
                            <div>화살표</div>
                        </div>
                    </li>
                    <li>
                        <div>아이콘</div>
                        <div>깃발 표시</div>
                        <div>
                            <label htmlFor="">
                                <input type="checkbox" />
                                <div></div>
                            </label>
                        </div>
                    </li>
                </ul>
             </main>
           </div>
       )
}

export default Register;
