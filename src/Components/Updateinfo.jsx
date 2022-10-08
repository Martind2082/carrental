import { useContext } from "react";
import { useRef } from "react";
import { firebasecontext } from "../FirebaseContext";

const Updateinfo = ({name, setAccount}) => {
    const {updateemail, updatepassword} = useContext(firebasecontext);
    const formRef = useRef();
    function formsubmit(e) {
        e.preventDefault();
        if (name === "Email") {
            if (formRef.current.Emailone.value === formRef.current.Emailtwo.value) {
                updateemail(formRef.current.Emailone.value);
                setAccount(false);
            } else {
                let popup = document.createElement('div');
                popup.classList.add('popup');
                popup.textContent = "Emails don't match";
                document.body.append(popup);
                setTimeout(() => {
                    popup.remove();
                }, 2000);
            }
        } else {
            if (formRef.current.Passwordone.value === formRef.current.Passwordtwo.value) {
                updatepassword(formRef.current.Passwordone.value);
                setAccount(false);
            } else {
                let popup = document.createElement('div');
                popup.classList.add('popup');
                popup.textContent = "Passwords don't match";
                document.body.append(popup);
                setTimeout(() => {
                    popup.remove();
                }, 2000);
            }
        }
    }
    return (
        <form ref={formRef} onSubmit={(e) => formsubmit(e)} className="flex flex-col py-3">
            <input required className="border-black border-[1px] rounded-[6px] pl-1" placeholder={`New ` + name} type={name === "Email" ? 'text' : 'password'} name={name + 'one'}/>
            <input required className="border-black border-[1px] rounded-[6px] my-3 pl-1" placeholder={`Confirm ` + name} type={name === "Email" ? 'text' : 'password'} name={name + 'two'}/>
            <input className="font-bold border-2 rounded-[6px] border-green-700 hover text-green-700" type="submit"/>
        </form>
    );
}
 
export default Updateinfo;