import { useContext, useRef } from 'react';
import {Link} from 'react-router-dom';
import { firebasecontext } from '../FirebaseContext';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import {FaEnvelope, FaLock, FaEye, FaEyeSlash} from 'react-icons/fa';
import { useState } from 'react';
import {GoogleButton} from 'react-google-button'

const Login = () => {
    let width = window.innerWidth;
    const {login, user, signinwithgoogle, loginerror, setloginerror} = useContext(firebasecontext);
    let navigate = useNavigate();
    const form = useRef();
    useEffect(() => {
        user && navigate('/')
    }, [user])
    const [seepassword, setseepassword] = useState(false);
    //if there are red message errors in login boxes, it will reset them
    function resetloginerrors() {
        setloginerror('');
        document.getElementById('loginemail').style.border = '1.5px solid gray';
        document.getElementById('loginpassword').style.border = '1.5px solid gray';
        document.getElementById('loginemailerror').textContent = '';
        document.getElementById('loginpassworderror').textContent = '';
    }
    useEffect(() => {
        if (loginerror === '') {
            resetloginerrors();
            return;
        }
        if (loginerror !== '') {
            if (loginerror === 'Incorrect Password') {
                document.getElementById('loginpassword').style.border = '1.5px solid red';
                document.getElementById('loginpassworderror').textContent = 'Incorrect Password';
                document.getElementById('loginemailerror').textContent = '';
                document.getElementById('loginemail').style.border = '1.5px solid gray';
            } else {
                document.getElementById('loginemail').style.border = '1.5px solid red';
                document.getElementById('loginemailerror').textContent = loginerror;
                document.getElementById('loginpassword').style.border = '1.5px solid gray';
                document.getElementById('loginpassworderror').textContent = '';
            }
        }
    }, [loginerror])
    return (
        <div className='flex' style={{justifyContent: width > 700 ? 'start' : 'center'}}> 
            <img className="w-screen h-screen opacity-60" src="https://www.dollar.com/~/media/Dollar/Images/Business/Government/0618-business-government-car-tire-road.ashx"/>
            <div className='absolute rounded-[15px] top-[15vh] ml-[5%] p-10 border-black border-2 bg-white' style={{left: width > 700 ? '5%' : '0%', width: width > 700 ? '35%' : '90%'}}>
                <form ref={form} onSubmit={(e) => login(form.current.email.value, form.current.password.value, e)} className='font-bold text-[1.2rem] relative'>
                    <h1 className='text-2xl mb-3 text-center'>Log in to rent a car</h1>
                    <div id="loginemail" className='flex rounded-lg p-3 border-[1.5px] border-gray-400 items-center mt-8'>
                        <FaEnvelope className='mr-4 text-gray-500' />
                        <input required name="email" className='outline-none font-thin text-[1rem] bg-none w-[85%]' placeholder='Email' type="text"/>
                    </div>
                    <div className="accounterror" id="loginemailerror"></div>
                    <div id="loginpassword" className='relative flex rounded-lg p-3 border-[1.5px] border-gray-400 items-center'>
                        <FaLock className='mr-4 text-gray-500' />
                        <input required name="password" className='outline-none font-thin text-[1rem] w-[75%]' placeholder='Password' type={seepassword ? 'text' : 'password'}/>
                        {seepassword ? <FaEye className='hover absolute right-4 text-2xl text-gray-500' onClick={() => setseepassword(!seepassword)}/> : <FaEyeSlash className='hover absolute right-4 text-2xl text-gray-500' onClick={() => setseepassword(!seepassword)}/>}
                    </div>
                    <div className="accounterror" id="loginpassworderror"></div>
                    <input value="Login" className='hover my-3 text-[1rem] md:text-[1.2rem] text-white block bg-gradient-to-r from-blue-400 to-blue-500 w-full rounded-[10px] py-2' type="submit" />
                    <Link to="/forgotpassword"><p className='text-center hover hover:underline text-blue-600'>Forgot your password?</p></Link>
                    <div className="flex items-center my-4">
                        <div className='w-2/4 h-[1px] bg-gray-400'></div>
                        <p className='mx-2 text-gray-500 font-[900]'>OR</p>
                        <div className='w-2/4 h-[1px] bg-gray-400'></div>
                    </div>
                    <GoogleButton onClick={signinwithgoogle} className="relative text-[1rem] mb-4 left-2/4 -translate-x-2/4"/>
                    <p className='text-center text-[1rem]'>Don't have an account? <Link to="/createaccount" onClick={resetloginerrors}><span className='text-blue-600 hover:underline'>Create Account</span></Link></p>
                </form>
            </div>
        </div>
    );
}
 
export default Login;