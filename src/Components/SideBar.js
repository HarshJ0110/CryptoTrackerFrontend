import React, { useContext, useEffect } from 'react';
import WatchlistCoin from './WatchList';
import CryptoContext from '../context/CryptoContext';

const SideBar = () => {
    const context = useContext(CryptoContext);
    const { userName, getCoins, coins, watchlist, setWatchList } = context;
    const watchlistHandler = (e) => {
        e.preventDefault();
        setWatchList(false)
    }
    useEffect(() => {
        getCoins();
    }, [])

    return (
        <>
            <div className={`w-96 h-screen bg-black bg-opacity-85 text-blue-400 ${watchlist ? 'sidebar active' : 'sidebar'}`}>
                <div className='flex justify-between my-10 mx-12'>
                    <h1 className='text-3xl'>{userName}</h1>
                    <h1 className='text-2xl'>Coins{" : " + coins.length}</h1>
                </div>
                <div className='flex justify-between m-3 mx-12'>
                    <h1 className='text-2xl'>WatchList</h1>
                    <p><i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={watchlistHandler}></i></p>
                </div>
                <div className='border-2 border-blue-400 rounded-lg px-12 m-10 text-lg'>
                    {coins.length > 0 && coins.map((c) => {
                        return <WatchlistCoin key={c.id} addedcoin={c} />
                    })}
                </div>
            </div>
        </>
    )
}
export default SideBar
