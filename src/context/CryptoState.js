import { useEffect, useState } from 'react'
import CryptoContext from './CryptoContext';

const CryptoState = (prop) => {
  const host = "https://crypto-tracker-backend-sand.vercel.app";
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [userName, setUserName] = useState("");
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchList] = useState(false);
  const [login, setLogin] = useState(false);
  const [alert, setAlert] = useState({ msg: "", color: "black", textColor: "white" })
  const showAlert = (message, color, textColor) => {
    setAlert({
      msg: message,
      color: color,
      textColor: textColor
    })
    setTimeout(() => {
      setAlert({ msg: "", color: "white", textColor: "white" })
    }, 1500);
  }
  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹")
    } else if (currency === "USD") {
      setSymbol("$")
    }

  }, [currency])


  const getCoins = async () => {

    const response = await fetch(`${host}/api/watchlist/getAllCoins`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setCoins(json)
  }

  const addCoin = async (id, coin) => {

    const response = await fetch(`${host}/api/watchlist/addCoin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token')
      },
      body: JSON.stringify({ id, coin }),
    });
    const coin1 = await response.json();
    setCoins(coins.concat(coin1));
  }

  const getUser = async () => {

    const response = await fetch(`${host}/api/user/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token')
      },
    });
    const data = await response.json();
    { data.name && setLogin(true); }
    setUserName(data.name)
  }

  const deleteCoin = async (id) => {
    const response = await fetch(`${host}/api/watchlist/removeCoin/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token')
      }
    });
    const newCoin = coins.filter((coin) => { return coin._id !== id })
    setCoins(newCoin);
  }

  return (
    <CryptoContext.Provider value={{ getUser, alert, showAlert, symbol, currency, setCurrency, setSymbol, setUserName, userName, getCoins, addCoin, deleteCoin, coins, watchlist, setWatchList, login, setLogin }}>
      {prop.children}
    </CryptoContext.Provider>
  )
}

export default CryptoState
