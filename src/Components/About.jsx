import {FaAward, FaBolt, FaTags} from "react-icons/fa"

const About = () => {
    let width = window.innerWidth;
    return (
        <div id="about" className="h-screen w-full overflow-x-hidden">
            <div className="absolute aboutanimation flex flex-col text-center text-white top-[22vh] px-8" style={{width: width > 900 ? '50%' : '100%'}}>
                <p className="text-3xl lg:text-4xl mb-10">Who we are</p>
                <p className="text-2xl lg:text-3xl">Rent Smart is one of America's best car rental companies. Our plan is to make renting cars as efficient and easy as possible with the best quality and prices for our customers.</p>
                <div className="flex justify-around">
                    <div className="flex flex-col justify-center items-center font-bold mt-8">
                        <FaBolt className="border-2 p-5 text-[5rem] rounded-[10px] mb-3"/>
                        <p>Easy and Quick</p>
                    </div>
                    <div className="flex flex-col justify-center items-center font-bold mt-8">
                        <FaAward className="border-2 p-5 text-[5rem] rounded-[10px] mb-3"/>
                        <p>High Quality</p>
                    </div>
                    <div className="flex flex-col justify-center items-center font-bold mt-8">
                        <FaTags className="border-2 p-5 text-[5rem] rounded-[10px] mb-3"/>
                        <p>Affordable</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default About;