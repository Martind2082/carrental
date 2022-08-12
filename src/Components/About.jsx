import {FaAward, FaBolt, FaTags} from "react-icons/fa"

const About = () => {
    return (
        <div id="about" className="w-screen h-screen">
            <div className="absolute aboutanimation flex flex-col text-center text-white w-[50%] top-[22vh] left-[5%]">
                <p className="text-4xl mb-10">Who we are</p>
                <p className=" text-3xl">Rent Smart is one of America's best car rental companies. Our plan is to make renting cars as efficient and easy as possible with the best quality and prices for our customers.</p>
                <div className="flex justify-around">
                    <div className="flex flex-col justify-center items-center font-bold mt-8">
                        <FaBolt className="border-2 p-5 text-[5rem] rounded-[10px] mb-3"/>
                        <p className="text-xl">Easy and Quick</p>
                    </div>
                    <div className="flex flex-col justify-center items-center font-bold mt-8">
                        <FaAward className="border-2 p-5 text-[5rem] rounded-[10px] mb-3"/>
                        <p className="text-xl">High Quality</p>
                    </div>
                    <div className="flex flex-col justify-center items-center font-bold mt-8">
                        <FaTags className="border-2 p-5 text-[5rem] rounded-[10px] mb-3"/>
                        <p className="text-xl">Affordable</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default About;