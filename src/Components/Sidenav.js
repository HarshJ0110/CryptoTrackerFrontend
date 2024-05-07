import React from 'react'

const Sidenav = ({ symbol, currency, coin }) => {
  const sanitizedHtml = coin?.description.en.split('. ')[0];
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (<>
    {coin &&
      <div className='text-white mt-5 p-5 lg:w-1/3'>
        <div className='carousel_coin p-5'>
          <img src={coin?.image.large} alt={coin?.name} width={180}></img>
          <h1 className='text-2xl font-bold p-4'>{coin?.name}</h1>
          <p className='description' dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
        </div>
        <div className='text-xl'>
          <p className='px-5 p-2'><span className='font-bold'>Rank : </span>{coin?.market_cap_rank}</p>
          <p className='px-5 p-2'><span className='font-bold'>Current Price : </span>{symbol}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</p>
          <p className='px-5 p-2'><span className='font-bold'>Market cap : </span>{symbol}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()])}</p>
        </div>
      </div>
    }
  </>
  )
}

export default Sidenav