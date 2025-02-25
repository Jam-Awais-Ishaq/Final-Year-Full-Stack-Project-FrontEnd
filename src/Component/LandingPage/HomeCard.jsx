import React from 'react'
// import homeImage from '../images/banner-68.webp'
import homeImage1 from '../../images/card1.jpeg'
import homeImage2 from '../../images/homeLeft.jpeg'
import homeImage3 from '../../images/homepage.jpeg'
const HomeCard = () => {
    const products = [
        { id: 0, img: homeImage1, title: "weekend discount", cardBody: "complement your flawless beauty", cardfoot: "only this week don't miss..." },
        { id: 1, img: homeImage2, title: "weekend discount", cardBody: "don't miss the opportunity...", cardfoot: "bringing you the elements of style..." },
        { id: 2, img: homeImage3, title: "weekend discount", cardBody: "fashion is nothing without people", cardfoot: "best prices,latest models..." },

    ]
    return (
        <>
            <div className='lg:flex lg:justify-between mt-[25px] mx-2 lg:flex-row md:flex md:flex-col md:justify-center items-center cursor-pointer px-3'>
                {
                    products.map((product, index) => (
                        <div key={product.id} className={`lg:w-[32%] md:w-[100%] md:h-[50vh] h-[60vh] my-2 rounded-lg bg-cover bg-center bg-no-repeat xl:p-6 lg:p-2 lg:flex lg:justify-strat lg:items-start md:flex justify-center pl-2 flex-col text-slate-700 border border-slate-300 `} style={{ backgroundImage: `url(${product.img})` }}>
                            <p className='capitalize mt-1'>{product.title}</p>
                            <h1 className='xl:text-[28px] lg:text-[22px] w-[75%] font-bold capitalize'>{product.cardBody}</h1>
                            <p className='capitalize py-1 text-xs font-semibold'> {product.cardfoot} </p>
                            <button type="button" className='border-b-2 border-red-500 w-fit text-sm font-bold m-2 uppercase'> shop Now </button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default HomeCard