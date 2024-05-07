import React, {useContext} from 'react'
import "./banner.css"
import Carousel from './Carousel';
import CryptoContext from '../context/CryptoContext';
import Alert from '../Components/Alert';

const Banner = () => {
  const context = useContext(CryptoContext);
  const {alert} = context;
  return (
    <div className='banner'>
      <Alert alert={alert}/>
      <div className='flex flex-col text-blue-400 w-full'>
        <h1 className='md:text-6xl text-4xl font-bold m-auto md:mt-8 mt-8'>Crypto Tracker</h1>
        <p className='md:m-auto ml-10 m-5 md:mt-5 text-lg flex justify-center'>Get Information About Crypto Currency</p>
      </div>
      
      <Carousel/>
    </div>
  )
}
  
export default Banner