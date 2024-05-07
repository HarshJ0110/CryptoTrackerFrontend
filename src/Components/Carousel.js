import React, { useContext, useEffect, useState } from 'react'
import {TrendingCoins } from '../config/api'
import CryptoContext from '../context/CryptoContext';
import axios from 'axios';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import CoinBox from './CoinsBox';

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const context = useContext(CryptoContext);
    const { currency, symbol } = context;

    const fetchTrendingCoins = async () => {
        try {
            const { data } = await axios.get(TrendingCoins(currency));
            setTrending(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchTrendingCoins()
    }, [currency]);

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link to={`/coins/${coin.id}`} className='carousel_coin text-white'>
                <img src={coin?.image} alt={coin.name} width="80px" className='mt-10'></img>
                <span className='mt-5 text-lg'>{coin?.symbol}&nbsp;
                    <span style={{color: profit > 0 ? "#02f744": "red"}}>{profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%</span>
                </span>
                <p className='mt-1 font-bold text-xl'>{symbol}{numberWithCommas(coin?.current_price.toFixed(2))}</p>
            </Link>)
    })

    const responsive = {
        0: {
            items: 1,
        },
        512: {
            items: 2,
        },
        800: {
            items: 4,
        },
    };
    return (
        <>
        <div className="w-3/4 m-auto mt-5 flex justify-center">
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableButtonsControls
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
            
        </div>
        <div className='mt-30'>
            <CoinBox />
        </div>
        </>
    )
}

export default Carousel