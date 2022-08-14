import { useMemo } from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const Garage = ({cartitems, setcartitems}) => {
    let navigate = useNavigate();

    const removeclick = (item) => {
        let newcartitems = cartitems.filter(car => car !== item);
        setcartitems(newcartitems);
    }
    const removeallclick = () => {
        setcartitems([]);
    }
    const total = useMemo(() => {
        let totalprice = 0;
        cartitems.forEach(item => {
            totalprice += +item.rent.slice(1)
        })
        if (totalprice.toString().includes('.') && totalprice.toString().split('.')[1].length === 1) {
            totalprice += '0';
        }
        return '$' + totalprice;
    }, cartitems)
    return (
        <div className="translate-y-[6rem] w-[80%] m-auto">
            <p className="text-3xl font-bold">{cartitems.length === 0 ? 'Garage' : <div className='mb-8'>
                    <p>Cars</p>
                    <p onClick={removeallclick} className='text-red-400 hover hover:underline text-xl font-normal'>Remove all Items</p>
                </div>}</p>
            {
                cartitems.length === 0 ? <div className="w-full flex flex-col items-center translate-y-[-10%]">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-inbox-4790940-3989293.png"/>
                    <p className="text-2xl font-bold">You currently have no cars in your garage</p>
                    <p className="text-2xl font-bold my-4">Cars you rent will appear here</p>
                    <button onClick={() => navigate('/cars')} className="hover py-2 px-8 rounded-[20px] bg-gradient-to-r from-blue-300 to-blue-400 text-2xl text-white font-bold">View Cars</button>
                </div> : <div className='flex justify-between'>
                    <div className='w-[70%]'>
                        {
                            cartitems.map(item => <div key={item.id} className='flex shadow-xl hover:shadow-2xl mb-8'>
                                <img onClick={() => navigate(`/car/${item.id}`)} className='w-2/4 hover' src={item.image}/>
                                <div className='flex flex-col text-xl font-bold text-black ml-4'>
                                    <div className='text-3xl'>{item.name}</div>
                                    <div className='my-4'>{item.rent} per day</div>
                                    <p onClick={() => removeclick(item)} className='text-red-400 hover hover:underline'>Remove</p>
                                </div>
                            </div>)
                        }
                    </div>
                    <div className='w-[25%] shadow-xl border-[1px] border-gray-400'>
                        <div>{cartitems.length} items</div>
                        <p>Tax: $0.00</p>
                        <div>Total {total}</div>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Garage;