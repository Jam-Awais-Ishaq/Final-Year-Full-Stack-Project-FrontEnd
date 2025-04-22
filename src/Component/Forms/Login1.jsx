import React, { useEffect, useState } from 'react';
import { MdHome } from "react-icons/md";
import google from '../../images/google.png';
import playstore from '../../images/playstore.png';
import NewPassword from './NewPassword';
import Register1 from './Register1';

const Login1 = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); 

    const [isToggle , setIsToggle] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        if (!email.includes('@') || !email.includes('.')) {
            setError("Please Enter a valid Email");
            setTimeout(() => setError(""), 3000);
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Please enter a 6-digit password");
            setTimeout(() => setError(""), 3000);
            setIsLoading(false);
            return;
        }

        try {
            setTimeout(() => {
                setSuccess("Logged in successfully");
                setEmail(""); 
                setPassword(""); 
                setIsLoading(false); 

                setTimeout(() => setSuccess(""), 3000); 
            }, 3000); 
        } catch (err) {
            setError("An error occurred while logging in.");
            setTimeout(() => setError(""), 3000);
            setIsLoading(false);
        }
    };
    const handleForgetPassword = () => {
        setShowNewPassword(true);
    };
    useEffect(() => {
        document.body.classList.add("overflow-hidden", "user-select-none");
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const handleRegister = () =>{
        setIsToggle(true)
    }
    const handleLogin = () =>{
        setIsToggle(false)
    }
    if (isToggle) {
        return <Register1 handleLogin={handleLogin}/>
    }
    return (
        <div >
            {showNewPassword ? (
                <NewPassword />
            ) : (
                <div className='p-10 w-[400px] h-[98vh] max-w-md mx-auto bg-white rounded-2xl'>
                    <div className="flex items-center justify-start ml-5 mb-5">
                        <span className='relative border-2 p-2 border-[#0d1222] bg-slate-200 text-[#0d1222] rounded-full text-2xl'>
                            <MdHome />
                        </span>
                        <span className='absolute left-[24%] font-bold bg-[#131a2f] px-5 py-1 border rounded-2xl text-white'>
                            WearHub
                        </span>
                    </div>

                    <form className='flex flex-col space-y-3' onSubmit={handleSubmit}>
                        <div className=' text-center text-slate-800 w-full'>
                            <h1 className='font-bold text-3xl'>Welcome Back</h1>
                            <p className='text-slate-800 text-lg font-thin'>Login to continue shopping</p>
                        </div>
                        <input
                            type="email"
                            className='border border-slate-300 rounded-lg p-2 w-90'
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Your Email'
                            value={email}
                            required
                        />
                        <input
                            type="password"
                            className='border border-slate-300 rounded-lg p-2 w-full'
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter Your Password'
                            value={password}
                            required
                        />
                        <div className='h-[8px] text-center'>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            {success && <p className="text-green-500 text-sm">{success}</p>}
                        </div>
                        <button
                            type="submit"
                            className="bg-red-500 text-white font-bold shadow-md shadow-red-900 p-2 rounded-md flex justify-center items-center"
                            disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                    Logging in...
                                </span>
                            ) : (
                                "Log In"
                            )}
                        </button>

                        <div className='flex justify-between w-full cursor-pointer'>
                            <div className='flex w-[50%]items-center'>
                                <input type="checkbox" />
                                <p className='text-[13px] ml-2'> Terms & Condition </p>
                            </div>
                            <div onClick={handleForgetPassword} className='text-blue-600 cursor-pointer'>
                                Forget Password
                            </div>
                        </div>

                        <button type="button" className='h-9 group bg-slate-300 py-2 flex justify-center items-center rounded-md transition ease-in-out'>
                            <img src={google} className='h-9 w-12 rounded-full' alt="Google" />
                            <p className='ml-4 font-semibold text-slate-800'>Continue with Google</p>
                        </button>
                        <button type="button" className='h-9 group bg-slate-300 py-2 flex justify-center items-center rounded-md transition ease-in-out'>
                            <img src={playstore} className='h-9 w-10 bg-transparent ml-10 rounded-full' alt="Playstore" />
                            <p className='mx-2 font-semibold text-slate-800'>Continue with Playstore</p>
                        </button>
                        <div className='flex justify-center'>
                            <p>Don't have an account? <a className='text-blue-600 border-b-2 cursor-pointer border-blue-600' onClick={handleRegister} >Register</a></p>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
export default Login1;