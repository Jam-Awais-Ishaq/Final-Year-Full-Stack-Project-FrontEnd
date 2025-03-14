import React, { useContext, useEffect, useState } from 'react'
import WomenImg from '../../images/women.png'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Context } from '../../ContextAPI/ContextProvider';
import { useNavigate } from 'react-router-dom';
const Womens1 = () => {

    // const { addToCartFunc } = useContext(Context)
    const { addToCartFunc, addToFavorites } = useContext(Context)
    const [womens, setwomens] = useState([])
    const products = [
        { id: 0, img: WomenImg, title: "womens dress", price: 278 },
        { id: 1, img: WomenImg, title: "womens dress", price: 278 },
        { id: 2, img: WomenImg, title: "womens dress", price: 278 },
        { id: 3, img: WomenImg, title: "womens dress", price: 278 },
        { id: 4, img: WomenImg, title: "womens dress", price: 278 },
        { id: 5, img: WomenImg, title: "womens dress", price: 278 },
        { id: 6, img: WomenImg, title: "womens dress", price: 278 },
        { id: 7, img: WomenImg, title: "womens dress", price: 278 },
    ]
    useEffect(() => {
        setwomens(products)
    }, [])

    const navigate = useNavigate()
    const handleNavigate = (product) => {
        addToFavorites(product)
        navigate("/productCart")
    }
    return (
        <>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 flex-wrap overflow-x-hidden p-2'>
                {womens.map((women) => (
                    <div key={women.id} className="relative border border-slate-300 rounded-lg my-1 mx-3 flex justify-between items-center flex-col group">
                        <img className=" h-[35vh] transition-all group-hover:scale-110 duration-500 group-hover:rounded-3xl ease-in-out cursor-pointer mx-[8px] my-[20px] rounded" src={women.img} />
                        <span className="absolute top-5 right-[-50px] group-hover:right-1 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600"> <RemoveRedEyeIcon /> </span>
                        <span onClick={() => handleNavigate(women)} className="absolute top-12 right-[-50px] group-hover:right-1 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600"> <FavoriteBorderIcon /> </span>
                        <h1 className="lg:text-lg capitalize font-semibold cursor-pointer">{women.title}</h1>
                        <p className="lg:text-xl text-yellow-500 cursor-pointer"><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /></p>
                        <h3 className="cursor-pointer text-2xl">${women.price}</h3>
                        <button onClick={() => addToCartFunc(women)} className="rounded-xl w-[90%] capitalize transition ease-in-out bg-slate-300 font-bold my-4 px-3 py-3 group-hover:bg-blue-900 group-hover:text-white" type="button">Add To cart</button>
                    </div>
                ))
                }
            </div>

        </>
    )
}
export default Womens1