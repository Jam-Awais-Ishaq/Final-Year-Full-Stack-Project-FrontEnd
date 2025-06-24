import React, { useContext, useEffect, useState } from 'react'
import menImg from '../../images/sliderImage.png'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Context } from '../../ContextAPI/ContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Mens = () => {

    const { addToCartFunc, addToFavorites } = useContext(Context)
    const [mens, setMens] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        const fetcheProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/products/category/mens")
                const productsWithId = response.data.map(product => ({
                    ...product,
                    id: product._id,
                }));
                setMens(productsWithId);
            } catch (err) {
                console.err("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        }
        fetcheProducts();
    }, [])

    // const handleNavigate = (product) => {
    //     addToFavorites(product)
    //     navigate("/productCart")
    // }

    const handleFavoriteClick = async (product) => {
        try {
            const productToAdd = {
                ...product,
                img: product.image,
                id: product._id || product.id
            };

            await addToFavorites(productToAdd);
            console.log("Product added to favorites:", productToAdd);
            navigate("/productCart");
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };
    return (
        <>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 overflow-x-hidden p-2'>
                {mens.map((men) => (
                    <div key={men._id} className="relative border border-slate-300 rounded-lg  my-1 mx-3 flex justify-between items-center flex-col group">
                        <img className=" h-[35vh] transition-all group-hover:scale-110 duration-500 group-hover:rounded-3xl ease-in-out cursor-pointer mx-[8px] my-[20px] rounded" src={men.image.startsWith('http') ? men.image : `http://localhost:5000${men.image}`} />

                        <span className="absolute top-5 right-[-20px] group-hover:right-4 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600"> <RemoveRedEyeIcon /> </span>
                        <span onClick={() => handleFavoriteClick(men)} className="absolute top-12 right-[-20px] group-hover:right-4 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600"> <FavoriteBorderIcon /> </span>
                        <h1 className="lg:text-lg capitalize font-semibold cursor-pointer">{men.name}</h1>
                        <p className="lg:text-xl text-yellow-500 cursor-pointer"><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /></p>
                        <h3 className="cursor-pointer text-2xl">${men.price}</h3>
                        <button onClick={() => addToCartFunc(men)} className="rounded-xl w-[90%] capitalize transition ease-in-out bg-slate-300 font-bold my-4 px-3 py-3 group-hover:bg-blue-900 group-hover:text-white" type="button">Add To cart</button>
                    </div>
                ))
                }
            </div>

        </>
    )
}

export default Mens