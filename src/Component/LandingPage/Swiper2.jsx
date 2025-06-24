import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { StarBorder, ArrowRight, Star } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../ContextAPI/ContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginModal from '../Auth/LoginModel';

export default function Swiper2() {
    const {
        addToCartFunc,
        rating,
        handleRating,
        addToFavorites,
    } = useContext(Context);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false); // State for login modal
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/products/category/NewArrival');
                const productsWithDiscount = response.data.map(product => ({
                    ...product,
                    id: product._id,
                    off: "50%"
                }));
                setProducts(productsWithDiscount);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleFavoriteClick = async (product) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setShowLoginModal(true);
                return;
            }

            const productToAdd = {
                ...product,
                img: product.image,
                id: product._id || product.id
            };

            await addToFavorites(productToAdd);
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
        return (
            <div className="flex justify-center items-center h-64">
                Loading products...
            </div>
        );
    }

    return (
        <div className='px-4 mt-2 mb-5 relative'>
            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 max-w-md w-full">
                        <LoginModal handleClose={handleCloseModal} />
                    </div>
                </div>
            )}

            <div className='flex justify-between items-center px-1 italic bg-slate-200 rounded mx-1 mb-1 capitalize font-semibold'>
                <h1 className='lg:text-3xl'>New Arrival</h1>
                <p className='lg:text-xl cursor-pointer flex items-center'>View All <ArrowRight /></p>
            </div>
            
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper py-2 overflow-hidden"
                breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product._id} className="border-2 px-9 rounded-lg border-slate-400 flex justify-center items-center">
                        <div className="relative flex justify-center items-center flex-col group w-full">
                            {/* Image */}
                            <img
                                className="lg:h-[30vh] h-[35vh] transition-all group-hover:scale-110 duration-500 group-hover:rounded-3xl ease-in-out cursor-pointer mx-[8px] my-[20px] rounded"
                                src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'data:image/svg+xml;base64,...';
                                }}
                            />

                            {/* Slide-in Icons */}
                            <span className="absolute top-5 right-[-30px] group-hover:right-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600">
                                <RemoveRedEyeIcon />
                            </span>
                            <span
                                onClick={() => handleFavoriteClick(product)}
                                className="absolute top-12 right-[-30px] group-hover:right-0 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600 cursor-pointer"
                            >
                                <FavoriteBorderIcon />
                            </span>

                            {/* Product Name */}
                            <h1 className="capitalize font-semibold cursor-pointer">{product.name}</h1>

                            {/* Star Rating */}
                            <p className="lg:text-xl text-yellow-500 cursor-pointer">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => handleRating(product._id, star)}
                                        className="cursor-pointer text-yellow-500"
                                    >
                                        {rating[product._id] >= star ? <Star /> : <StarBorder />}
                                    </span>
                                ))}
                            </p>

                            {/* Price and Discount */}
                            <h3 className="cursor-pointer text-2xl">
                                ${product.price}
                                <del className='text-xs font-semibold border-b-2 border-red-400 text-red-400 ml-2'>{product.off}</del>
                            </h3>

                            {/* Add to Cart Button */}
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="rounded-xl w-full capitalize transition ease-in-out bg-slate-300 font-bold my-4 px-3 py-3 group-hover:bg-blue-950 group-hover:text-white"
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