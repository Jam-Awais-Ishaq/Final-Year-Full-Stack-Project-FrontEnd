import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import img from '../images/homeLeft.jpeg'
import { FaRegImage } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { FaHome, FaInfo, FaServicestack, FaDollarSign, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import Login1 from "../Component/Forms/Login1";


const Navbar1 = () => {
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [toggle, setToggle] = useState(false)
    const [products, setProducts] = useState([{ id: 0, name: "Jam Awais", email: "awaisjam59@gmail.com", img: img }]);


    const handleChange = () => {
        setToggle(!toggle)
    }
    const handleClose = () => {
        setToggle(false);
    };
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    return (
        <>
            <nav className=" shadow-md">
                <div className="bg-slate-600">
                    <marquee behavior="linear" className="text-white" direction="">Welcome to WearHub – Your Ultimate Fashion Destination!</marquee>
                </div>
                <div className="flex flex-wrap items-center justify-between p-2">
                    <Link to="/" className="flex items-center"><span className="self-center text-2xl ml-3 font-bold text-slate-500  whitespace-nowrap ">WearHub</span></Link>
                    <div className="flex items-center md:order-2 ">
                        <ShoppingCartTwoToneIcon className="text-slate-500" />

                        <AccountCircleTwoToneIcon className="text-slate-500" />
                        <button type="button" onClick={handleChange} className="rounded-lg px-4  py-2 hover:text-cyan hover:bg-slate-800 transition ease-in font-bold mx-2 border border-slate-100 shadow-xl text-slate-100 bg-slate-400"> Login </button>
                    </div>
                    {/* Navbar Links */}
                    <div className={`${mobileMenuOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}>
                        <ul className="flex flex-col md:flex-row items-center font-medium  md:space-x-8 ">
                            <li className="flex items-center md:py-0 py-3 space-x-8">
                                <Link to="mens" className="block  text-slate-500 transition ease-in hover:scale-110 xl:text-[20px] lg:text-[13px] md:text-[10px] hover:text-slate-400 relative group">Mens
                                    <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-black transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li className="flex items-center md:py-0 py-3 space-x-2">
                                <Link to="womens1" className="block text-slate-500 xl:text-[20px] transition ease-in hover:scale-110 lg:text-[13px] md:text-[10px] hover:text-slate-400 relative group">Womens
                                    <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-black transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li className="flex items-center md:py-0 py-3 hover:transition space-x-2">
                                <Link to='kids' className="block text-slate-500  xl:text-[20px] transition ease-in hover:scale-110 lg:text-[13px] md:text-[10px]  relative group">Kids
                                    <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-black transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li className="flex items-center md:py-0 py-3 space-x-2">
                                <Link to="ai" className="block text-slate-500  xl:text-[18px] transition ease-in hover:scale-110 lg:text-[13px] md:text-[10px] hover:text-slate-400 relative group">Ai Feshion Designer
                                    <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-black transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li className="flex items-center md:py-0 py-3 space-x-2">
                                <Link to="contact" className="block text-slate-500 xl:text-[20px]  transition ease-in hover:scale-110 lg:text-[13px] md:text-[10px] hover:text-slate-400 relative group">Contact
                                    <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-black  transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            <div className="">
                {toggle && (
                    <div className="fixed inset-0 z-50 w-[100%] flex justify-center items-center bg-black bg-opacity-80">
                        <div className="relative bg-white rounded-2xl border-2 border-slate-600 shadow-xl">
                            <button className="absolute top-1 flex justify-center items-center rounded-md bg-slate-100 border h-6 w-6 p-3 right-1 text-gray-700" onClick={handleClose}>X</button>
                            <Login1 />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar1;