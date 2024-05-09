import React, { useState, useContext } from 'react'
import CryptoContext from '../context/CryptoContext';
import { Link } from 'react-router-dom'
import Alert from '../Components/Alert';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const link = "https://cryptotrackerbackend.onrender.com"
    const context = useContext(CryptoContext);
    const { showAlert, alert } = context;

    const forgotPasswordSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${link}/api/user/password/forgot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (data.sucess) {
            showAlert(`Password reset link sent to ${email}`, "black", "#65B741")
        } else {
            showAlert("Invalid email", "black", "#D80032")
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen text-blue-400 '>
            <Alert alert={alert} />
            <form className='lg:w-[30vw] border border-blue-400 mt-10 p-12 rounded-lg' onSubmit={forgotPasswordSubmit}>
                <h1 className='text-3xl mt-0 mb-5'>Forgot Password</h1>
                <label className='block mb-2'>E-mail</label>
                <input placeholder='example@gmail.com' className='block mb-3 w-full p-2 px-3 rounded-md border border-blue-400 bg-black hover:bg-black placeholder:text-blue-400 placeholder:opacity-50' type="email" id="email" name="email" minLength={5} required value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className='w-full p-2 my-3 border hover:bg-blue-400 border-blue-400 hover:text-black rounded-md'>Send</button>
                <Link to="/login">Back to login</Link>
            </form>
        </div>
    )
}

export default ForgotPassword
