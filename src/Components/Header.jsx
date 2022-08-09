import { useContext } from "react";
import { firebasecontext } from "../FirebaseContext";
import logo from '../Images/logo.png';
import {Link, useNavigate} from 'react-router-dom';

const Header = () => {
    let navigate = useNavigate();
    const {user, signout} = useContext(firebasecontext);
    const loginclick = () => {
        if (user) {
            signout();
        } else {
            navigate('/login');
        }
    }
    return (
        <header className="flex justify-between items-center w-screen h-[15vh] fixed font-bold z-[1]">
            <img className="h-full ml-[10%]" src={logo} />
            <div className="flex w-max justify-between items-center px-[2rem] text-2xl mr-5">
                <Link to="/"><div className='hover:underline hover p-3'>Home</div></Link>
                <Link to="/about"><div className='hover:underline hover p-3'>About us</div></Link>
                <div className='hover:underline hover p-3'>Cars</div>
                <div onClick={loginclick} className='hover:underline hover p-3'>{user ? 'Sign out' : 'Login | Sign up'}</div>
            </div>
        </header>
    );
}
 
export default Header;