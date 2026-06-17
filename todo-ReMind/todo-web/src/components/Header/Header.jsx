import * as s from "./styles";
function Header({ children }) {

    return (
           <>
             <header css={s.layout}>
                {children}
             </header>
           </>
       )
}

export default Header;