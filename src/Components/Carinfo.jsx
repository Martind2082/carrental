import {useParams} from 'react-router-dom';
import list from '../cars.json';

const Carinfo = ({rating}) => {
    const {carslist} = list;
    const {id} = useParams();
    return (
        <div className='flex h-[50vh] translate-y-[35%] w-[80%] m-auto shadow-2xl'>
            <img className='w-2/4 h-[100%] object-cover' src={carslist[id].image}/>
            <div className='pl-4 font-bold flex flex-col justify-around'>
                <div className='font-bold text-3xl'>{carslist[id].name}</div>
                <div className='flex items-center text-2xl'><span className='mr-2 text-gray-600'>Rating: </span> {rating(carslist[id].rating)}</div>
                <div className='flex text-2xl'>
                    <div className='mr-8'><span className='text-gray-600'>color:</span> {carslist[id].color}</div>
                    <div><span className='text-gray-600'>fuel:</span> {carslist[id].type}</div>
                </div>
                <div className='flex text-2xl'>
                    <div className='mr-8'><span className='text-gray-600'>horsepower:</span> {carslist[id].horsepower}</div>
                    <div>{carslist[id].drivetrain} <span className='text-gray-600'> wheel drive</span></div>
                </div>
                <div className='flex items-center text-2xl'>
                    <div className='mr-8'>{carslist[id].rent} <span className='text-gray-600'>per day</span></div>
                    <button className='hover rounded-[20px] bg-gradient-to-r from-sky-200 to-sky-400 py-1 px-10'>Rent</button>
                </div>
            </div>
        </div>
    );
}
 
export default Carinfo;