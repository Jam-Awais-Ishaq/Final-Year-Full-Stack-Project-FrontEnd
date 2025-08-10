import React, { useState } from 'react';
import { MdHome, MdVisibility, MdVisibilityOff } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import Login1 from './Login1';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register1 = ({handleClose}) => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        phone: '',
        password: '',
        confirmPassword: '',
        checkeInput: false,
        error: '',
        success: '',
        isLoading: false,
        isToggle: false,
        showPassword: false, // New state for password visibility
        showConfirmPassword: false // New state for confirm password visibility
    });

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/login')
    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const togglePasswordVisibility = () => {
        setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }));
    };

    const toggleConfirmPasswordVisibility = () => {
        setFormData(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({ ...formData, error: '', success: '', isLoading: true });

        // Validation checks
        if (!formData.email.includes('@') || !formData.email.includes('.')) {
            setFormData({ ...formData, error: "Please Enter a valid Email", isLoading: false });
            setTimeout(() => setFormData((prev) => ({ ...prev, error: "" })), 3000);
            return;
        }

        if (formData.password.length < 6) {
            setFormData({ ...formData, error: "Please enter a 6-digit password", isLoading: false });
            setTimeout(() => setFormData((prev) => ({ ...prev, error: "" })), 3000);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setFormData({ ...formData, error: "Password doesn't match", isLoading: false });
            setTimeout(() => setFormData((prev) => ({ ...prev, error: "" })), 3000);
            return;
        }

        if (!formData.checkeInput) {
            setFormData({ ...formData, error: "You must accept the terms & conditions", isLoading: false });
            setTimeout(() => setFormData((prev) => ({ ...prev, error: "" })), 3000);
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, {
                email: formData.email,
                username: formData.username,
                phone: formData.phone,
                password: formData.password
            });

            setFormData({
                ...formData,
                success: "Registered successfully!",
                email: "",
                username: "",
                phone: "",
                password: "",
                confirmPassword: "",
                checkeInput: false,
                isLoading: false
            });

            setTimeout(() => setFormData((prev) => ({ ...prev, success: "" })), 3000);
            
        } catch (error) {
            let errorMessage = "Registration failed. Please try again.";
            if (error.response) {
                if (error.response.status === 400 && error.response.data.error === 'Email already in use') {
                    errorMessage = "Email is already registered.";
                } else if (error.response.data.error) {
                    errorMessage = error.response.data.error;
                }
            }
            
            setFormData({ 
                ...formData, 
                error: errorMessage, 
                isLoading: false 
            });
            setTimeout(() => setFormData((prev) => ({ ...prev, error: "" })), 3000);
        }
    };

    const handleToggle = () => {
        setFormData({ ...formData, isToggle: !formData.isToggle });
    };

    if (formData.isToggle) {
        return <Login1 handleRegister={handleToggle} />;
    }

    return (
        <div className='p-4 fixed inset-0 mt-1 w-[450px] h-[98vh] max-w-md mx-auto border border-slate-500 bg-white rounded-2xl'>
            <button onClick={handleClose || handleToggle} className='absolute md:right-0 right-3 md:top-0 top-1 bg-slate-300 p-4 h-4 w-4 flex justify-center items-center text-red-400 rounded-2xl'>X</button>
            <div className="flex items-center justify-start ml-5 mb-5">
                <span className='relative border-2 p-2 border-[#0d1222] bg-slate-200 text-[#0d1222] rounded-full text-2xl'>
                    <MdHome />
                </span>
                <span className='absolute left-[16%] font-bold bg-[#131a2f] px-5 py-1 border rounded-2xl text-white'>
                    WearHub
                </span>
            </div>
            <form className='flex flex-col space-y-3' onSubmit={handleSubmit}>
                <div className='text-center text-slate-800 w-full'>
                    <h1 className='font-bold text-3xl'>Create Account</h1>
                    <p className='text-slate-800 text-lg font-thin'>Register to start shopping</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder='Enter Your Email' 
                        value={formData.email} 
                        onChange={handleChange} 
                        className='border border-slate-300 rounded p-1 w-80' 
                        required 
                    />
                    <input 
                        type="text" 
                        name="username" 
                        placeholder='UserName' 
                        value={formData.username} 
                        onChange={handleChange} 
                        className='border border-slate-300 rounded p-1 w-80' 
                        required 
                    />
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder='Phone Number' 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className='border border-slate-300 rounded p-1 w-80' 
                        required 
                    />
                    
                    <div className="relative w-80">
                        <input 
                            type={formData.showPassword ? "text" : "password"} 
                            name="password" 
                            placeholder='Enter Your Password' 
                            value={formData.password} 
                            onChange={handleChange} 
                            className='border border-slate-300 rounded p-1 w-full pr-8' 
                            required 
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={togglePasswordVisibility}
                        >
                            {formData.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </button>
                    </div>
                    
                    <div className="relative w-80">
                        <input 
                            type={formData.showConfirmPassword ? "text" : "password"} 
                            name="confirmPassword" 
                            placeholder='Confirm Your Password' 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            className='border border-slate-300 rounded p-1 w-full pr-8' 
                            required 
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {formData.showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </button>
                    </div>
                </div>
                <div className='flex justify-between w-full cursor-pointer'>
                    <div className='flex w-[50%] ml-6 items-center'>
                        <input 
                            type="checkbox" 
                            name="checkeInput"
                            checked={formData.checkeInput}
                            onChange={handleChange}
                        />
                        <p className='text-[13px] ml-2'> Terms & Condition </p>
                    </div>
                </div>
                <div className='h-4 text-center'>
                    {formData.error && <p className="text-red-500 text-sm">{formData.error}</p>}
                    {formData.success && <p className="text-green-500 text-sm">{formData.success}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#ce3d53] hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-300 flex justify-center items-center" 
                    disabled={formData.isLoading}
                >
                    {formData.isLoading ? <CircularProgress size={24} className="text-white" /> : "Register"}
                </button>

                <div className='flex justify-center'>
                    <p>Already have an account? <a className='text-blue-600 border-b-2 cursor-pointer border-blue-600' onClick={handleToggle}>Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default Register1;