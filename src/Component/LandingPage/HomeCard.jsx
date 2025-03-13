import React from 'react'
import homeImage1 from '../../images/card1.jpeg'
import homeImage2 from '../../images/homeLeft.jpeg'
import homeImage3 from '../../images/homepage.jpeg'

const HomeCard = () => {
    const products = [
        { id: 0, img: homeImage1, title: "weekend discount", cardBody: "complement your flawless beauty", cardfoot: "only this week don't miss..." },
        { id: 1, img: homeImage2, title: "weekend discount", cardBody: "don't miss the opportunity...", cardfoot: "bringing you the elements of style..." },
        { id: 2, img: homeImage3, title: "weekend discount", cardBody: "fashion is nothing without people", cardfoot: "best prices, latest models..." },
    ];

    return (
        <div className='lg:flex lg:justify-between mt-[25px] mx-2 lg:flex-row md:flex md:flex-col md:justify-center items-center cursor-pointer px-3'>
            {products.map((product) => (
                <div 
                    key={product.id} 
                    className='lg:w-[32%] md:w-[100%] h-[45vh] md:h-[50vh] my-2 rounded-lg bg-cover bg-center bg-no-repeat xl:p-6 lg:p-4 p-6 flex flex-col border border-slate-300 justify-center items-start'
                    style={{ backgroundImage: `url(${product.img})` }}
                >
                    <p className='capitalize text-slate-600 text-sm sm:text-base'>{product.title}</p>
                    <h1 className='xl:text-[28px] text-slate-600 lg:text-[22px] sm:text-[20px] w-[80%] font-bold capitalize'>
                        {product.cardBody}
                    </h1>
                    <p className='capitalize py-1 text-slate-600 text-xs font-semibold'>{product.cardfoot}</p>
                    <button type="button" className='border-b-2 border-red-500 text-slate-600 w-fit text-sm font-bold mt-3 uppercase'>
                        Shop Now
                    </button>
                </div>
            ))}
        </div>
    );
}

export default HomeCard;