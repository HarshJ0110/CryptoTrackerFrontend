import React, { useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom";
import Alert from '../Components/Alert';
import CryptoContext from '../context/CryptoContext';

const ResetPassword = () => {

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const link = "https://crypto-tracker-backend-sand.vercel.app"
    const context = useContext(CryptoContext);
    const { showAlert, alert } = context;
    let navigation = useNavigate();
    const { token } = useParams();

    const resetPasswordSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${link}/api/user/password/reset`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({password, confirmPassword,token})
          });
        const data = await response.json();
        if (data.success) {
            showAlert("Password reset successfully", "black", "#65B741");
            navigation("/login")
        } else {
            showAlert(data.message, "black", "#D80032")
        }
    }



    return (
        <div className='flex flex-col justify-center items-center h-screen text-blue-400 '>
            <Alert alert={alert}/>
            <form className='lg:w-[30vw] md:w-[60vw] w-[85vw] border border-blue-400 p-12 rounded-lg mt-10' onSubmit={resetPasswordSubmit}>
                <h1 className='text-3xl mt-0 mb-5'>Reset Password</h1>
                <label className='block mb-3'>New Password</label>
                <input placeholder='New Password' className='block mb-3 w-full p-2 px-3 rounded-md border border-blue-400 bg-black hover:bg-black placeholder:text-blue-400 placeholder:opacity-50' type="password" name="newPassword" minLength={5} required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label className='block mb-3'>Confirm Password</label>
                <input placeholder='Confirm Password' className='block mb-3 w-full p-2 px-3 rounded-md border border-blue-400 bg-black hover:bg-black placeholder:text-blue-400 placeholder:opacity-50' type="password"  name="confirmPassword" minLength={5} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button className='w-full p-2 my-3 border hover:bg-blue-400 border-blue-400 hover:text-black rounded-md'>Submit</button>
            </form>
        </div>
    )
}

export default ResetPassword
