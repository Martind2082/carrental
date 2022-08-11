import list from '../cars.json';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Cars = () => {
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
    return (
        <div className='translate-y-[20vh] px-10'>
            <p className='text-3xl'>All Available Cars</p>
            <div>
                {/* {
                    brands.map(model => {
                        return <div className='flex h-[30vh] overflow-x-scroll w-[300%]' key={model}>
                            {
                                obj[model].map(car => {
                                    return <Swiper id="swiper"
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={0}
                                    slidesPerView={5}
                                    navigation
                                    pagination={{ clickable: true }}
                                    loop={true}
                                    >
                                    <SwiperSlide><img src={carslist[14].image}/><div className='swipertitle'>{carslist[14].name}</div></SwiperSlide>
                                  
                                </Swiper>
                                })
                            }
                        </div>
                    })
                } */}
                {
                    brands.map(model => {
                        return <Swiper id="swiper"
                        modules={[Navigation, Pagination]}
                        spaceBetween={0}
                        slidesPerView={5}
                        navigation
                        pagination={{ clickable: true }}
                        loop={true}
                        >
                        <SwiperSlide><img src={carslist[14].image}/><div className='swipertitle'>{carslist[14].name}</div></SwiperSlide>
                      
                    </Swiper>
                    })
                }
            </div>
        </div>
    );
}
 
export default Cars;