import React from 'react'
import homeLeft from '../../images/homeLeft.jpeg'
import sliderIMage from '../../images/sliderImage.png'
const Home = () => {

    return (
        <>
            <div className='md:flex md:justify-between px-5 mt-4'>
                <div style={{ backgroundImage: `url(${sliderIMage})`, backgroundSize: 'contain', backgroundPosition: 'right', backgroundRepeat:"no-repeat" }} className="pl-6 md:w-[48%] md:mt-0 mt-6 bg-cover cursor-pointer h-[85vh] rounded-xl shadow-xl shadow-slate-400 border-2 border-slate-300 flex md:justify-start justify-center  items-start flex-col">
                    <p className='text-slate-600 font-semibold lg:mt-[60px] md:mt-[30px] xl:text-xl lg:text-md'>Style like never before</p>
                    <h1 className='xl:text-4xl lg:text-2xl md:w-[50%]  w-[60%] text-slate-500  my-3 xl:font-semibold font-bold '>Clothes brighten you to the extent you deserve</h1>
                    <p className='text-slate-600 font-semibold xl:text-lg lg:text-md text-xs ml-1'>We've got the best outfits you can wear!</p>
                    <button type="button" className='mt-8 border-b-4 border-red-800' >Shop Now</button>
                </div>
                <div style={{ backgroundImage: `url(${homeLeft})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="pl-6 md:w-[48%]  md:mt-0 mt-6 h-[85vh] rounded-xl shadow-xl cursor-pointer shadow-slate-400 border border-slate-400 flex  md:justify-start justify-center items-start flex-col">
                    <p className='text-slate-600 font-semibold lg:mt-[60px] md:mt-[30px] xl:text-xl lg:text-md'>Style like never before</p>
                    <h1 className='xl:text-4xl lg:text-2xl md:text-xl text-lg md:w-[50%] w-[60%] text-slate-500 my-3 xl:font-semibold font-bold'>Clothes brighten you to the extent you deserve</h1>
                    <p className='text-slate-600 font-semibold xl:text-lg lg:text-md text-xs ml-1'>We've got the best outfits you can wear!</p>
                    <button type="button" className='mt-8 border-b-4 border-red-800' >Shop Now</button>
                </div>
            </div>
        </>
    )
}
export default Home