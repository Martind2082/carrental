import {useNavigate, useParams} from 'react-router-dom';
import list from '../cars.json';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carinfo = ({rating, setcartitems, cartitems}) => {
    let navigate = useNavigate();
    const {carslist} = list;
    const {id} = useParams();
    let othercars = carslist.filter(car => car.name.split(' ')[0] === carslist[id].name.split(' ')[0] && car.id !== +id)
    let width = window.innerWidth;
    const rentclick = () => {
        if (cartitems.includes(carslist[id])) {
            navigate('/garage');
        } else {
            setcartitems([...cartitems, carslist[id]]);
        }
    }
    return (
        <div className='translate-y-[14%]'>
            <div className='flex m-auto shadow-2xl' style={{flexDirection: width > 900 ? 'row' : 'column', width: width > 900 ? '80%' : '100%'}}>
                <img className='h-[100%] object-cover' style={{width: width > 900 ? '50%' : '100%'}} src={carslist[id].image}/>
                <div className='pl-4 font-bold flex flex-col justify-around'>
                    <div className='font-bold text-3xl my-3'>{carslist[id].name}</div>
                    <div className='flex items-center text-2xl'><span className='mr-2 text-gray-600'>Rating: </span> {rating(carslist[id].rating)}</div>
                    <div className='flex text-2xl my-2'>
                        <div className='mr-8'><span className='text-gray-600'>color:</span> {carslist[id].color}</div>
                        <div><span className='text-gray-600'>fuel:</span> {carslist[id].type}</div>
                    </div>
                    <div className='flex text-2xl my-2'>
                        <div className='mr-8'><span className='text-gray-600'>horsepower:</span> {carslist[id].horsepower}</div>
                        <div>{carslist[id].drivetrain} <span className='text-gray-600'> wheel drive</span></div>
                    </div>
                    <div className='flex items-center text-2xl my-2'>
                        <div className='mr-8'>{carslist[id].rent} <span className='text-gray-600'>per day</span></div>
                        <button onClick={rentclick} className='hover rounded-[20px] bg-gradient-to-r from-sky-200 to-sky-400 py-1 px-10'>{cartitems.includes(carslist[id]) ? 'Checkout' : 'Rent'}</button>
                    </div>
                </div>
            </div>
            <div className='w-[80%] mt-8 mx-auto pb-[3rem]'>
                <p className='font-bold text-3xl mb-4'>Other {carslist[id].name.split(' ')[0]} Cars</p>
                {
                    othercars.length < 3 ? <div className='object-cover flex w-full '>
                        {
                            width > 900 ? <div>
                                {
                                othercars.map(car => <div className='mr-4' style={{width: width > 900 ? '35%' : '100%'}}>
                                    <img onClick={() => navigate(`/car/${car.id}`)} className='hover hover:opacity-[0.8] h-full object-cover' src={car.image}/>
                                    <div className='text-white font-bold translate-y-[-170%] translate-x-4 z[1] text-xl'>{car.name}</div>
                                </div>)
                                }
                            </div> : othercars.length === 1 ? <div className='w-full'>
                                <img onClick={() => navigate(`/car/${othercars[0].id}`)} className='hover hover:opacity-[0.8] h-full object-cover' src={othercars[0].image}/>
                                <div className='text-white font-bold translate-y-[-170%] translate-x-4 z[1] text-xl'>{othercars[0].name}</div>
                            </div> : <Swiper className='h-[30vh]'
                                modules={[Navigation, Pagination]}
                                spaceBetween={0}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                loop={true}
                                >
                                {
                                    othercars.map(car => <SwiperSlide  key={car.id}>
                                        <img onClick={() => navigate(`/car/${car.id}`)} className='w-[95%] h-full hover:opacity-[0.8] hover' src={car.image}/>
                                        <div className='translate-y-[-170%] translate-x-4 text-xl font-bold text-white'>{car.name}</div>
                                    </SwiperSlide>)
                                }
                            </Swiper>
                        }
                    </div> : <Swiper className='h-[30vh]'
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    >
                    {
                        othercars.map(car => <SwiperSlide  key={car.id}>
                            <img onClick={() => navigate(`/car/${car.id}`)} className='w-[95%] h-full hover:opacity-[0.8] hover' src={car.image}/>
                            <div className='translate-y-[-170%] translate-x-4 text-xl font-bold text-white'>{car.name}</div>
                        </SwiperSlide>)
                    }
                </Swiper>
                }
            </div>
        </div>
    );
}
 
export default Carinfo;