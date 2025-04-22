import React, { useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import { FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Login1 from "../Component/Forms/Login1";
import { Button } from "@mui/material";
import AddToCart from "../Add to Cart/AddToCart";
import CloseIcon from '@mui/icons-material/Close';
import Register1 from "../Component/Forms/Register1";

const Navbar1 = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleChange = () => setToggle(!toggle);
    const toggleAuthForm = () => setIsLogin(!isLogin);
    const handleClose = () => {
        setToggle(false);
        document.body.classList.remove("overflow-hidden");
    };
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        document.body.classList.toggle("overflow-hidden", !mobileMenuOpen);
    };
    const toggleCart = () => setCartOpen(!cartOpen);

    // Mobile menu animation variants
    const mobileMenuVariants = {
        hidden: { 
            height: 0,
            opacity: 0,
            transformOrigin: "top center",
            scaleY: 0,
            skewY: "-10deg"
        },
        visible: {
            height: "auto",
            opacity: 1,
            scaleY: 1,
            skewY: "0deg",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: {
            height: 0,
            opacity: 0,
            scaleY: 0,
            skewY: "-10deg",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const menuItemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { 
            x: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300
            }
        }
    };

    // Hide scrollbar when cart or mobile menu is open
    useEffect(() => {
        if (cartOpen || mobileMenuOpen || toggle) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => document.body.classList.remove("overflow-hidden");
    }, [cartOpen, mobileMenuOpen, toggle]);

    return (
        <>
            <nav className="shadow-md sticky top-0 z-40 bg-white">
                <div className="bg-blue-950">
                    <marquee className="text-white">Welcome to WearHub - Your Ultimate Fashion Destination!</marquee>
                </div>
                <div className="flex flex-wrap items-center justify-between p-2">
                    <Link to="/" className="flex items-center">
                        <span className="self-center text-2xl font-bold text-slate-500">WearHub</span>
                    </Link>
                    <div className="flex items-center md:order-2">
                        <div className="flex justify-between items-center md:w-[150px] w-[130px] mr-4">
                            <div className="w-fit h-fit">
                                <Link to='profile'><CgProfile className="text-2xl text-[#1E3A8A]" /></Link>
                            </div>
                            <div className="w-fit h-fit cursor-pointer" onClick={toggleCart} >
                                <PiShoppingCartSimpleFill className="text-2xl text-[#1E3A8A]" />
                            </div>
                            <Button onClick={handleChange} sx={{ backgroundColor: '#1E3A8A', '&:hover': { backgroundColor: 'blue' } }} variant="contained" size="small">Login</Button>
                        </div>
                        <button 
                            className="text-gray-500 md:hidden focus:outline-none z-50" 
                            onClick={toggleMobileMenu}
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu with Fold Animation */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={mobileMenuVariants}
                                className="fixed top-20 left-0 right-0 bg-white shadow-lg z-30 md:hidden"
                            >
                                <motion.ul className="flex flex-col items-center font-medium p-4 space-y-4">
                                    {["mens", "womens", "childrens", "ai", "contact"].map((item) => (
                                        <motion.li
                                            key={item}
                                            variants={menuItemVariants}
                                            className="w-full text-center"
                                        >
                                            <Link 
                                                to={item} 
                                                className="block text-slate-500 text-lg py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                                                onClick={toggleMobileMenu}
                                            >
                                                {item.charAt(0).toUpperCase() + item.slice(1)}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Desktop Menu */}
                    <div className={`hidden md:flex md:w-auto md:order-1`}>
                        <ul className="flex flex-row items-center font-medium space-x-8">
                            {["mens", "womens", "childrens", "ai", "contact"].map((item) => (
                                <li key={item} className="flex items-center">
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

            {/* Auth Modal */}
            {toggle && (
                <div className="fixed inset-0 z-50 w-full flex justify-center items-center bg-black bg-opacity-80">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-white rounded-2xl border-2 border-slate-600 shadow-xl w-full max-w-md"
                    >
                        <button
                            className="absolute top-2 right-2 flex justify-center items-center rounded-md bg-slate-100 border h-6 w-6 p-3 text-gray-700 hover:bg-slate-200"
                            onClick={handleClose}>
                            X
                        </button>
                        {isLogin ? (
                            <Login1 handleClose={handleClose} handleRegister={toggleAuthForm} />
                        ) : (
                            <Register1 handleClose={handleClose} handleLogin={toggleAuthForm} />
                        )}
                    </motion.div>
                </div>
            )}

            {/* Cart Overlay */}
            {cartOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black z-40"
                    onClick={toggleCart}
                />
            )}

            {/* Cart Panel */}
            <AnimatePresence>
                {cartOpen && (
                    <motion.div 
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25 }}
                        className="fixed right-0 top-0 md:w-[45%] w-[85%] h-screen bg-white z-50 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <IconButton 
                            aria-label="close" 
                            onClick={toggleCart} 
                            sx={(theme) => ({ 
                                position: 'absolute', 
                                right: 3, 
                                top: 5, 
                                color: theme.palette.grey[500],
                                '&:hover': { 
                                    backgroundColor: theme.palette.grey[800], 
                                    color: theme.palette.common.white 
                                } 
                            })}
                        >
                            <CloseIcon />
                        </IconButton>
                        <AddToCart />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar1;