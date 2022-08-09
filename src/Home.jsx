import logo from './Images/logo.png'

const Home = () => {
    return (
        <div>
            <header className="flex justify-between items-center w-screen h-[15vh] fixed">
                <img className="h-full ml-[10%]" src={logo} />
                <div className="flex w-[40%] justify-between items-center px-[2rem] text-2xl">
                    <div className='hover:underline hover p-2'>Home</div>
                    <div className='hover:underline hover p-2'>About us</div>
                    <div className='hover:underline hover p-2'>Cars</div>
                    <div className='hover:underline hover p-2'>Account</div>
                </div>
            </header>
            <main className="w-screen h-[80vh]">
               <img className='h-[100vh] w-screen' src="https://images.ctfassets.net/7n7vfqlomamo/2rAISj6e7589DFvB1nQyak/5044f5448c1bcb6d72202f84696ed3b7/18340_Kia_EV6.jpg"/>
            </main>
            <div className='absolute left-2/4 top-1/4 translate-y-[-50%] translate-x-[-50%] flex flex-col text-4xl text-center'>
                <p>Welcome to Rent Smart</p>
                <p className='mt-4'>World's best Car Rental service</p>
            </div>
        </div>
    );
}
 
export default Home;