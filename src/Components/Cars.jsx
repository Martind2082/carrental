import list from '../cars.json';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';

const Cars = ({rating}) => {
    let navigate = useNavigate();
    const [count, setCount] = useState(false);
    const {carslist} = list;
    let obj = {};
    for (let i = 0; i < carslist.length; i++) {
        if (obj[carslist[i].name.split(' ')[0]] === undefined) {
            obj[carslist[i].name.split(' ')[0]] = [];
        }
        obj[carslist[i].name.split(' ')[0]].push(carslist[i]);
    }
    let brands = [];
    for (const brand in obj) {
        brands.push(brand);
    }
    brands.sort();
    return (
        <div className='translate-y-[15vh] px-10'>
            <p className='text-3xl mb-5'>All Available Cars</p>
            <div>
                {
                    brands.map(model => {
                        return <div key={model}>
                            <div className='text-2xl ml-5 mb-3 font-bold'>{model} ({obj[model].length} available)</div>
                            {
                                obj[model].length < 4 ? <div>
                                    {
                                        window.innerWidth > 900 ? <div className='flex'>
                                            {
                                                obj[model].map(car => {
                                                    return <div onClick={() => navigate(`/car/${car.id}`)} key={car.name} className="w-[25%] shadow-md hover:shadow-2xl mr-8 mb-10">
                                                        <img className='h-[30vh] object-cover hover' src={car.image}/>
                                                        <div className='flex justify-evenly items-center py-3'>
                                                            <div className='font-bold'>{car.name}</div>
                                                            <div>{rating(car.rating)}</div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div> : <Swiper
                                            modules={[Navigation, Pagination]}
                                            spaceBetween={0}
                                            slidesPerView={1}
                                            navigation
                                            pagination={{ clickable: true }}
                                            loop={true}
                                            >
                                            {
                                                obj[model].map(car => {
                                                    return <SwiperSlide key={car.name}>
                                                        <div onClick={() => navigate(`/car/${car.id}`)} className='w-[90%] h-full shadow-md hover:shadow-2xl'>
                                                            <img src={car.image} className='h-[30vh] w-[100%] object-cover hover'/>
                                                            <div className='flex justify-evenly items-center py-3 mb-[3rem]'>
                                                                <div className='font-bold'>{car.name}</div>
                                                                <div>{rating(car.rating)}</div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                })
                                            }
                                        </Swiper>
                                    }
                                </div> : <Swiper
                                        modules={[Navigation, Pagination]}
                                        spaceBetween={0}
                                        slidesPerView={window.innerWidth > 900 ? 4 : 1}
                                        navigation
                                        pagination={{ clickable: true }}
                                        loop={true}
                                        >
                                        {
                                            obj[model].map(car => {
                                                return <SwiperSlide key={car.name}>
                                                    <div onClick={() => navigate(`/car/${car.id}`)} className='w-[90%] h-full shadow-md hover:shadow-2xl'>
                                                        <img src={car.image} className='h-[30vh] w-[100%] object-cover hover'/>
                                                        <div className='flex justify-evenly items-center py-3 mb-[3rem]'>
                                                            <div className='font-bold'>{car.name}</div>
                                                            <div>{rating(car.rating)}</div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            })
                                        }
                        
                                </Swiper>
                            }
                    </div>
                    })
                }
            </div>
        </div>
    );
}
 
export default Cars;