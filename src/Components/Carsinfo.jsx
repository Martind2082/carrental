import {useParams} from 'react-router-dom';
import list from '../cars.json';
import {useNavigate} from 'react-router-dom';

const Carsinfo = ({sort, setSort, rating, setcartitems, cartitems}) => {
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
        if (length > 3) {
            return "repeat(4, 23%)";
        } else {
            return `repeat(${length}, ${100/length - 5}%)`;
        }
    }
    const rentclick = (val) => {
        console.log(val);
        if (cartitems.includes(val)) {
            navigate('/garage');
        } else {
            setcartitems([...cartitems, val]);
        }
    }
    return (
        <div className='pb-[15rem]'>
            <div className='text-3xl font-bold translate-y-[15vh] ml-20 flex justify-between w-[85%]'>
                <div>{array.length} results for {name}</div>
                <select onChange={(e) => setSort(e.target.value)} value={sort} className="text-xl">
                    <option value="lowtohigh">Price low to high</option>
                    <option value="hightolow">Price high to low</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
            <div className='grid gap-4 justify-center translate-y-[20vh]' style={{gridTemplateColumns: colsort()}}>
                {array.map(val => <div className='hover carinfo font-bold shadow-lg pb-10 hover:shadow-2xl' key={val.id}>
                    <div className='text-2xl font-bold my-3'>{val.name}</div>
                    <img onClick={() => navigate(`/car/${val.id}`)} src={val.image} className="h-[60%] w-full object-cover"/>
                    <div className='mt-4 ml-6 flex items-center'><span className='mr-2'>Rating:</span> {rating(val.rating)}</div>
                    <div className='flex justify-around my-3'>
                        <div><span>color:</span> {val.color}</div>
                        <div><span>fuel:</span> {val.type}</div>
                    </div>
                    <div className='flex justify-around my-3'>
                        <div><span>horsepower:</span> {val.horsepower}</div>
                        <div>{val.drivetrain} <span> wheel drive</span></div>
                    </div>
                    <div className='flex justify-around items-center my-3'>
                        <div>{val.rent} <span>per day</span></div>
                        <button id={"rent" + val.id} onClick={() => rentclick(val)} className='hover rounded-[20px] bg-gradient-to-r from-sky-200 to-sky-400 py-1 px-10'>{cartitems.includes(val) ? 'Checkout' : 'Rent'}</button>
                    </div>
                </div>)}
            </div>
        </div>
    );
}
 
export default Carsinfo;