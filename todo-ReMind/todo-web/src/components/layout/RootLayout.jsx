import * as s from "./styles";

function RootLayout({ children }) {

    return (
           <div css={s.rootLayout}>
                {children}
           </div>
       )
}

export default RootLayout;
