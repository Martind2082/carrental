import {useParams} from 'react-router-dom';
import list from '../cars.json';
import {useNavigate} from 'react-router-dom';

const Carsinfo = ({sort, setSort, rating, setcartitems, cartitems}) => {
    let width = window.innerWidth;
    let navigate = useNavigate();
    const {carslist} = list;
    const {name} = useParams();
    const array = carslist.filter(val => val.name.split(' ')[0].toLowerCase() === name);
    if (sort === 'rating') {
        array.sort((a, b) => b.rating - a.rating)
    } else if (sort === 'lowtohigh') {
        array.sort((a, b) => a.rent.slice(1) - b.rent.slice(1))
    } else {
        array.sort((a, b) => b.rent.slice(1) - a.rent.slice(1))
    }
    const colsort = () => {
        let length = array.length;
        if (width < 700) {
            return "repeat(2, 45%)";
        }
        if (length > 3) {
            return "repeat(4, 23%)";
        } else {
            return `repeat(${length}, ${100/length - 5}%)`;
        }
    }
    const rentclick = (val) => {
        if (cartitems.includes(val)) {
            navigate('/garage');
        } else {
            setcartitems([...cartitems, val]);
        }
    }
    return (
        <div className='pb-[15rem]'>
                <div className='text-2xl font-bold translate-y-[15vh] flex w-[85%]' style={{flexDirection: width > 900 ? 'row' : 'column', marginLeft: width > 900 ? '5rem' : '7.5%'}}>
                    <div>{array.length} results for {name}</div>
                    <select onChange={(e) => setSort(e.target.value)} value={sort} className="text-xl border border-black" style={{marginTop: width > 900 ? '0' : '1rem', marginLeft: width > 900 ? '3rem' : '0rem'}}>
                        <option value="lowtohigh">Price low to high</option>
                        <option value="hightolow">Price high to low</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            <div className='grid gap-4 justify-center translate-y-[20vh]' style={{gridTemplateColumns: colsort()}}>
                {array.map(val => <div className='hover carinfo font-bold shadow-lg pb-[10rem] hover:shadow-2xl' key={val.id}>
                    <div className='text-xl md:text-2xl font-bold my-3'>{val.name}</div>
                    <img onClick={() => navigate(`/car/${val.id}`)} src={val.image} className="h-[60%] w-full object-cover"/>
                    <div className='text-[1rem]'>
                        <div className='mt-4 ml-6 flex items-center'><span className='mr-2'>Rating:</span> {rating(val.rating)}</div>
                        <div className='flex justify-around my-3'>
                            <div><span>color:</span> {val.color}</div>
                            <div><span>fuel:</span> {val.type}</div>
                        </div>
                        <div className='flex justify-around text-center my-3'>
                            <div><span>horsepower:</span> {val.horsepower}</div>
                            <div>{val.drivetrain} <span> wheel drive</span></div>
                        </div>
                        <div className='my-3'>
                            <div className='ml-[7%]'>{val.rent} <span>per day</span></div>
                            <button id={"rent" + val.id} onClick={() => rentclick(val)} className='hover ml-[7%] text-white mt-[1rem] text-[1rem] rounded-[20px] bg-gradient-to-r from-sky-200 to-sky-400 py-1 px-5'>{cartitems.includes(val) ? 'Checkout' : 'Rent'}</button>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
}
 
export default Carsinfo;