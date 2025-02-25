import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// images
import BoysApparel from '../../images/BoysApparel2.png';
import peach from '../../images/peach.png';
import whiteimg from '../../images/white.png';
import peachFeshion from '../../images/peachFashion.png';
import sliderImage from '../../images/sliderImage.png';
import women from '../../images/women.png';
import charcoal from '../../images/charcoal.png';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../ContextAPI/ContextProvider';

export default function Swiper1() {


    const {rating,handleRating,addToCartFunc } = useContext(Context);
    const [sliderData, setSliderData] = useState([]);

    const slider = [
        { id: 0, img: BoysApparel, title: "Child Full Dress", price: 145 },
        { id: 1, img: peach, title: "Olive T-Shirt", price: 145 },
        { id: 2, img: whiteimg, title: "White T-Shirt", price: 145 },
        { id: 3, img: peachFeshion, title: "Fashion T-Shirt", price: 145 },
        { id: 4, img: sliderImage, title: "Jeans and Shirt", price: 145 },
        { id: 5, img: women, title: "Shalwar Kameez", price: 145 },
        { id: 6, img: charcoal, title: "Charcoal T-Shirt", price: 145 },
    ];

    useEffect(() => {
        setSliderData(slider);
    }, []);
    
    return (
        <div className='px-5 mt-5'>
            <Swiper slidesPerView={1} spaceBetween={30} loop={true} navigation={true} modules={[Navigation]} className="mySwiper overflow-hidden"
                breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}>
                {sliderData.map((slide) => (
                    <SwiperSlide key={slide.id} className="border-2 px-9 rounded-lg border-slate-400 flex justify-center items-center">
                        <div className="relative flex justify-center items-center flex-col group">
                            <img className="h-[35vh] transition-all group-hover:scale-110 duration-500 group-hover:rounded-3xl ease-in-out cursor-pointer mx-[8px] my-[20px] rounded"
                                src={slide.img} alt={slide.title} />
                            <span className="absolute top-5 right-[-30px] group-hover:right-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600">
                                <RemoveRedEyeIcon />
                            </span>
                            <span className="absolute top-12 right-[-30px] group-hover:right-0 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600">
                                <FavoriteBorderIcon />
                            </span>
                            <h1 className="lg:text-lg capitalize font-semibold cursor-pointer">{slide.title}</h1>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} onClick={() => handleRating(slide.id, star)}
                                        className="cursor-pointer text-yellow-500">
                                        {rating[slide.id] >= star ? <StarIcon /> : <StarBorderIcon />}
                                    </span>
                                ))}
                            </div>
                            <h3 className="cursor-pointer text-2xl">${slide.price}</h3>
                            <button onClick={() => addToCartFunc(slide)}
                                className="rounded-xl w-[100%] capitalize transition ease-in-out bg-slate-300 font-bold my-4 px-3 py-3 group-hover:bg-blue-900 group-hover:text-white"
                                type="button">
                                Add To Cart
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
