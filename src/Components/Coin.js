import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import CryptoContext from '../context/CryptoContext';


const Coin = ({id, name, coinSymbol, image, price_change_percentage_24h, current_price }) => {
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let profit = price_change_percentage_24h >= 0;

    const context = useContext(CryptoContext);
    const { symbol , addCoin, coins, deleteCoin, login } = context;

    const isCoinInWatchlist = coins.length > 0 && coins.some(c => c.coin == name);
    const addedCoin = coins.length && coins.filter(c => c.coin == name)

    return (
        <div className='carousel_coin w-32 md:w-1/6 mx-10 mt-10 mb-20'>
            <Link to={`/coins/${id}`} className='carousel_coin text-white'>
            <img src={image} alt={name} width="80px"></img>
                <p className='mt-5 text-lg'>{name}</p>
                <span className='mt-1 text-lg'>{coinSymbol}&nbsp;
                    <span style={{ color: profit > 0 ? "#02f744" : "red" }}>{profit && "+"}{price_change_percentage_24h?.toFixed(2)}%</span>
                </span>
                <p className='mt-1 font-bold text-xl'>{symbol}{numberWithCommas(current_price.toFixed(2))}</p>
            </Link>

            {isCoinInWatchlist ? ( login &&
                <button className='text-red-400 mt-8' onClick={() => deleteCoin(addedCoin[0]._id)}>REMOVE FROM WATCHLIST</button>
            ) : ( login &&
                <button className='text-green-400 mt-8' onClick={() => addCoin(id, name)}>ADD TO WATCHLIST</button>
            )}

            {/* <button className='text-green-400 mt-8' onClick={() => {addCoin(id,name)}}>ADD TO WATCHLIST</button> */}
        </div>
    )
}

export default Coin