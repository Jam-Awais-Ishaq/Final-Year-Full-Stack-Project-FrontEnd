import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
// material icons
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import StarIcon from '@mui/icons-material/Star';
// images
import BoysApparel from '../../images/BoysApparel2.png';
import peach from '../../images/peach.png'
import whiteimg from '../../images/white.png'
import peachFeshion from '../../images/peachFashion.png'
import sliderImage from '../../images/sliderImage.png'
import women from '../../images/women.png'
import charcoal from '../../images/charcoal.png'
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../ContextAPI/ContextProvider';

export default function Swiper2() {
    const { addToCartFunc, rating, handleRating } = useContext(Context)
    const [sliderDate, setSliderDate] = useState([]);
    const slider = [
        { id: 0, img: women, title: "shalwar Kameez", off: "50%", price: 145 },
        { id: 1, img: whiteimg, title: "white tshirt", off: "50%", price: 145 },
        { id: 2, img: peach, title: "Olive tshirt", off: "50%", price: 145 },
        { id: 3, img: BoysApparel, title: "Kids full dress", off: "50%", price: 145 },
        { id: 4, img: charcoal, title: "charcoal tshirt", off: "50%", price: 145 },
        { id: 5, img: sliderImage, title: "pent shirt", off: "50%", price: 145 },
        { id: 6, img: peachFeshion, title: "peach Feshion tshirt", off: "50%", price: 145 },
    ];
    useEffect(() => {
        setSliderDate(slider);
    }, []);

    return (
        <>
            <div className='px-4 mt-2 mb-5'>
                <div className='flex justify-between items-center px-1 italic bg-slate-200 rounded mx-1 mb-1 capitalize font-semibold'>
                    <h1 className='lg:text-3xl '>New Arrival</h1>
                    <p className='lg:text-xl cursor-pointer flex items-center '> view all<ArrowRightIcon /> </p>
                </div>
                <Swiper slidesPerView={1} spaceBetween={30} loop={true} navigation={true} modules={[Navigation]} className="mySwiper py-2 overflow-hidden" breakpoints={{ 640: { slidesPerView: 2, }, 1024: { slidesPerView: 4, }, }}>
                    {sliderDate.map((slide) => (
                        <SwiperSlide key={slide.id} className="border-2 px-9 rounded-lg border-slate-400 flex justify-center items-center">
                            <div className="relative flex justify-center items-center flex-col group">
                                <img className=" lg:h-[30vh] h-[35vh] transition-all group-hover:scale-110 duration-500 group-hover:rounded-3xl ease-in-out cursor-pointer mx-[8px] my-[20px] rounded" src={slide.img} alt={slide.title} />
                                <span className="absolute top-5 right-[-40px] group-hover:right-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600"> <RemoveRedEyeIcon /> </span>
                                <span className="absolute top-12 right-[-40px] group-hover:right-0 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600"> <FavoriteBorderIcon /> </span>
                                <h1 className="lg:text-[px] capitalize font-semibold cursor-pointer">{slide.title}</h1>
                                <p className="lg:text-xl text-yellow-500 cursor-pointer">
                                    {[1, 2, 3, 4, 5].map((star) =>
                                        <span key={star} onClick={() => handleRating(slide.id, star)} className="cursor-pointer text-yellow-500">
                                            {rating[slide.id] >= star ? <StarIcon /> : <StarBorderIcon />}
                                        </span>
                                    )}
                                </p>
                                <h3 className="cursor-pointer text-2xl">${slide.price} <del className='text-xl font-semibold border-b-2 border-red-400 text-red-400'>{slide.off}</del> </h3>
                                <button onClick={() => addToCartFunc(slide)} className="rounded-xl w-[100%] capitalize transition ease-in-out bg-slate-300 font-bold my-4 px-3 py-3 group-hover:bg-blue-900 group-hover:text-white" type="button">Add To cart</button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
