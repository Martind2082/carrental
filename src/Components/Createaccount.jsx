import { useContext } from 'react';
import { useRef } from 'react';
import {Link} from 'react-router-dom';
import { firebasecontext } from '../FirebaseContext';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import {FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash} from 'react-icons/fa';
import { useState } from 'react';
import {GoogleButton} from 'react-google-button'

const Createaccount = () => {
    const {createaccount, user, signinwithgoogle} = useContext(firebasecontext);
    const form = useRef();
    let navigate = useNavigate();
    useEffect(() => {
        user && navigate('/')
    }, [user])
    const [seepassword, setseepassword] = useState(false);
    return (
        <div>
            <img className="w-screen h-screen opacity-60" src="https://www.dollar.com/~/media/Dollar/Images/Business/Government/0618-business-government-car-tire-road.ashx"/>
            <div className='absolute top-[15vh] left-[7%] p-10 border-black border-2 bg-white'>
                <form ref={form} onSubmit={(e) => createaccount(form.current.name.value, form.current.email.value, form.current.password.value, e)} className='font-bold text-[1.2rem]'>
                    <h1 className='text-3xl mb-3'>Create account to rent a car</h1>
                    <div className='flex rounded-lg p-3 border-[1.5px] border-gray-400 items-center mb-4 mt-8'>
                        <FaUser className='mr-4' />
                        <input required name="name" className='outline-none font-thin text-[1rem]' placeholder='Name' type="text"/>
                    </div>
                    <div className='flex rounded-lg p-3 border-[1.5px] border-gray-400 items-center mb-4'>
                        <FaEnvelope className='mr-4' />
                        <input required name="email" className='outline-none font-thin text-[1rem]' placeholder='Email' type="text"/>
                    </div>
                    <div className='relative flex rounded-lg p-3 border-[1.5px] border-gray-400 items-center mb-8'>
                        <FaLock className='mr-4' />
                        <input required name="password" className='outline-none font-thin text-[1rem]' placeholder='Password' type={seepassword ? 'text' : 'password'}/>
                        {seepassword ? <FaEye className='hover absolute right-4 text-2xl text-gray-500' onClick={() => setseepassword(!seepassword)}/> : <FaEyeSlash className='hover absolute right-4 text-2xl text-gray-500' onClick={() => setseepassword(!seepassword)}/>}
                    </div>
                    <input value="Create Account" className='hover my-3 block bg-gradient-to-r from-blue-400 to-blue-500 text-white w-full rounded-[10px] py-2' type="submit" />
                    <div className="flex items-center my-4">
                        <div className='w-2/4 h-[1px] bg-gray-400'></div>
                        <p className='mx-2 text-gray-500 font-[900]'>OR</p>
                        <div className='w-2/4 h-[1px] bg-gray-400'></div>
                    </div>
                    <GoogleButton onClick={signinwithgoogle} className="relative mb-4 mt-5 left-2/4 -translate-x-2/4"/>
                    <div className='text-center'>Have an account? <Link to="/login"><span className='text-blue-600 hover:underline'>Log in</span></Link></div>
                </form>
            </div>
        </div>
    );
}
 
export default Createaccount;