import React from 'react'
import { MdHome } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";

import playstore from '../images/playstore.png'
import appstore from '../images/appstore.png'

const Footer1 = () => {
    return (
        <>
            <div className=' bg-[#222935] lg:flex justify-between text-slate-400 px-5 py-5'>
                <div className='lg:w-[30%] mt-5 flex justify-between items-start flex-col '>
                    <div className="flex my-3 p-1 sm:flex items-center logo">
                        <span className='relative border-2 p-2 border-white rounded-full text-2xl'><MdHome /></span>
                        <span className='left-[60px] font-bold absolute bg-[#1D284F] md:px-5 py-[5px] border rounded-2xl text-white '>WearHub</span>
                    </div>
                    <div className='w-fit my-3  font-bold p-1'>
                        We see our customers as invited guests to a party, and we are the hosts. It’s our job every day to make every important aspect of the customer experience a little bit better
                    </div>
                    <div className='lg:w-[100%] w-[100%]  flex'>
                        <button type="button" className='rounded-lg hover:shadow-lg shadow-white p-1  flex justify-center items-center bg-[#1E1531] md:w-[50%]  text-white'>
                            <img src={playstore} className='lg:w-10 lg:h-12 h-10' />
                            <p className='capitalize xl:text-md md:text'>get from playStore</p>
                        </button>
                        <button type="button" className='rounded-lg hover:shadow-lg shadow-white p-1 flex justify-center items-center ml-2 bg-[#1E1531] md:w-[50%] text-white'>
                            <img src={appstore} className='lg:w-10 md:w-10 h-10' />
                            <p className='capitalize md:text-md'>get from AppStore</p>
                        </button>
                    </div>
                </div>
                <div className=' w-auto mt-5  md:flex md:justify-between '>
                    <ul className=' md:w-[40%]  pl-5 capitalize'>
                        <h4 className='font-bold text-white xl:text-3xl lg:text-xl mt-2'>About us</h4>
                        <li className=' font-thin pl-2'><a href="">careers</a></li>
                        <li className=' font-thin pl-2'><a href="">our store</a></li>
                        <li className=' font-thin pl-2'><a href="">our cares</a></li>
                        <li className=' font-thin pl-2'><a href="">terms & condition</a></li>
                        <li className=' font-thin pl-2'><a href="">privacy policy</a></li>
                    </ul>
                    <ul className=' md:w-[33%] justify-start'>
                        <h4 className='xl:text-3xl lg:text-2xl md:text-lg text-white font-bold mt-5'>Customer cares</h4>
                        <li className='my-1 font-thin'><a href="">help canter</a></li>
                        <li className='my-1 font-thin'><a href="">track your order</a></li>
                        <li className='my-1 font-thin'><a href="">corporate and bulk purchasing</a></li>
                        <li className='my-1 font-thin'><a href="">return & refund</a></li>
                    </ul>
                    <ul className='font-bold md:w-[33%]'>
                        <h1 className='font-bold lg:text-3xl md:text-2xl text-white mt-5'>Cantact us</h1>
                        <li className='w-[100%] '><a href="" className='cursor-pointer  transition ease-in-out hover:scale-90 hover:text-white'>63100,street No 1,Goheer town, bahawalpur, punjab, pakistan</a></li>
                        <li className='my-3 cursor-pointer  transition ease-in-out hover:scale-10 hover:text-white'><a href="">Email: awaisjam59@gmail.com</a></li>
                        <li className='my-3 cursor-pointer  transition ease-in-out hover:scale-15 hover:text-white'><a href="">+92-310-8727759</a></li>
                        <li className='flex justify-between w-[20%] '>
                            <span className='bg-[#1B212A] p-3 mx-2 rounded-xl cursor-pointer transition ease-in hover:scale-110 hover:text-white'><FaFacebookF /></span>
                            <span className='bg-[#1B212A] p-3 mx-2 rounded-xl cursor-pointer transition ease-in hover:scale-110 hover:text-white'><RiTwitterXLine /></span>
                            <span className='bg-[#1B212A] p-3 mx-2 rounded-xl cursor-pointer transition ease-in-out hover:scale-110 hover:text-white'><FaInstagram /></span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Footer1