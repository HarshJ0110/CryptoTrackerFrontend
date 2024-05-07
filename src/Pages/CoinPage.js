import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import CryptoContext from '../context/CryptoContext';
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import Navbar from '../Components/Navbar';
import CoinInfo from '../Components/CoinInfo';
import Sidenav from '../Components/Sidenav';
import LoadingBar from '../Components/Loadingbar';

const CoinPage = () => {
  const {id} = useParams();
  const [coin, setCoin] = useState();
  const context = useContext(CryptoContext);
  const { currency , symbol } = context;

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCoin()
  }, [currency]);

  return (
    <div>
      <Navbar/>
      {!coin && <LoadingBar />}
      <div className='lg:mt-10 lg:flex lg:flex-row w-full h-full'>
      <Sidenav symbol={symbol} currency={currency} coin={coin} />
      <CoinInfo id={id}/>
      </div>
    </div>
  )
}

export default CoinPage