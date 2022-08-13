import { useContext, useRef } from 'react';
import {Link} from 'react-router-dom';
import { firebasecontext } from '../FirebaseContext';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import {FaEnvelope, FaLock, FaEye, FaEyeSlash} from 'react-icons/fa';
import { useState } from 'react';
import {GoogleButton} from 'react-google-button'

const Login = () => {
    const {login, user, signinwithgoogle} = useContext(firebasecontext);
    let navigate = useNavigate();
    const form = useRef();
    useEffect(() => {
        user && navigate('/')
    }, [user])
    const [seepassword, setseepassword] = useState(false);
    return (
        <div>
            <img className="w-screen h-screen opacity-60" src="https://www.dollar.com/~/media/Dollar/Images/Business/Government/0618-business-government-car-tire-road.ashx"/>
            <div className='absolute top-[15vh] left-[7%] p-10 border-black border-2 bg-white'>
                <form ref={form} onSubmit={(e) => login(form.current.email.value, form.current.password.value, e)} className='font-bold text-[1.2rem] relative'>
                    <h1 className='text-3xl mb-3 text-center'>Log in to rent a car</h1>
                    <div className='flex rounded-lg p-3 border-[1.5px] border-gray-400 items-center mb-4 mt-8'>
                        <FaEnvelope className='mr-4 text-gray-500' />
                        <input required name="email" className='outline-none font-thin text-[1rem]' placeholder='Name' type="text"/>
                    </div>
                    <div className='relative flex rounded-lg p-3 border-[1.5px] border-gray-400 items-center mb-8'>
                        <FaLock className='mr-4 text-gray-500' />
                        <input required name="password" className='outline-none font-thin text-[1rem]' placeholder='Password' type={seepassword ? 'text' : 'password'}/>
                        {seepassword ? <FaEye className='hover absolute right-4 text-2xl text-gray-500' onClick={() => setseepassword(!seepassword)}/> : <FaEyeSlash className='hover absolute right-4 text-2xl text-gray-500' onClick={() => setseepassword(!seepassword)}/>}
                    </div>
                    <input value="Login" className='hover my-3 text-white block bg-gradient-to-r from-blue-400 to-blue-500 w-full rounded-[10px] py-2' type="submit" />
                    <Link to="/forgotpassword"><p className='text-center hover hover:underline text-blue-600'>Forgot your password?</p></Link>
                    <div className="flex items-center my-4">
                        <div className='w-2/4 h-[1px] bg-gray-400'></div>
                        <p className='mx-2 text-gray-500 font-[900]'>OR</p>
                        <div className='w-2/4 h-[1px] bg-gray-400'></div>
                    </div>
                    <GoogleButton onClick={signinwithgoogle} className="relative mb-4 left-2/4 -translate-x-2/4"/>
                    <p>Don't have an account? <Link to="/createaccount"><span className='text-blue-600 hover:underline'>Create Account</span></Link></p>
                </form>
            </div>
        </div>
    );
}
 
export default Login;