import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import list from '../cars.json';
import {useNavigate} from 'react-router-dom';
import { useRef } from 'react';

const Home = ({setSort}) => {
    const {carslist} = list;
    let navigate = useNavigate();
    const formRef = useRef();
    const handlesubmit = (e, name, sort) => {
        e.preventDefault();
        if (name === 'select') {
            return;
        }
        console.log(name);
        setSort(sort);
        navigate(`/cars/${name}`)
    }
    return (
        <div className="overflow-x-hidden">
            <main className="w-screen h-[100vh]">
               <img className='h-[100vh] w-screen object-cover' src="https://images.ctfassets.net/7n7vfqlomamo/2rAISj6e7589DFvB1nQyak/5044f5448c1bcb6d72202f84696ed3b7/18340_Kia_EV6.jpg"/>
            </main>
            <div className='absolute left-2/4 top-1/4 translate-y-[-50%] translate-x-[-50%] flex flex-col text-2xl md:text-4xl text-center'>
                <p>Welcome to Rent Smart!</p>
                <p className='mt-4'>World's best Car Rental service</p>
            </div>
            <form ref={formRef} onSubmit={(e) => handlesubmit(e, formRef.current.name.value, formRef.current.sort.value)} className="w-[70%] h-[8vh] rounded-md flex absolute top-3/4 left-1/2 translate-x-[-50%] justify-between">
                <select name="name" defaultValue="select" required className="w-[30%] rounded-md px-3">
                    <option value="select" disabled>SELECT</option>
                    <option value="chevrolet">Chevrolet</option>
                    <option value="ford">Ford</option>
                    <option value="honda">Honda</option>
                    <option value="lexus">Lexus</option>
                    <option value="nissan">Nissan</option>
                    <option value="subaru">Subaru</option>
                    <option value="tesla">Tesla</option>
                    <option value="toyota">Toyota</option>
                </select>
                <select name="sort" required className="w-[30%] rounded-md px-3">
                    <option value="lowtohigh">Price low to high</option>
                    <option value="hightolow">Price high to low</option>
                    <option value="rating">Rating</option>
                </select>
                <input className="hover w-[30%] rounded-md bg-gradient-to-r from-blue-300 to-blue-400" value="Search" type="submit"/>
            </form>

            <div className='p-10 5'>
                <div className='topbrands flex w-[80%] mx-auto mb-10 justify-evenly items-center'>
                    <p className='text-3xl font-bold'>Top Brands</p>
                    <div><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/800px-Tesla_T_symbol.svg.png"/></div>
                    <div><img src="https://www.freepnglogos.com/uploads/toyota-logo-png/toyota-logos-brands-10.png" /></div>
                    <div><img src="https://allcarbrandslist.com/wp-content/uploads/2020/12/Honda-Emblem.png" /></div>
                    <div><img src="https://www.carlogos.org/car-logos/ford-logo-2003.png"/></div>
                    <div><img src="https://logos-world.net/wp-content/uploads/2021/04/Subaru-Logo.png" /></div>
                </div>
                <p className='text-3xl font-bold text-center my-5 mt-18'>Most Rented Cars</p>
                <Swiper id='swiper'
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    >
                    <SwiperSlide><img src={carslist[14].image}/><div className='swipertitle'>{carslist[14].name}</div></SwiperSlide>
                    <SwiperSlide><img src={carslist[16].image} /><div className='swipertitle'>{carslist[16].name}</div></SwiperSlide>
                    <SwiperSlide><img src={carslist[7].image} /><div className='swipertitle'>{carslist[17].name}</div></SwiperSlide>
                    <SwiperSlide><img src={carslist[23].image} /><div className='swipertitle'>{carslist[23].name}</div></SwiperSlide>
                    <SwiperSlide><img src={carslist[21].image} /><div className='swipertitle'>{carslist[21].name}</div></SwiperSlide>
                    <SwiperSlide><img src={carslist[0].image} /><div className='swipertitle'>{carslist[0].name}</div></SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
 
export default Home;
