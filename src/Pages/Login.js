import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import Image from "../assets/images/cryptoimage.png"
import CryptoContext from '../context/CryptoContext';
import Alert from '../Components/Alert';

const Login = () => {

  const context = useContext(CryptoContext);
  const {setUserName, setLogin, showAlert, alert, login} = context;

  const link = "https://cryptotrackerbackend.onrender.com"
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigation = useNavigate();
  const handelChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value})
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${link}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password})
    });

    const json = await response.json();
    
    if (json.sucess) {
      setUserName(json.name);
      localStorage.setItem('token', json.authtoken);
      showAlert("LoggedIn SucessFully","black","#65B741")
      navigation("/");
      setLogin(true);
    }else{
      showAlert("Invalid credentials","black","#D80032")
    }
  }

  useEffect(()=>{
    if(login){
      navigation("/");
    }
  })

  return (
    <>
      <Navbar />
      <Alert alert={alert}/>
      <div className="h-screen md:h-[91vh] md:mb-3 md:grid md:place-content-center">
        <div className="md:max-w-3xl md:max-h-xl md:mx-auto md:flex md:items-center md:rounded-3xl md:shadow-2xl">
          <div className='h-full w-1/2'>
            <img
              src={Image}
              alt="login"
              className="image hidden md:block md:rounded-l-3xl h-full"
            />
          </div>
          <div className='w-screen p-10 mt-12 md:m-5 md:p-0 md:mr-0 md:w-80 text-blue-400'>
            <form onSubmit={handlesubmit}>
              <h1 className='text-3xl mt-0 mb-2'>Login</h1>
              <p className='mb-9'>CRYPTO HUB</p>
              <label className='block mb-2'>E-mail</label>
              <input placeholder='example@gmail.com' className='block mb-6 w-full p-2 pl-3 pr-3 rounded-md border border-blue-400 bg-black hover:bg-black placeholder:text-blue-400 placeholder:opacity-50' type="email" id="email" name="email" minLength={5} required value={credentials.email} onChange={handelChange}/>
              <label className='block mb-2'>Password</label>
              <input placeholder='password' className='w-full p-2 pl-3 pr-3 mb-6 rounded-md border border-blue-400 bg-black placeholder:text-blue-400 placeholder:opacity-50' type="password" id="password" name="password" minLength={5} required value={credentials.password} onChange={handelChange}/>
              <button className='w-full mb-3 p-2 mr-0 border hover:bg-blue-400 border-blue-400 hover:text-black rounded-md' type="submit">Login</button>
              <Link to="/password/forgot" className='block'>Forgot Password ?</Link>
              <hr className='invisible w-[37vw] md:mb-1 md:w-36 inline-block md:visible border-blue-400'/><span className='text-center w-3 p-1 text-blue-400'>or</span><hr className='hidden md:mb-1 md:w-36 md:inline-block border-blue-400'/>
              <p className='flex justify-center w-full p-2 mt-3 border hover:bg-blue-400 border-blue-400 hover:text-black rounded-md'><Link to="/signup">SignUp</Link></p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
