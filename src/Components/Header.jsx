import { useContext } from "react";
import { firebasecontext } from "../FirebaseContext";
import logo from '../Images/logo.png';
import {Link, useNavigate} from 'react-router-dom';
import {BsXLg} from 'react-icons/bs'
import { useState } from "react";
import { db } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import {GiHomeGarage} from 'react-icons/gi'
import {BiMenu} from 'react-icons/bi'
import { deleteUser } from "firebase/auth";
import Updateinfo from "./Updateinfo";

const Header = () => {
    let navigate = useNavigate();
    let width = window.innerWidth;
    const {user, signout, signedinuser, uid} = useContext(firebasecontext);
    const [account, setAccount] = useState(false);
    const editinputRef = useRef();
    const [editing, setEditing] = useState(false);
    const [editvalue, setEditvalue] = useState('');
    const signedinuserRef = useRef();
    const menuref = useRef();
    const updateemailRef = useRef();
    const updatepasswordRef = useRef();

    const loginclick = () => {
        if (menuref.current.style.opacity !== '0') {
            menuref.current.style.transform = 'translateX(100%)';
            menuref.current.style.opacity = '0';
            menuref.current.style.visibility = 'hidden';
        }
        if (user) {
            setAccount(true);
        } else {
            navigate('/login');
        }
    }
    const accountdisplay = () => {
        return account ? 'flex' : 'none'
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
    const menuclick = () => {
        if (menuref.current.style.opacity === '0') {
            menuref.current.style.transform = 'translateX(0%)';
            menuref.current.style.opacity = '1';
            menuref.current.style.visibility = 'visible';
        } else {
            menuref.current.style.transform = 'translateX(100%)';
            menuref.current.style.opacity = '0';
            menuref.current.style.visibility = 'hidden';
        }
    }
    let usercopy = user;
    let uidcopy = uid;
    const deleteAccount = () => {
        deleteUser(usercopy)
            .then(() => deleteDoc(doc(db, 'names', uidcopy)))
            .catch(err => alert(err));
    }

    function updatebuttonclick(button) {
        if (button === 'email') {
            if (updateemailRef.current.style.display !== 'flex') {
                updateemailRef.current.style.display = 'flex';
            } else {
                updateemailRef.current.style.display = 'none'
            }
        } else {
            if (updatepasswordRef.current.style.display !== 'flex') {
                updatepasswordRef.current.style.display = 'flex';
            } else {
                updatepasswordRef.current.style.display = 'none'
            }
        }
    }
    return (
        <header className="overflow-x-hidden">
            <div className='absolute top-0 right-0 flex flex-col items-end pr-10 bg-white h-[170%] z-[20]' style={{width: width > 900 ? '30%' : '100%', minWidth: '400px', transition: "all 400ms ease", display: accountdisplay(), transform: accounttranslate()}}>
                <BsXLg onClick={() => setAccount(false)} className='hover absolute right-10 top-4 text-3xl z-[10000]'/>
                <p className='text-center text-2xl md:text-3xl font-bold mt-[3.5rem] mb-[2rem]'>Account</p>
                <div className='flex flex-col items-end justify-center'>
                    <p className='font-bold text-xl md:text-2xl text-center mb-1'>Display name:</p>
                    <input style={{display: 'none'}} type="text" ref={editinputRef} onChange={(e) => setEditvalue(e.target.value)} value={editvalue} className="border-2 border-black rounded-lg px-1 w-[90%]"/>
                    <div style={{display: 'block'}} ref={signedinuserRef} className='text-2xl ml-4 text-center mb-1'>{signedinuser}</div>
                    <button onClick={handleEditing} className='hover:underline border-2 mt-1 border-red-300 rounded-lg px-5 text-red-500 font-bold'>{!editing ? 'Edit' : editvalue.length === 0 ? 'Cancel' : 'Done'}</button>
                </div>
                <div className="flex flex-col items-end mt-3">
                    <p className="font-bold text-xl">Email:</p>
                    <div className="text-[1.2rem]">{user?.email}</div>
                </div>
                <button onClick={() => updatebuttonclick('email')} className='mt-10 hover:underline border-2 border-orange-700 rounded-lg px-5 py-1 text-orange-700 font-bold'>Email reset</button>
                <div className="hidden" ref={updateemailRef}>
                    <Updateinfo updateemailref={updateemailRef} updatepasswordref={updatepasswordRef} setAccount={setAccount} name="Email"/>
                </div>
                <button onClick={() => updatebuttonclick('password')} className='mt-5 hover:underline border-2 border-orange-700 rounded-lg px-5 py-1 text-orange-700 font-bold'>Password reset</button>
                <div className="hidden" ref={updatepasswordRef}>
                    <Updateinfo updateemailref={updateemailRef} updatepasswordref={updatepasswordRef} setAccount={setAccount} name="Password" />
                </div>
                <button onClick={() => {signout(); setAccount(false)}} className='mt-8 mb-5 hover:underline border-2 border-orange-400 rounded-lg px-5 py-1 text-orange-400 font-bold'>Sign out</button>
                <button onClick={() => {signout(); deleteAccount(); setAccount(false);}} className='hover:underline border-2 border-orange-400 rounded-lg px-5 py-1 text-orange-400 font-bold'>Delete Account</button>
            </div>
            {
                width > 900 ? <div className="flex justify-between items-center w-screen h-[15vh] fixed font-bold z-[10]">
                    <img onClick={() => navigate("/")} className="hover h-full ml-[10%]" src={logo} />
                    <div className="flex w-max justify-between items-center px-[2rem] text-2xl mr-5">
                        <Link to="/"><div className='hover:underline hover p-3'>Home</div></Link>
                        <Link to="/about"><div className='hover:underline hover p-3 text-center'>About us</div></Link>
                        <Link to="/cars"><div className='hover:underline hover p-3'>Cars</div></Link>
                        <Link to="/garage"><GiHomeGarage className="hover text-[3rem]" style={{padding: '3'}}/></Link>
                        <div onClick={loginclick} className='hover:underline hover p-3 text-center'>{user ? 'Account' : 'Login | Sign up'}</div>
                    </div>
                </div> : <div className="flex justify-evenly items-center w-screen h-[13vh] fixed font-bold z-[5]">
                    <div ref={menuref} className="absolute bg-slate-600 top-0 w-full h-[100vh]" style={{transition: 'all 400ms ease', transform: 'translateX(100%)', opacity: '0', visibility: "hidden"}}>
                        <div className="w-full h-[80vh] flex flex-col items-center justify-evenly text-xl">
                            <Link onClick={menuclick} to="/"><div className='text-white'>Home</div></Link>
                            <Link onClick={menuclick} to="/about"><div className='text-white text-center'>About us</div></Link>
                            <Link onClick={menuclick} to="/cars"><div className='text-white'>Cars</div></Link>
                            <Link onClick={menuclick} to="/garage" className="text-white">Garage</Link> 
                        </div>
                    </div>
                    <img onClick={() => navigate("/")} className="hover h-[80%] ml-[5%]" src={logo} />
                    <div className="flex justify-between items-center z-[5]">
                        <div onClick={loginclick} className='hover:underline hover p-3 text-xl text-center'>{user ? 'Account' : 'Login | Sign up'}</div>
                        <BiMenu onClick={menuclick} className="hover text-[2rem] mr-[1.5rem] ml-[0.5rem] z-[1]"/> 
                    </div>
                </div>
            }
        </header>
    );
}
 
export default Header;