import {FaEnvelope} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {GoogleButton} from 'react-google-button'
import { useContext, useEffect, useRef } from 'react';
import { firebasecontext } from '../FirebaseContext';

const Forgotpassword = () => {
    let navigate = useNavigate();
    const form = useRef();
    const {signinwithgoogle, user, resetpassword, resetpass, setresetpass} = useContext(firebasecontext);
    useEffect(() => {
        user && navigate('/')
    }, [user]);
    function resetfortpasserrors() {
        setresetpass('');
        document.getElementById('forgotpassemail').style.border = '1.5px solid gray';
        document.getElementById('forgotpassemailerror').textContent = '';
        document.getElementById('forgotpassemail').fontWeight = 'normal';
    }
    useEffect(() => {
        if (resetpass === '') {
            resetfortpasserrors('');
            return;
        }
        if (resetpass !== '') {
            document.getElementById('forgotpassemail').style.border = '1.5px solid red';
            document.getElementById('forgotpassemailerror').textContent = 'User not found';
        }
    }, [resetpass])
    return (
        <div>
            <img className="absolute w-screen h-screen opacity-60" src="https://www.dollar.com/~/media/Dollar/Images/Business/Government/0618-business-government-car-tire-road.ashx"/>
            <form ref={form} onSubmit={(e) => resetpassword(form.current.email.value, e)} className="absolute bg-white border-2 border-black top-[15vh] left-[7%] p-10 w-[430px]">
                <p className="font-bold text-center text-3xl">Password Reset</p>
                <div id="forgotpassemail" className='flex rounded-lg p-3 border-[1.5px] text-center border-gray-400 items-center mt-8'>
                    <FaEnvelope className='mr-4 text-gray-500' />
                    <input required name="email" className='outline-none font-thin text-[1rem] bg-none' placeholder='Email' type="text"/>
                </div>
                <div id="forgotpassemailerror" className="accounterror font-bold"></div>
                <input value="Reset Password" className='hover mt-5 text-white block font-bold text-[1.1rem] bg-gradient-to-r from-blue-400 to-blue-500 w-full rounded-[10px] py-2' type="submit" />
                <Link to="/login"><p className="text-blue-500 font-bold text-center mt-3 text-[1.1rem] hover hover:underline">Login</p></Link>
                <div className="flex items-center my-4">
                    <div className='w-2/4 h-[1px] bg-gray-400'></div>
                    <p className='mx-2 text-gray-500 font-[900]'>OR</p>
                    <div className='w-2/4 h-[1px] bg-gray-400'></div>
                </div>
                <GoogleButton onClick={signinwithgoogle} className="relative mb-4 left-2/4 -translate-x-2/4"/>
                <p className='text-center font-bold'>Don't have an account? <Link to="/createaccount"><span className='text-blue-600 hover:underline'>Create Account</span></Link></p>
            </form>
        </div>
    );
}
 
export default Forgotpassword;