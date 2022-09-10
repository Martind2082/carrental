import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {BsXLg} from 'react-icons/bs'
import {FaCreditCard, FaPaypal} from 'react-icons/fa'
import thankyoupic from '../Images/thankyou.png'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { firebasecontext } from '../FirebaseContext';
import list from '../cars.json';

const Garage = ({cartitems, setcartitems}) => {
    const {carslist} = list;
    let width = window.innerWidth;
    let navigate = useNavigate();
    const purchasehistoryref = useRef();
    const {uid, purchasehistory, setpurchasehistory, user} = useContext(firebasecontext);
    let purchasehistoryarray = purchasehistory.split(',');
    const [totaldays, settotaldays] = useState(1);
    const [dates, setdates] = useState({date1: '', date2: ''});
    const [datesinfo, setdatesinfo] = useState({di1: '', di2: ''});
    const paymentref = useRef();
    const [purchased, setpurchased] = useState(false);
    const [pickuptime, setpickuptime] = useState('');
    const [dropofftime, setdropofftime] = useState('');
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
        if (!user) {
            navigate('/login');
            return;
        }
        if (!dates.date1 || pickuptime === '' || !dates.date2 || dropofftime === '') {
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
    const confirmpurchase = () => {
        setpurchased(true);
    }
    const okayclick = () => {
        setpurchased(false);
        paymentref.current.style.display = 'none';
        let cartitemids = cartitems.map(obj => obj.id);
        cartitemids = cartitemids.join(',')
        let newpurchasehistory = (purchasehistory + ',' + cartitemids).split(',');
        if (newpurchasehistory[0] === '') {
            newpurchasehistory.splice(0, 1);
        }
        newpurchasehistory = newpurchasehistory.join(',');
        updateDoc(doc(db, 'names', uid), {
            purchasehistory: newpurchasehistory,
            garageitems: ""
        })
        setcartitems([]);
    }
    const purchasehistoryclick = () => {
        if (purchasehistoryref.current.style.display === 'block') {
            purchasehistoryref.current.style.display = 'none';
        } else {
            purchasehistoryref.current.style.display = 'block';
        }
    }
    const clearpurchasehistory = () => {
        updateDoc(doc(db, 'names', uid), {
            purchasehistory: ""
        })
        setpurchasehistory("");
    }
    return (
        <div className="translate-y-[6rem] w-[90%] m-auto">
            <div ref={paymentref} className='fixed left-2/4 top-[0%] -translate-x-2/4 px-8 py-4 hidden rounded-[30px] border-2 border-gray-500 bg-white' style={{width: width > 900 ? '50%' : '90%', zIndex: '50'}}>
                {
                    purchased ? <div className='flex flex-col items-center justify-center mx-auto'>
                        <p className='text-xl font-bold text-center'>Thank you for your purchase!</p>
                        <img className='h-[70%]' src={thankyoupic}/>
                        <button onClick={okayclick} className='w-[80%] mx-auto my-4 text-base py-2 bg-gradient-to-r from-blue-400 to-blue-500 font-bold text-white rounded-[20px]'>Okay</button>
                    </div> : <div className='flex-col mx-auto'>
                        <div className='flex text-3xl justify-between w-full mt-2'>
                        <p className='font-bold'>Payment Info</p>
                        <BsXLg className='hover' onClick={() => paymentref.current.style.display = 'none'}/>
                    </div>
                    <div className='flex' style={{flexDirection: width > 900 ? 'row': 'column'}}>
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
                        <div style={{marginLeft: width > 900 ? '4rem': '0'}}>
                            <div className='my-3'>
                                <p>Name on Card:</p>
                                <input className='border border-black rounded-[10px] px-2 ' type="text" />
                            </div>
                            <div>
                                <p>Card Number:</p>
                                <input className='border border-black rounded-[10px] px-2 ' type="number" />
                            </div>
                        </div>
                    </div>
                    <div className='flex' style={{flexDirection: width > 900 ? 'row': 'column', alignItems: width > 900 ? 'center' : 'start'}}>
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
                        <div style={{marginLeft: width > 900 ? '4.8rem' : '0'}}>
                            <p>CVV:</p>
                            <input type="number" className='border border-black rounded-[10px] px-2'/>
                        </div>
                    </div>
                    <div className='font-bold mt-4'>Renting {cartitems.length} {cartitems.length === 1 ? 'car':'cars'} for {totaldays} {totaldays === 1 ? 'day':'days'}</div>
                    <div>
                        <div className='flex my-2'>Pickup: <div className='ml-3'>{datesinfo.di1.toString().split(' ').slice(0, 3).join(' ')} at {pickuptime}</div></div>
                        <div className='flex'>Dropoff: <div className='ml-3'>{datesinfo.di2.toString().split(' ').slice(0, 3).join(' ')} at {dropofftime}</div></div>
                    </div>
                    <button onClick={confirmpurchase} className='w-[80%] mx-auto my-4 text-base py-2 bg-gradient-to-r from-blue-400 to-blue-500 font-bold text-white rounded-[20px]'>Confirm purchase</button>
                    <div className='font-bold text-red-500 mx-auto'>*No need to type anything. Just press confirm purchase*</div>
                    </div>
                }
            </div>
            <div className="text-3xl font-bold flex justify-between">{cartitems.length === 0 ? <div>Garage</div> : <div className='mb-8'>
                <p>Cars</p>
                <p onClick={removeallclick} className='text-red-400 hover hover:underline text-xl font-normal'>Remove all Cars</p>
                </div>}
                <div onClick={purchasehistoryclick} className='text-white hover z-[1] bg-gradient-to-r from-blue-400 to-blue-500 py-3 px-6 rounded-[20px] font-normal text-xl h-full' style={{}}>Purchase History</div>
            </div>
            <div ref={purchasehistoryref} className="z-[1] pb-8 overflow-auto hidden rounded-[15px] border-2 border-blue-500 fixed w-[80%] h-[65vh] left-[50%] right-[50%] translate-x-[-50%] bg-white" style={{}}>
                <BsXLg className='hover absolute right-[1.5rem] top-[1rem] text-2xl z-[1]' onClick={() => purchasehistoryref.current.style.display = 'none'}/>
                <p className='text-center text-[2rem] my-2 relative left-2/4 -translate-x-2/4' style={{width: width > 540 ? '100%' : '200px' }}>Purchase History</p>
                {purchasehistory.length !== 0 && <div onClick={clearpurchasehistory} className='hover:underline hover text-red-300 ml-2 font-bold text-4'>Clear history</div>}
                <div id="purchasehistorycontainer" className='mt-4'>
                    {purchasehistoryarray.toString().length !== 0 ? <div>
                        {
                        purchasehistoryarray.map(num => <div key={num}>
                            {
                                width > 600 ? <div key={num} className="flex h-[125px] border-b-gray-500 border-b-[1.5px]">
                                <img onClick={() => navigate(`/car/${num}`)} className='hover w-[200px] object-cover' src={carslist[num].image}/>
                                <div className='font-bold ml-4 mt-2 text-2xl'>{carslist[num].name}</div>
                                <div className='font-bold text-right w-full absolute translate-x-[-5%] mt-2 text-2xl'>{carslist[num].rent} per day</div>
                            </div> : <div key={num} className="flex w-full h-[125px] border-b-gray-500 border-b-[1.5px]">
                                <img onClick={() => navigate(`/car/${num}`)} className='hover w-[50%] object-cover' src={carslist[num].image}/>
                                <div className='w-2/4'>
                                    <div className='font-bold text-center'>{carslist[num].name}</div>
                                    <div className='font-bold text-center'>{carslist[num].rent} per day</div>
                                </div>
                            </div>
                            }
                        </div>)
                        }
                    </div> : <div className='flex flex-col items-center'>
                        <img className='absolute translate-y-[-10%] w-[500px] h-[400px] z-[-1] object-cover' src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/icon-404.gif"/>
                        <p className='text-[1.3rem] absolute bottom-10 text-center'>Purchase history is currently empty. Cars you rent will appear here</p>
                    </div>}
                </div>
            </div>
            {
                cartitems.length === 0 ? <div className="w-full flex flex-col items-center translate-y-[-5%]">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-inbox-4790940-3989293.png"/>
                    <p className="text-2xl font-bold text-center">You currently have no cars in your garage</p>
                    <button onClick={() => navigate('/cars')} className="my-6 hover py-2 px-8 rounded-[20px] bg-gradient-to-r from-blue-300 to-blue-400 text-2xl text-white font-bold">View Cars</button>
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
                                <select onChange={(e) => setpickuptime(e.target.value)} defaultValue="select" className='text-lg border border-black'>
                                    <option value="select" disabled>SELECT</option>
                                    <option value="7:00 am">7:00 AM</option>
                                    <option value="8:00 am">8:00 AM</option>
                                    <option value="9:00 am">9:00 AM</option>
                                    <option value="10:00 am">10:00 AM</option>
                                    <option value="11:00 am">11:00 AM</option>
                                    <option value="12:00 pm">12:00 PM</option>
                                    <option value="1:00 pm">1:00 PM</option>
                                    <option value="2:00 pm">2:00 PM</option>
                                    <option value="3:00 pm">3:00 PM</option>
                                    <option value="4:00 pm">4:00 PM</option>
                                    <option value="5:00 pm">5:00 PM</option>
                                    <option value="6:00 pm">6:00 PM</option>
                                    <option value="7:00 pm">7:00 PM</option>
                                    <option value="8:00 pm">8:00 PM</option>
                                    <option value="9:00 pm">9:00 PM</option>
                                    <option value="10:00 pm">10:00 PM</option>
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
                                <select onChange={(e) => setdropofftime(e.target.value)} defaultValue="select" className='text-lg border border-black'>
                                <option value="select" disabled>SELECT</option>
                                    <option value="7:00 am">7:00 AM</option>
                                    <option value="8:00 am">8:00 AM</option>
                                    <option value="9:00 am">9:00 AM</option>
                                    <option value="10:00 am">10:00 AM</option>
                                    <option value="11:00 am">11:00 AM</option>
                                    <option value="12:00 pm">12:00 PM</option>
                                    <option value="1:00 pm">1:00 PM</option>
                                    <option value="2:00 pm">2:00 PM</option>
                                    <option value="3:00 pm">3:00 PM</option>
                                    <option value="4:00 pm">4:00 PM</option>
                                    <option value="5:00 pm">5:00 PM</option>
                                    <option value="6:00 pm">6:00 PM</option>
                                    <option value="7:00 pm">7:00 PM</option>
                                    <option value="8:00 pm">8:00 PM</option>
                                    <option value="9:00 pm">9:00 PM</option>
                                    <option value="10:00 pm">10:00 PM</option>
                                </select>
                            </div>
                        </div>
                        <div>{totaldays} {totaldays === 1 ? 'day' : 'days'}: <span className='font-bold'>{total}</span> total</div>
                        <button onClick={proceedcheckout} className='w-full my-4 text-xl py-3 bg-gradient-to-r from-blue-400 to-blue-500 font-bold text-white rounded-[20px]'>{user ? 'Proceed to Checkout' : 'Sign in to complete Checkout'}</button>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Garage;