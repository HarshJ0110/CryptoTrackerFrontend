import React,{useContext} from 'react'
import CryptoContext from '../context/CryptoContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    
    const context = useContext(CryptoContext);
    const {currency, setCurrency, setWatchList, login, setLogin, watchlist} = context;

    const handleLogout = (e) => {
        e.preventDefault();
        setLogin(!login);
        localStorage.removeItem('token');
        window.location.reload();
    }
    const handleClick = (e) =>{
        e.preventDefault();
        setWatchList(!watchlist);
    }

    return (
        <div className='bg-black p-3 flex flex-row justify-between text-blue-400'>
            <Link to="/" className='text-xl md:pl-4 font-bold'>Crypto Tracker</Link>
            <div className='md:pr-4 flex flex-row px-2'>
                <select className="bg-black text-lg pr-2 py-1" value={currency} onChange={(e) => {
                    setCurrency(e.target.value)}}>
                    <option className='bg-black p-3'>INR</option>
                    <option className='bg-black m-4'>USD</option>
                </select>
                {!login && <Link to="/signup" className='text-lg pl-5 md:py-1'>Signup</Link>}
                {login && <button className='text-lg px-5 md:pl-7 md:py-1' onClick={handleClick}><i class="fa-solid fa-file-lines"></i></button>}
                {login && <button className='text-lg md:px-5 md:py-1' onClick={handleLogout}>Logout</button>}
            </div>
        </div>
    )
}

export default Navbar
