import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import CryptoContext from '../context/CryptoContext';

const WatchList = (props) => {

  const context = useContext(CryptoContext);
  const {deleteCoin} = context;
  const {addedcoin} = props;
  return (
    
    <div className='w-48 list py-2'>
        <Link to={`/coins/${addedcoin.id}`}>
          {addedcoin.coin} 
        </Link>
        <i className="fa-sharp fa-solid fa-trash cursor-pointer text-blue-500"  onClick={() => {deleteCoin(addedcoin._id)}}></i>
    </div>
  )
}

export default WatchList