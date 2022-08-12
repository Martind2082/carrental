import { useContext, useRef } from 'react';
import {Link} from 'react-router-dom';
import { firebasecontext } from '../FirebaseContext';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
    const {login, user} = useContext(firebasecontext);
    let navigate = useNavigate();
    const form = useRef();
    useEffect(() => {
        user && navigate('/')
    }, [user])
    return (
        <div>
            <img className="w-screen h-screen opacity-60" src="https://www.dollar.com/~/media/Dollar/Images/Business/Government/0618-business-government-car-tire-road.ashx"/>
            <div className='absolute top-1/4 left-[10%] p-10 border-black border-2 bg-white'>
                <form ref={form} onSubmit={(e) => login(form.current.email.value, form.current.password.value, e)} className='font-bold text-[1.2rem]'>
                    <h1 className='text-3xl mb-3'>Log in to rent a car</h1>
                    <p className='mb-1'>Email</p>
                    <input required name="email" className='border border-1 border-black rounded-md mb-3 px-1' type="text"/>
                    <p className='mb-1'>Password</p>
                    <input required name="password" className='border border-1 border-black rounded-md mb-3 px-1' type="password" />
                    <input value="Login" className='hover my-3 block bg-blue-400 w-full rounded-[10px] py-2' type="submit" />
                    <p>Don't have an account? <Link to="/createaccount"><span className='text-blue-600 hover:underline'>Create Account</span></Link></p>
                    <Link to="/forgotpassword"><p className='text-center hover hover:underline text-blue-600'>Forgot password?</p></Link>
                </form>
            </div>
        </div>
    );
}
 
export default Login;