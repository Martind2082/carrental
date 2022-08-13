import { useContext } from "react";
import { firebasecontext } from "../FirebaseContext";
import logo from '../Images/logo.png';
import {Link, useNavigate} from 'react-router-dom';
import {BsXLg} from 'react-icons/bs'
import { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";

const Header = ({signedinuser, uid}) => {
    let navigate = useNavigate();
    const {user, signout} = useContext(firebasecontext);
    const [account, setAccount] = useState(false);
    const editinputRef = useRef();
    const [editing, setEditing] = useState(false);
    const [editvalue, setEditvalue] = useState('');
    const signedinuserRef = useRef();

    const loginclick = () => {
        if (user) {
            setAccount(true);
        } else {
            navigate('/login');
        }
    }
    const accountdisplay = () => {
        return account ? 'visible' : 'hidden'
    }
    const accounttranslate = () => {
        return account ? 'translateX(0%)' : 'translateX(100%)'
    }
    const handleEditing = () => {
        if (!editing) {
            setEditing(true);
            signedinuserRef.current.style.display = 'none';
            editinputRef.current.style.display = 'block';
            return;
        }
        if (editvalue === '') {
            setEditing(false);
            setEditvalue('');
            signedinuserRef.current.style.display = 'block';
            editinputRef.current.style.display = 'none';
            return;
        }
        updateDoc(doc(db, 'names', uid), {
            name: editvalue
        }).then(() => {
            setEditvalue('');
            setEditing(false);
            signedinuserRef.current.style.display = 'block';
            editinputRef.current.style.display = 'none';
        })
    }
    return (
        <header className="flex justify-between items-center w-screen h-[15vh] fixed font-bold z-[10]">
            <div id="account" className='absolute top-0 right-0 w-[35%] flex flex-col items-center bg-white h-screen z-[20]' style={{transition: "all 400ms ease", visibility: accountdisplay(), transform: accounttranslate()}}>
                <BsXLg onClick={() => setAccount(false)} className='hover absolute right-10 top-4 text-3xl'/>
                <p className='text-center text-3xl font-bold my-[3rem]'>Account</p>
                <div className='flex flex-col items-center justify-center px-3'>
                    <p className='font-bold text-2xl text-center mb-1'>Display name:</p>
                    <input style={{display: 'none'}} type="text" ref={editinputRef} onChange={(e) => setEditvalue(e.target.value)} value={editvalue} className="border-2 border-black rounded-lg px-1 w-[90%]"/>
                    <div style={{display: 'block'}} ref={signedinuserRef} className='text-2xl ml-4 text-center mb-1'>{signedinuser}</div>
                    <button onClick={handleEditing} className='hover:underline border-2 mt-1 border-red-300 rounded-lg px-5 text-red-500 font-bold'>{!editing ? 'Edit' : editvalue.length === 0 ? 'Cancel' : 'Done'}</button>
                </div>
                <button onClick={() => {signout(); setAccount(false)}} className='my-10 hover:underline border-2 border-orange-400 rounded-lg px-5 py-1 text-orange-400 font-bold'>Sign out</button>
                <button className='hover:underline border-2 border-orange-400 rounded-lg px-5 py-1 text-orange-400 font-bold'>Delete Account</button>
            </div>
            <img onClick={() => navigate("/")} className="hover h-full ml-[10%]" src={logo} />
            <div className="flex w-max justify-between items-center px-[2rem] text-2xl mr-5">
                <Link to="/"><div className='hover:underline hover p-3'>Home</div></Link>
                <Link to="/about"><div className='hover:underline hover p-3'>About us</div></Link>
                <Link to="/cars"><div className='hover:underline hover p-3'>Cars</div></Link>
                <div onClick={loginclick} className='hover:underline hover p-3'>{user ? 'Account' : 'Login | Sign up'}</div>
            </div>
        </header>
    );
}
 
export default Header;