import React, { useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Login1 from "../Component/Forms/Login1";
import { Button } from "@mui/material";
import AddToCart from "../Add to Cart/AddToCart";
import CloseIcon from '@mui/icons-material/Close';

const Navbar1 = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const handleChange = () => setToggle(!toggle);
    const handleClose = () => setToggle(false);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const toggleCart = () => setCartOpen(!cartOpen);

    // Hide scrollbar when cart is open
    useEffect(() => {
        if (cartOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => document.body.classList.remove("overflow-hidden");
    }, [cartOpen]);

    return (
        <>
            <nav className="shadow-md">
                <div className="bg-slate-600">
                    <marquee className="text-white">Welcome to WearHub - Your Ultimate Fashion Destination!</marquee>
                </div>
                <div className="flex flex-wrap items-center justify-between p-2">
                    <Link to="/" className="flex items-center">
                        <span className="self-center text-2xl ml-3 font-bold text-slate-500">WearHub</span>
                    </Link>
                    <div className="flex items-center md:order-2">
                        <div className="flex justify-between items-center md:w-[150px] w-[130px] mr-4">
                            <div className="w-fit h-fit">
                                <CgProfile className="text-2xl text-slate-600" />
                            </div>
                            <div className="w-fit h-fit cursor-pointer" onClick={toggleCart} >
                                <PiShoppingCartSimpleFill className="text-2xl" />
                            </div>
                            <Button onClick={handleChange} variant="contained" size="small">Login</Button>
                        </div>
                        <button className="text-gray-500 md:hidden focus:outline-none" onClick={toggleMobileMenu}>
                            <FaBars size={24} />
                        </button>
                    </div>
                    <div className={`${mobileMenuOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}>
                        <ul className="flex flex-col md:flex-row items-center font-medium md:space-x-8">
                            {["mens", "womens", "childrens", "ai", "contact"].map((item) => (
                                <li key={item} className="flex items-center md:py-0 py-3">
                                    <Link to={item} className="block text-slate-500 xl:text-[20px] lg:text-[13px] md:text-[10px] relative group">
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                        <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-slate-500 transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            {toggle && (
                <div className="fixed inset-0 z-50 w-full flex justify-center items-center bg-black bg-opacity-80">
                    <div className="relative bg-white rounded-2xl border-2 border-slate-600 shadow-xl">
                        <button className="absolute top-1 flex justify-center items-center rounded-md bg-slate-100 border h-6 w-6 p-3 right-1 text-gray-700" onClick={handleClose}>X</button>
                        <Login1 />
                    </div>
                </div>
            )}

            {cartOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: cartOpen ? 0.5 : 0 }} exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }} transition={{ duration: 0.5, ease: "easeInOut" }} className="fixed inset-0 bg-black z-40 pointer-events-auto" onClick={toggleCart}></motion.div>
            )}
            <motion.div initial={{ x: "100%", opacity: 0 }} animate={{ x: cartOpen ? "0%" : "100%", opacity: cartOpen ? 1 : 0 }} exit={{ x: "100%", opacity: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="fixed right-0 top-0 w-[40%] shadow-slate-950 h-screen bg-white z-50 shadow-xl" onClick={(e) => e.stopPropagation()}>

                <IconButton aria-label="close" onClick={toggleCart} sx={(theme) => ({ position: 'absolute', right: 3, top: 5, color: theme.palette.grey[500], transition: 'background-color 0.3s ease, color 0.3s ease', '&:hover': { backgroundColor: theme.palette.grey[800], color: theme.palette.common.white, }, })}><CloseIcon /></IconButton>

                <AddToCart />
            </motion.div >
        </> 
    );
};

export default Navbar1;
