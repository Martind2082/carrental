import { useContext } from "react";
import { firebasecontext } from "../FirebaseContext";

const Home = () => {
    return (
        <div>
            <main className="w-screen h-[80vh]">
               <img className='h-[100vh] w-screen object-cover' src="https://images.ctfassets.net/7n7vfqlomamo/2rAISj6e7589DFvB1nQyak/5044f5448c1bcb6d72202f84696ed3b7/18340_Kia_EV6.jpg"/>
            </main>
            <div className='absolute left-2/4 top-1/4 translate-y-[-50%] translate-x-[-50%] flex flex-col text-2xl md:text-4xl text-center'>
                <p>Welcome to Rent Smart!</p>
                <p className='mt-4'>World's best Car Rental service</p>
            </div>
            <div className="w-[80%] h-[8vh] rounded-md flex absolute top-3/4 left-1/2 translate-x-[-50%] justify-between">
                <select required className="w-[25%] rounded-md pl-3">
                    <option>Toyota</option>
                    <option>Honda</option>
                    <option>Lexus</option>
                    <option>Subaru</option>
                    <option>Accord</option>
                </select>
                <select required className="w-[25%] rounded-md pl-3">
                    <option value="lowtohigh">Price low to high</option>
                    <option value="hightolow">Price high to low</option>
                    <option value="rating">Rating</option>
                </select>
                <input className="w-[25%] rounded-md bg-blue-400" value="Search" type="submit"/>
            </div>
        </div>
    );
}
 
export default Home;