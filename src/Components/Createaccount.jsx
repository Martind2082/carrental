import { useContext } from 'react';
import { useRef } from 'react';
import {Link} from 'react-router-dom';
import { firebasecontext } from '../FirebaseContext';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';

const Createaccount = () => {
    const {createaccount, user} = useContext(firebasecontext);
    const form = useRef();
    let navigate = useNavigate();
    useEffect(() => {
        user && navigate('/')
    }, [user])
    return (
        <div>
            <img className="w-screen h-screen opacity-60" src="https://www.dollar.com/~/media/Dollar/Images/Business/Government/0618-business-government-car-tire-road.ashx"/>
            <div className='absolute top-1/4 left-[10%] p-10 border-black border-2 bg-white'>
                <form ref={form} onSubmit={(e) => createaccount(form.current.name.value, form.current.email.value, form.current.password.value, e)} className='font-bold text-[1.2rem]'>
                    <h1 className='text-3xl mb-3'>Create account to rent a car</h1>
                    <p className='mb-1'>Display Name</p>
                    <input name="name" required type="text" className='border w-full border-black rounded-md mb-3 px-1'/>
                    <p className='mb-1'>Email</p>
                    <input required name="email" className='border w-full border-black rounded-md mb-3 px-1' type="text"/>
                    <p className='mb-1'>Password</p>
                    <input required name="password" className='border w-full border-black rounded-md mb-3 px-1' type="password" />
                    <input value="Create Account" className='hover my-3 block bg-blue-400 w-full rounded-[10px] py-2' type="submit" />
                    <p>Have an account? <Link to="/login"><span className='text-blue-600 hover:underline'>Log in</span></Link></p>
                </form>
            </div>
        </div>
    );
}
 
export default Createaccount;