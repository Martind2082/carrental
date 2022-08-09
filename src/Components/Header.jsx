import { useContext } from "react";
import { firebasecontext } from "../FirebaseContext";
import logo from '../Images/logo.png';
import {Link} from 'react-router-dom';

const Header = () => {
    const {user} = useContext(firebasecontext);
    return (
        <header className="flex justify-between items-center w-screen h-[15vh] fixed">
            <img className="h-full ml-[10%]" src={logo} />
            <div className="flex w-[40%] justify-between items-center px-[2rem] text-2xl">
                <Link to="/"><div className='hover:underline hover p-2'>Home</div></Link>
                <Link to="/about"><div className='hover:underline hover p-2'>About us</div></Link>
                <div className='hover:underline hover p-2'>Cars</div>
                <div className='hover:underline hover p-2'>{user ? 'Sign out' : 'Login | Sign up'}</div>
            </div>
        </header>
    );
}
 
export default Header;