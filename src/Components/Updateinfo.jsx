import { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { firebasecontext } from "../FirebaseContext";
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import { useState } from "react";

const Updateinfo = ({name, setAccount, updateemailref, updatepasswordref}) => {
    const {updateemail, updatepassword, loginerror, setnewuserbyupdateprofile} = useContext(firebasecontext);
    const formRef = useRef();
    const [oldpasswordtext, setoldpasswordtext] = useState(false);
    const [confirmpasswordtext, setconfirmpasswordtext] = useState(false);
    function formsubmit(e) {
        e.preventDefault();
        if (name === "Email") {
            if (formRef.current.Emailone.value === formRef.current.Emailtwo.value) {
                updateemail(formRef.current.Emailone.value, formRef.current.oldpassword.value, e);
                setAccount(false);
                formRef.current.oldpassword.value = '';
                formRef.current.Emailone.value = '';
                formRef.current.Emailtwo.value = '';
                updateemailref.current.style.display = 'none';
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
                updatepassword(formRef.current.Passwordone.value, formRef.current.oldpassword.value, e);
                setAccount(false);
                formRef.current.oldpassword.value = '';
                formRef.current.Passwordone.value = '';
                formRef.current.Passwordtwo.value = '';
                updatepasswordref.current.style.display = 'none';
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
    //when user updates email/password, if password is incorrect
    useEffect(() => {
        if (loginerror !== '') {
            setnewuserbyupdateprofile(true);
            let popup = document.createElement('div');
            popup.classList.add('popup');
            popup.textContent = "Incorrect Password";
            document.body.append(popup);
            setTimeout(() => {
                popup.remove();
            }, 2000);
        }
    }, [loginerror])
    return (
        <form ref={formRef} onSubmit={(e) => formsubmit(e)} className="flex flex-col py-3">
            <div className="border-black border-[1px] rounded-[6px] flex items-center mb-2">
                <input required className="rounded-[6px] pl-1 outline-none" placeholder="Old Password" type={oldpasswordtext ? 'text' : 'password'} name="oldpassword"/>
                <div onClick={() => setoldpasswordtext(!oldpasswordtext)} className="text-[1.2rem] pr-1 hover">{oldpasswordtext ? <FaEye /> : <FaEyeSlash />}</div>
            </div>
            <input required className="border-black border-[1px] rounded-[6px] pl-1" placeholder={`New ` + name} type={name === "Email" ? 'text' : 'password'} name={name + 'one'}/>
            <div>
                {
                    name === 'Email' ? <input required className="border-black border-[1px] rounded-[6px] mt-2 pl-1 w-full" placeholder="Confirm Email" type="text" name={name + 'two'}/> :
                    <div className="border-black border-[1px] rounded-[6px] flex items-center mt-2">
                        <input required className="rounded-[6px] pl-1 outline-none" placeholder="Confirm Password" type={confirmpasswordtext ? 'text' : 'password'} name={name + 'two'}/>
                        <div onClick={() => setconfirmpasswordtext(!confirmpasswordtext)} className="text-[1.2rem] pr-1 hover">{confirmpasswordtext ? <FaEye /> : <FaEyeSlash />}</div>
                    </div>
                }
            </div>
            <input className="font-bold border-2 rounded-[6px] border-green-700 hover text-green-700 mt-4" type="submit"/>
        </form>
    );
}
 
export default Updateinfo;