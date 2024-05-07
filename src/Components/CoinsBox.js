import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import CryptoContext from '../context/CryptoContext';
import { CoinList } from '../config/api';
import Coin from './Coin';

const CoinTable = () => {
  const context = useContext(CryptoContext);
  const { currency, getCoins, login } = context;
  const [ Coins , setCoins] = useState([]);
  const [searchCoin, setSearchCoin] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  const handleClick = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchCoins()
  }, [currency]);

  const searchedCoin = Coins.filter(item => item.symbol.toLowerCase().includes(searchCoin.toLowerCase()) || item.name.toLowerCase().includes(searchCoin.toLowerCase()))
  const coinsPerPage = 8;
  const startIndex = (currentPage - 1) * coinsPerPage;
  const endIndex = Math.min(startIndex + coinsPerPage, searchedCoin.length);

  return (
    <div className='mt-20 md:mt-32 flex flex-col'>
      <div className='flex justify-center'>
        <input className='search_bar w-1/2 h-8 md:h-10 p-3 text-black bg-blue-100' type='text' placeholder='Search Crypto Currency' value={searchCoin} onChange={(e) => (setSearchCoin(e.target.value), setCurrentPage(1))}></input>
      </div>
      <div className="flex flex-row justify-around flex-wrap mt-10">
        {searchedCoin.slice(startIndex, endIndex).map((coin) => {
          return (
            <>
            <Coin key={coin.id} _id={coin._id} id={coin.id} name={coin.name} image={coin.image} coinSymbol={coin.symbol} price_change_percentage_24h={coin.price_change_percentage_24h} current_price={coin.current_price} />
            </>
          )
        })}
      </div>
      <div className='m-auto mb-20'>
        <button className='text-white m-3'
          disabled={currentPage === 1}
          onClick={handleClick}
        >
          <i style={{ color: '#0000CC' }} className="fa-solid fa-chevron-left fa-2xl"></i>
        </button>
        <button className='text-white m-3'

          disabled={Math.ceil(searchedCoin.length / coinsPerPage) <= currentPage}
          onClick={handleChange}
        >
          <i style={{ color: '#0000CC' }} className="fa-solid fa-chevron-right fa-2xl"></i>
        </button>
      </div>
    </div>
  )
}

export default CoinTable