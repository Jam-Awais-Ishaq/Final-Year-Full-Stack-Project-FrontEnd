import React, { useEffect, useState } from 'react';
import { MdHome, MdVisibility, MdVisibilityOff } from "react-icons/md";
import google from '../../images/google.png';
import playstore from '../../images/playstore.png';
import Register1 from './Register1';
import { useNavigate } from 'react-router-dom';
import VerifyEmail from './VerifyEmail';
import { useAuth } from '../../AuthContext/AuthProvider';

const Login1 = ({ handleClose }) => {
    const [state, setState] = useState({
        email: '',
        password: '',
        error: '',
        success: '',
        showNewPassword: false,
        isLoading: false,
        isToggle: false,
        showPassword: false, // New state for password visibility
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setState(prev => ({ ...prev, showPassword: !prev.showPassword }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState(prev => ({ ...prev, error: '', success: '', isLoading: true }));

        if (!state.email.includes('@') || !state.email.includes('.')) {
            setState(prev => ({ ...prev, error: "Please Enter a valid Email", isLoading: false }));
            setTimeout(() => setState(prev => ({ ...prev, error: "" })), 3000);
            return;
        }
        if (state.password.length < 6) {
            setState(prev => ({ ...prev, error: "Please enter a 6-digit password", isLoading: false }));
            setTimeout(() => setState(prev => ({ ...prev, error: "" })), 3000);
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: state.email, password: state.password }),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Login failed');

            login(data.token)

            setState(prev => ({
                ...prev,
                success: data.message || "Logged in successfully",
                email: '',
                password: '',
            }));

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (err) {
            setState(prev => ({ ...prev, error: err.message || "Failed to Login" }));
            setTimeout(() => setState(prev => ({ ...prev, error: "" })), 3000);
        } finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const handleForgetPassword = () => {
        setState(prev => ({ ...prev, showNewPassword: true }));
    };

    const handleRegister = () => {
        setState(prev => ({ ...prev, isToggle: true }));
    };

    const handleLogin = () => {
        setState(prev => ({ ...prev, isToggle: false }));
    };

    useEffect(() => {
        document.body.classList.add("overflow-hidden", "user-select-none");
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    if (state.isToggle) {
        return <Register1 handleLogin={handleLogin} />
    }

    return (
        <div>
            {state.showNewPassword ? (
                <VerifyEmail handleClose={handleClose} />
            ) : (
                <div className='p-10 w-[400px] h-[90vh] max-w-md mx-auto bg-white rounded-2xl'>
                    <div className="flex items-center justify-start ml-5 mb-5">
                        <span className='relative border-2 p-2 border-[#0d1222] bg-slate-200 text-[#0d1222] rounded-full text-2xl'>
                            <MdHome />
                        </span>
                        <span className='absolute left-[26%] font-bold bg-[#131a2f] px-5 py-1 border rounded-2xl text-white'>
                            WearHub
                        </span>
                    </div>

                    <form className='flex flex-col space-y-3' onSubmit={handleSubmit}>
                        <div className='text-center text-slate-800 w-full'>
                            <h1 className='font-bold text-3xl'>Welcome Back</h1>
                            <p className='text-slate-800 text-lg font-thin'>Login to continue shopping</p>
                        </div>

                        <input type="email" className='border border-slate-300 rounded-lg p-2 w-90' onChange={(e) => setState(prev => ({ ...prev, email: e.target.value }))} placeholder='Enter Your Email' value={state.email} required />

                        <div className="relative">
                            <input
                                type={state.showPassword ? "text" : "password"}
                                className='border border-slate-300 rounded-lg p-2 w-full pr-10'
                                onChange={(e) => setState(prev => ({ ...prev, password: e.target.value }))}
                                placeholder='Enter Your Password'
                                value={state.password}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={togglePasswordVisibility}
                            >
                                {state.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                            </button>
                        </div>

                        <div className='h-[8px] text-center'>
                            {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
                            {state.success && <p className="text-green-500 text-sm">{state.success}</p>}
                        </div>

                        <button
                            type="submit"
                            className="bg-red-500 text-white font-bold shadow-md shadow-red-900 p-2 rounded-md flex justify-center items-center"
                            disabled={state.isLoading}>
                            {state.isLoading ? (
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
                            <div className='flex w-[50%] items-center'>
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
                            <p>Don't have an account? <a className='text-blue-600 border-b-2 cursor-pointer border-blue-600' onClick={handleRegister}>Register</a></p>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login1;