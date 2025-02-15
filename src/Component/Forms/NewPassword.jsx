import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import Login1 from "./Login1";
import { Navigate, useNavigate } from "react-router-dom";

const NewPassword = () => {
    const [state, setState] = useState({
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false,
        isLoading: false,
        error: "",
        success: false,
        showNewPassword: false
    });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value, error: "", success: false });
    };

    const toggleVisibility = (field) => {
        setState({ ...state, [field]: !state[field] });
    };

    const validatePassword = () => {
        if (state.password.length < 6) {
            return "Password must be at least 6 characters.";
        }
        if (state.password !== state.confirmPassword) {
            return "Passwords do not match.";
        }
        return "";
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validatePassword();
        if (validationError) {
            setState({ ...state, error: validationError });
            setTimeout(() => {
                setState((prev)=>({...prev,error:""}))
            }, 3000);
            return;
        }
        setState({ ...state, isLoading: true });
        setTimeout(() => {
            setState({ ...state, isLoading: false, success: true });
            alert("Password reset successful! Redirecting...");

        }, 3000);
    };

    const handleChangeComponent = () => {
        setState({ ...state, isLoading: false, showNewPassword: true })
    }

    return (
        <div className="">
            {state.showNewPassword ? (<Login1 />) : (
                <div className="flex justify-center p-10 items-center">
                    <div className="bg-white  p-3 w-[300px] h-[400px]">
                        <div className="flex justify-start items-center mb-6">
                            <span className="border-2 border-gray-700 relative p-3 rounded-full text-2xl">
                                <MdHome />
                            </span>
                            <span className="bg-[#1D284F] px-4 py-1 ml-4 absolute left-[20%] text-white text-lg font-bold rounded-2xl">
                                WearHub
                            </span>
                        </div>

                        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Reset Password</h2>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            Enter your new password below.
                        </p>

                        <form className="space-y-3" onSubmit={handleSubmit}>
                            <div className="relative">
                                <input
                                    type={state.showPassword ? "text" : "password"}
                                    name="password"
                                    value={state.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border-box shadow-md focus:border-blue-500 outline-none focus:ring-0 focus:border-b"
                                    placeholder="New Password"
                                />
                                <span className="absolute right-4 top-3 cursor-pointer text-gray-600" onClick={() => toggleVisibility("showPassword")}>
                                    {state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </div>
                            <div className="relative ">
                                <input
                                    type={state.showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={state.confirmPassword}
                                    onChange={handleChange}
                                    className="w-[100%]  px-4 py-2 border-box shadow-md focus:border-blue-500 outline-none focus:ring-0 focus:border-b"
                                    placeholder="Confirm Password"
                                />
                                <span className="absolute right-4 top-3 cursor-pointer text-gray-600" onClick={() => toggleVisibility("showConfirmPassword")}>
                                    {state.showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </div>

                            <div className="min-h-[20px] text-center">
                                {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
                                {state.success && (
                                    <p className="text-green-500 text-sm">Password reset successful!</p>
                                )}
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-full bg-[#ce3d53] hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-300 flex justify-center items-center"
                                    disabled={state.isLoading}
                                >
                                    {state.isLoading ? <CircularProgress size={24} className="text-white" /> : "Reset Password"}
                                </button>
                            </div>

                            <p className="text-center mt-3 text-gray-600">
                                Already have an account?{" "}
                                <a className="text-blue-700  cursor-pointer hover:underline" onClick={handleChangeComponent} >
                                    Login
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewPassword;