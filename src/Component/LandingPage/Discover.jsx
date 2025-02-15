import React from 'react'
import homePage from '../../images/homepage.jpeg'
import homeLeft from '../../images/homeLeft.jpeg'
import homeRight from '../../images/homeright.jpeg'
const Discover = () => {
    return (
        <>
            <div className='md:flex justify-between items-center px-5 my-5 '>
                <div className='border border-slate-300 rounded-xl  md:w-[48%] p-1'>
                    <div style={{ backgroundImage: `url(${homePage})`, backgroundSize: "cover", backgroundPosition: "center" }} className='w-[100%] rounded h-[50vh] mb-3 flex justify-center  items-start px-2 flex-col'>
                        <h1 className='w-[70%]  font-bold italic text-slate-500 xl:text-3xl lg:text-xl mb-3'>You should consult an Ai fashion designer to recommend color combinations.</h1>
                        <button type="button" className='mt-3 bg-slate-900 text-white xl:p-4 lg:p-3 p-2 rounded-md font-bold'>Discover Now</button>
                    </div>
                    <div className='lg:flex justify-between'>
                        <div style={{ backgroundImage: `url(${homeLeft})`, backgroundSize: "cover", backgroundPosition: "center" }} className='h-[200px] px-3 lg:w-[48%] my-2 flex justify-center items-start rounded-xl flex-col text-slate-700'>
                            <h2 className='text-red capitalize  font-bold text-2xl'>fashion & confort</h2>
                            <p className='font-semibold my-2'>Together in a Bag</p>
                            <button className='border-b-2 my-3 font-extrabold uppercase border-red-500'>shop Now</button>
                        </div>
                        <div style={{ backgroundImage: "url(src/images/card1.jpeg)", backgroundSize: "cover", backgroundPosition: "center" }} className='h-[200px] px-3 lg:w-[48%] my-2 flex justify-center items-start rounded-xl flex-col text-slate-700 '>
                            <h2 className='text-red capitalize  font-bold text-2xl'>Tops</h2>
                            <p className='font-semibold my-2'>Get the latest signature pieces</p>
                            <button className='border-b-2 my-3 font-extrabold uppercase border-red-500'>shop Now</button>
                        </div>
                    </div>
                </div>
                <div className='border border-slate-300  rounded-xl flex justify-center pt-[45px] pl-2 text-slate-700 items-start flex-col  lg:h-[100vh] mt-1 md:h-[163vh] md:w-[48%]' style={{ backgroundImage: `url(${homeRight})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    <h1 className='md:text-6xl text-4xl capitalize font-bold'>garments</h1>
                    <p className='w-[60%] capitalize font-semibold py-4'>Enjoy the summer time and shop our SS20 Collection at up to 50% off, for a limited time</p>

                    <button type="button" className='border-b-2 border-red-400 font-extrabold uppercase'>shop Now</button>
                </div>
            </div>
        </>
    )
}

export default Discover