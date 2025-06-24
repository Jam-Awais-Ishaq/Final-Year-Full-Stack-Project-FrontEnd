import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../ContextAPI/ContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginModal from '../Auth/LoginModel';

export default function Swiper1() {
    const { rating, handleRating, addToCartFunc, addToFavorites } = useContext(Context);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/products/category/clothing');
                console.log("API Response:", response.data);

                const productsWithId = response.data.map(product => ({
                    ...product,
                    id: product._id,
                    img: product.image,
                    title: product.name || "Untitled Product",
                    name: product.name || "Untitled Product"
                }));

                setProducts(productsWithId);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleNavigate = (product) => {
        const productToAdd = {
            id: product._id,
            title: product.name || product.title || "Untitled Product",
            name: product.name || "Untitled Product",
            price: product.price || 0,
            image: product.image,
            img: product.image,
            description: product.description || ""
        };
    };

    const handleFavoriteClick = async (product) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

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

    const handleAddToCart = (product) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setShowLoginModal(true); // Show login modal if not authenticated
            return;
        }

        // If authenticated, add to cart
        addToCartFunc({
            ...product,
            id: product._id,
            img: product.image,
            title: product.name
        });
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div className='px-5 mt-5'>

            {showLoginModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 max-w-md w-full">
                        <LoginModal handleClose={handleCloseModal} />
                    </div>
                </div>
            )}
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper overflow-hidden"
                breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}>
                {products.map((product) => (
                    <SwiperSlide key={product._id} className="border-2 px-9 rounded-lg border-slate-400 flex justify-center items-center">
                        <div className="relative w-full flex justify-center items-center flex-col group">
                            <img
                                className="h-[35vh] transition-all group-hover:scale-110 duration-500 group-hover:rounded-3xl ease-in-out cursor-pointer mx-[8px] my-[20px] rounded"
                                src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/fallback-image.jpg';
                                }}
                            />
                            <span className="absolute top-5 right-[-30px] group-hover:right-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600">
                                <RemoveRedEyeIcon />
                            </span>
                            <span
                                className="absolute top-12 cursor-pointer right-[-30px] group-hover:right-0 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600"
                                onClick={() => handleFavoriteClick(product)}
                            >
                                <FavoriteBorderIcon />
                            </span>
                            <h1 className="lg:text-lg capitalize font-semibold cursor-pointer">{product.name}</h1>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => handleRating(product._id, star)}
                                        className="cursor-pointer text-yellow-500"
                                    >
                                        {rating[product._id] >= star ? <StarIcon /> : <StarBorderIcon />}
                                    </span>
                                ))}
                            </div>
                            <h3 className="cursor-pointer text-2xl">${product.price}</h3>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="rounded-xl w-[100%] capitalize transition ease-in-out bg-slate-300 font-bold my-4 px-3 py-3 group-hover:bg-blue-950 group-hover:text-white"
                                type="button"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}