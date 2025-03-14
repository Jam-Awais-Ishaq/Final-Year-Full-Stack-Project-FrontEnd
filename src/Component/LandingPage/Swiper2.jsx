import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
// material icons
import { StarBorder, ArrowRight, Star } from '@mui/icons-material';
// images
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BoysApparel from '../../images/BoysApparel2.png';
import peach from '../../images/peach.png';
import whiteimg from '../../images/white.png';
import peachFeshion from '../../images/peachFashion.png';
import sliderImage from '../../images/sliderImage.png';
import women from '../../images/women.png';
import charcoal from '../../images/charcoal.png';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../ContextAPI/ContextProvider';
import { useNavigate } from 'react-router-dom';

export default function Swiper2() {
    const { addToCartFunc, rating, handleRating,addToFavorites } = useContext(Context);
    const [sliderDate, setSliderDate] = useState([]);
    const slider = [
        { id: 0, img: women, title: "Shalwar Kameez", off: "50%", price: 70 },
        { id: 1, img: whiteimg, title: "White T-shirt", off: "50%", price: 70 },
        { id: 2, img: peach, title: "Olive T-shirt", off: "50%", price: 70 },
        { id: 3, img: BoysApparel, title: "Kids Full Dress", off: "50%", price: 70 },
        { id: 4, img: charcoal, title: "Charcoal T-shirt", off: "50%", price: 70 },
        { id: 5, img: sliderImage, title: "Pent Shirt", off: "50%", price: 70 },
        { id: 6, img: peachFeshion, title: "Peach Fashion T-shirt", off: "50%", price: 70 },
    ];

    useEffect(() => {
        setSliderDate(slider);
    }, []);

    const navigate = useNavigate();

    const handleNavigate = (product) => {
        addToFavorites(product)
        navigate('/productCart');
    };

    return (
        <div className='px-4 mt-2 mb-5'>
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
                {sliderDate.map((slide) => (
                    <SwiperSlide key={slide.id} className="border-2 px-9 rounded-lg border-slate-400 flex justify-center items-center">
                        <div className="relative flex justify-center items-center flex-col group w-full">
                            {/* Image */}
                            <img
                                className="lg:h-[30vh] h-[35vh] transition-all group-hover:scale-110 duration-500 group-hover:rounded-3xl ease-in-out cursor-pointer mx-[8px] my-[20px] rounded"
                                src={slide.img}
                                alt={slide.title}
                            />

                            {/* Icons with right-to-left sliding effect */}
                            <span className="absolute top-5  right-[-30px] group-hover:right-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600">
                                <RemoveRedEyeIcon />
                            </span>
                            <span onClick={() => handleNavigate(slide)} className="absolute top-12  right-[-30px] group-hover:right-0 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600 cursor-pointer">
                                <FavoriteBorderIcon />
                            </span>

                            {/* Title */}
                            <h1 className="capitalize font-semibold cursor-pointer">{slide.title}</h1>

                            {/* Star Rating */}
                            <p className="lg:text-xl text-yellow-500 cursor-pointer">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} onClick={() => handleRating(slide.id, star)} className="cursor-pointer text-yellow-500">
                                        {rating[slide.id] >= star ? <Star /> : <StarBorder />}
                                    </span>
                                ))}
                            </p>

                            {/* Price */}
                            <h3 className="cursor-pointer text-2xl">
                                ${slide.price}
                                <del className='text-xs font-semibold border-b-2 border-red-400 text-red-400'>{slide.off}</del>
                            </h3>

                            {/* Add to Cart Button with Full Width */}
                            <button
                                onClick={() => addToCartFunc(slide)}
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
