import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import img from '../images/homeLeft.jpeg'
import { FaRegImage } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";


import { FaHome, FaInfo, FaServicestack, FaDollarSign, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import Login1 from "../Component/Forms/Login1";


const Navbar1 = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
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
    // const products = [{ id: 0, name: "Jam Awais", email: "awaisjam59@gmail.com", img: img }]
    const handleImageChange = (event, productId) => {
        const file = event.target.files[0];
        if (file) {
            const updatedImage = URL.createObjectURL(file);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId
                        ? { ...product, img: updatedImage }
                        : product
                )
            );
        }
    };
    return (
        <>
            <nav className=" shadow-md">
                <div className="flex flex-wrap items-center justify-between p-2">
                    <Link to="/" className="flex items-center"><span className="self-center text-2xl ml-3 font-bold text-slate-500  whitespace-nowrap ">WearHub</span></Link>
                    <div className="flex items-center md:order-2 ">
                        <button type="button" onClick={handleChange} className="rounded-lg px-4  py-2 hover:text-cyan-200 hover:bg-slate-800 transition ease-in font-bold mx-2 border border-slate-100 shadow-xl text-slate-100 bg-slate-400"> Login </button>

                        {
                            products.map((product) => (
                                <button key={product.id} type="button" onClick={toggleDropdown} className="flex text-sm bg-gray-800 relative mr-2 border rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button"><img className="w-8 h-8 rounded-full" src={product.img} alt="" /></button>))}
                        {/* Mobile Menu Toggle */}
                        <button className="text-gray-500 md:hidden focus:outline-none" onClick={toggleMobileMenu}><FaBars size={24} /></button>
                        {dropdownOpen && (
                            <div className="z-50 my-4 text-base list-none absolute xl:right-12 lg:left-[79%] md:right-5 md:top-11 right-10 top-[10%] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                {
                                    products.map((product) => (
                                        <div key={product.id} className="px-4 py-3">
                                            <span className="text-sm flex justify-between items-center text-gray-900 dark:text-white">{product.name}<input type="file" className="hidden" onChange={(e) => handleImageChange(e, product.id)} id={`file-input-${product.id}`} />
                                                <label htmlFor={`file-input-${product.id}`} className="text-white cursor-pointer text-md"><FaRegImage /></label></span>
                                            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{product.email}</span>
                                        </div>
                                    ))
                                }
                                <ul className="py-2">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"> Dashboard </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"> Settings </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        )}
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