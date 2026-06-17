import { PuffLoader } from "react-spinners";
import * as s from "./styles";
function Spinners() {

    return (
           <>
             <div css={s.layout}>
                <PuffLoader color="#ffffff"/>
             </div>
           </>
       )
}

export default Spinners;