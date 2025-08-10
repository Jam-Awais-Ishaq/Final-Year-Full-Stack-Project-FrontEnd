import React, { useContext, useEffect, useState } from 'react'
import WomenImg from '../../images/women.png'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Context } from '../../ContextAPI/ContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Womens1 = () => {
    const { addToCartFunc, addToFavorites } = useContext(Context)
    const [womens, setWomens] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/category/women`);
                const productsWithId = response.data.map(product => ({
                    ...product,
                    id: product._id,
                }));
                setWomens(productsWithId);
            } catch (err) {
                console.log("error in women Section", err);
                setError("Failed to fetch women's products");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    const navigate = useNavigate()

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
    if (loading) {
        return <div className="text-center py-8">Loading women's products...</div>;
    }
    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }
    if (!womens || womens.length === 0) {
        return <div className="text-center py-8">No women's products found</div>;
    }
    return (
        <>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 flex-wrap overflow-x-hidden p-2'>
                {womens.map((women) => (
                    <div key={women._id} className="relative border border-slate-300 rounded-lg my-1 mx-3 flex justify-between items-center flex-col group">
                        <img 
                            className="h-[35vh] transition-all group-hover:scale-110 duration-500 group-hover:rounded-3xl ease-in-out cursor-pointer mx-[8px] my-[20px] rounded" 
                            src={women.image?.startsWith('http') ? women.image : `http://localhost:5000${women.image}`} 
                            alt={women.title || 'Women product'}
                        />
                        <span className="absolute top-5 right-[-50px] group-hover:right-1 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600"> 
                            <RemoveRedEyeIcon /> 
                        </span>
                        <span 
                            onClick={() => handleFavoriteClick(women)} 
                            className="absolute top-12 right-[-50px] group-hover:right-1 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600"> 
                            <FavoriteBorderIcon /> 
                        </span>
                        <h1 className="lg:text-lg capitalize font-semibold cursor-pointer">{women.name}</h1>
                        <p className="lg:text-xl text-yellow-500 cursor-pointer">
                            <StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon />
                        </p>
                        <h3 className="cursor-pointer text-2xl">${women.price}</h3>
                        <button 
                            onClick={() => addToCartFunc(women)} 
                            className="rounded-xl w-[90%] capitalize transition ease-in-out bg-slate-300 font-bold my-4 px-3 py-3 group-hover:bg-blue-900 group-hover:text-white" 
                            type="button"
                        >
                            Add To cart
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Womens1;