import {useNavigate, useParams} from 'react-router-dom';
import list from '../cars.json';

const Carsinfo = ({sort}) => {
    let navigate = useNavigate();
    const {carslist} = list;
    const {name} = useParams();
    const array = carslist.filter(val => val.name.split(' ')[0].toLowerCase() === name);
    const colsort = () => {
        let length = array.length;
        if (length > 3) {
            return "repeat(4, 23%)";
        } else {
            return `repeat(${length}, ${100/3 - 2}%)`;
        }
    }
    const rentclick = (id) => {
        if (document.getElementById("rent" + id).textContent === 'Rented') {
            return;
        } else {
            document.getElementById("rent" + id).textContent = 'Rented';
        }
    }
    return (
        <div className='grid gap-4 justify-center translate-y-[15vh] font-serif]' style={{gridTemplateColumns: colsort()}}>
            {array.map(val => <div className='hover carinfo font-bold shadow-lg pb-10 hover:shadow-2xl' key={val.id}>
                <div className='text-2xl font-bold my-3'>{val.name}</div>
                <img onClick={() => navigate(`/car/${val.id}`)} src={val.image} className="h-[60%]"/>
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
                    <button id={"rent" + val.id} onClick={() => rentclick(val.id)} className='hover rounded-[20px] bg-gradient-to-r from-sky-200 to-sky-400 py-1 px-10'>Rent</button>
                </div>
            </div>)}
        </div>
    );
}
 
export default Carsinfo;