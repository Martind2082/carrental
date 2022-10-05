import { useRef } from "react";

const Updateinfo = ({name}) => {
    const formRef = useRef();
    function formsubmit(e) {
        e.preventDefault();
    }
    return (
        <form ref={formRef} onSubmit={(e) => formsubmit(e)} className="flex flex-col py-3">
            <input className="border-black border-[1px] rounded-[6px] pl-1" placeholder="Old Password" type="password"/>
            <input className="border-black border-[1px] rounded-[6px] my-3 pl-1" placeholder={`New ` + name} type="email"/>
            <input className="font-bold border-2 rounded-[6px] border-green-700 hover text-green-700" type="submit"/>
        </form>
    );
}
 
export default Updateinfo;