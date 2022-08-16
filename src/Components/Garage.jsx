import { useEffect, useMemo, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {BsXLg} from 'react-icons/bs'
import {FaCreditCard, FaPaypal} from 'react-icons/fa'

const Garage = ({cartitems, setcartitems}) => {
    let width = window.innerWidth;
    let navigate = useNavigate();
    const [totaldays, settotaldays] = useState(1);
    const [dates, setdates] = useState({date1: '', date2: ''});
    const [datesinfo, setdatesinfo] = useState({di1: '', di2: ''});
    const pickuptimeref = useRef();
    const dropofftimeref = useRef();
    const paymentref = useRef();
    const removeclick = (item) => {
        let newcartitems = cartitems.filter(car => car !== item);
        setcartitems(newcartitems);
    }
    const removeallclick = () => {
        setcartitems([]);
    }
    useEffect(() => {
        if (dates.date1 && dates.date2) {
            let date1 = dates.date1.split('-');
            const year1 = date1[0];
            date1.splice(0, 1);
            date1.push(year1);
            date1 = new Date(date1.join('-'));
            let date2 = dates.date2.split('-');
            const year2 = date2[0];
            date2.splice(0, 1);
            date2.push(year2);
            date2 = new Date(date2.join('-'));
            setdatesinfo({di1: date1, di2: date2});
            let milsec = date2 - date1;
            let days = Math.ceil(milsec / (1000 * 60 * 60 * 24));
            settotaldays(days);
        }
    }, [dates])
    const total = useMemo(() => {
        let totalprice = 0;
        cartitems.forEach(item => {
            totalprice += +item.rent.slice(1)
        })
        totalprice *= totaldays;
        if (totalprice.toString().includes('.') && totalprice.toString().split('.')[1].length === 1) {
            totalprice += '0';
        }
        return '$' + totalprice;
    }, [cartitems, totaldays])
    const proceedcheckout = () => {
        if (!dates.date1 || pickuptimeref.current.value === '' || !dates.date2 || dropofftimeref.current.value === '') {
            let div = document.createElement('div');
            div.classList.add('popup');
            div.textContent = 'Please answer all fields';
            document.body.append(div);
            setTimeout(() => {
                div.remove();
            }, 3200);
            return;
        }
        if (totaldays < 0) {
            let div = document.createElement('div');
            div.textContent = 'Pickup date must occur before dropoff date';
            div.classList.add('popup');
            document.body.append(div);
            setTimeout(() => {
                div.remove();
            }, 3200);
            return;
        };
        paymentref.current.style.display = 'flex';
    }
    return (
        <div className="translate-y-[6rem] w-[90%] m-auto">
            <div ref={paymentref} className='fixed flex-col px-8 hidden h-[70vh] rounded-[30px] left-2/4 top-[60%] -translate-x-2/4 -translate-y-2/4 border-2 border-gray-500 bg-white' style={{width: width > 900 ? '50%' : '90%', zIndex: '50'}}>
                <div className='flex text-3xl justify-between w-full mt-2'>
                    <p className='font-bold'>Payment Info</p>
                    <BsXLg className='hover' onClick={() => paymentref.current.style.display = 'none'}/>
                </div>
                <div className='flex flex-col mt-4 text-xl'>
                    <p>Payment Method:</p>
                    <div className='flex items-center'>
                        <input type="radio" name="paytype"/>
                        <FaCreditCard className='mx-2'/>
                        <p>Card</p>
                    </div>
                    <div className='flex items-center'>
                        <input type="radio" name="paytype"/>
                        <FaPaypal className='mx-2'/>
                        <p>Paypall</p>
                    </div>
                </div>
                <div className='my-3'>
                    <p>Name on Card:</p>
                    <input className='border border-black rounded-[10px] px-2 ' type="text" />
                </div>
                <div>
                    <p>Card Number:</p>
                    <input className='border border-black rounded-[10px] px-2 ' type="number" />
                </div>
                <div className='my-3'>
                    <div>Expiration Date:</div>
                    <div className='flex'>
                        <select className='border border-black rounded-[5px] mr-4'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </select>
                        <select className='border border-black rounded-[5px]'>
                            <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                            <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
                            <option value={new Date().getFullYear() + 2}>{new Date().getFullYear() + 2}</option>
                            <option value={new Date().getFullYear() + 3}>{new Date().getFullYear() + 3}</option>
                            <option value={new Date().getFullYear() + 4}>{new Date().getFullYear() + 4}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <p>CVV:</p>
                    <input type="number" className='border border-black rounded-[10px] px-2'/>
                </div>
                <div className='font-bold'>Renting {cartitems.length} {cartitems.length === 1 ? 'car':'cars'} for {totaldays} {totaldays === 1 ? 'day':'days'}</div>
                <div>
                    pickup: <div>{datesinfo.di1.toString().split(' ').slice(0, 3)} at {pickuptimeref.current.value}</div>
                    dropoff: <div>{datesinfo.di2.toString().split(' ').slice(0, 3)} at {dropofftimeref.current.value}</div>
                </div>
            </div>
            <div className="text-3xl font-bold">{cartitems.length === 0 ? 'Garage' : <div className='mb-8'>
                    <p>Cars</p>
                    <p onClick={removeallclick} className='text-red-400 hover hover:underline text-xl font-normal'>Remove all Cars</p>
                </div>}</div>
            {
                cartitems.length === 0 ? <div className="w-full flex flex-col items-center translate-y-[-10%]">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-inbox-4790940-3989293.png"/>
                    <p className="text-2xl font-bold">You currently have no cars in your garage</p>
                    <p className="text-2xl font-bold my-4">Cars you rent will appear here</p>
                    <button onClick={() => navigate('/cars')} className="hover py-2 px-8 rounded-[20px] bg-gradient-to-r from-blue-300 to-blue-400 text-2xl text-white font-bold">View Cars</button>
                </div> : <div className='flex justify-between' style={{flexDirection: width > 900 ? 'row' : 'column'}}>
                    <div style={{width: width > 900 ? '55%' : '100%'}}>
                        {
                            cartitems.map(item => <div key={item.id} className='flex shadow-xl hover:shadow-2xl mb-8' style={{flexDirection: width > 900 ? 'row' : 'column'}}>
                                <img onClick={() => navigate(`/car/${item.id}`)} className='hover' style={{width: width > 900 ? '50%' : '100%'}} src={item.image}/>
                                <div className='flex flex-col text-xl font-bold text-black ml-4'>
                                    <div className='text-2xl mt-3'>{item.name}</div>
                                    <div className='my-4'>{item.rent} per day</div>
                                    <p onClick={() => removeclick(item)} className='text-red-400 hover hover:underline mb-4'>Remove</p>
                                </div>
                            </div>)
                        }
                    </div>
                    <div className='shadow-xl border-[1px] border-gray-400 text-2xl px-6' style={{width: width > 900 ? '40%' : '100%'}}>
                        <div className='my-3 font-bold'>{cartitems.length} {cartitems.length === 1 ? 'car' : 'cars'}</div>
                        <div className='flex justify-between'style={{flexDirection: width > 1000 ? 'row' : 'column'}}>
                            <div className='flex flex-col'>
                                <p className='font-bold'>Pickup Date</p>
                                <input onChange={(e) => setdates({...dates, date1: e.target.value,})} className='border border-black text-lg' type="date"/>
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-bold'>Pickup Time</p>
                                <select ref={pickuptimeref} defaultValue="select" className='text-lg border border-black'>
                                    <option value="select" disabled>SELECT</option>
                                    <option value="7a">7:00 AM</option>
                                    <option value="8a">8:00 AM</option>
                                    <option value="9a">9:00 AM</option>
                                    <option value="10a">10:00 AM</option>
                                    <option value="11a">11:00 AM</option>
                                    <option value="12p">12:00 PM</option>
                                    <option value="1p">1:00 PM</option>
                                    <option value="2p">2:00 PM</option>
                                    <option value="3p">3:00 PM</option>
                                    <option value="4p">4:00 PM</option>
                                    <option value="5p">5:00 PM</option>
                                    <option value="6p">6:00 PM</option>
                                    <option value="7p">7:00 PM</option>
                                    <option value="8p">8:00 PM</option>
                                    <option value="9p">9:00 PM</option>
                                    <option value="10p">10:00 PM</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex justify-between mt-2 mb-3' style={{flexDirection: width > 1000 ? 'row' : 'column'}}>
                            <div className='flex flex-col'>
                                <p className='font-bold'>Dropoff Date</p>
                                <input onChange={(e) => setdates({...dates, date2: e.target.value})} className='border border-black text-lg' type="date"/>
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-bold'>Dropoff Time</p>
                                <select ref={dropofftimeref} defaultValue="select" className='text-lg border border-black'>
                                    <option value="select" disabled>SELECT</option>
                                    <option value="7a">7:00 AM</option>
                                    <option value="8a">8:00 AM</option>
                                    <option value="9a">9:00 AM</option>
                                    <option value="10a">10:00 AM</option>
                                    <option value="11a">11:00 AM</option>
                                    <option value="12p">12:00 PM</option>
                                    <option value="1p">1:00 PM</option>
                                    <option value="2p">2:00 PM</option>
                                    <option value="3p">3:00 PM</option>
                                    <option value="4p">4:00 PM</option>
                                    <option value="5p">5:00 PM</option>
                                    <option value="6p">6:00 PM</option>
                                    <option value="7p">7:00 PM</option>
                                    <option value="8p">8:00 PM</option>
                                    <option value="9p">9:00 PM</option>
                                    <option value="10p">10:00 PM</option>
                                </select>
                            </div>
                        </div>
                        <div>{totaldays} {totaldays === 1 ? 'day' : 'days'}: <span className='font-bold'>{total}</span> total</div>
                        <button onClick={proceedcheckout} className='w-full my-4 text-xl py-3 bg-gradient-to-r from-blue-400 to-blue-500 font-bold text-white rounded-[20px]'>Proceed to Checkout</button>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Garage;