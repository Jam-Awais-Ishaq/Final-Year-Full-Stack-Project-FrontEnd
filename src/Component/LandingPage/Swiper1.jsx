import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// images
import BoysApparel from '../../images/BoysApparel2.png';
import peach from '../../images/peach.png'
import whiteimg from '../../images/white.png'
import peachFeshion from '../../images/peachFashion.png'
import sliderImage from '../../images/sliderImage.png'
import women from '../../images/women.png'
import charcoal from '../../images/charcoal.png'
import { useEffect, useState } from 'react';

export default function Swiper1() {
    const [sliderDate, setSliderDate] = useState([]);
    const slider = [
        { id: 0, img: BoysApparel, title: "child full dress", price: 145 },
        { id: 1, img: peach, title: "Olive tshirt", price: 145 },
        { id: 2, img: whiteimg, title: "white tshirt", price: 145 },
        { id: 3, img: peachFeshion, title: "Feshion tshirt", price: 145 },
        { id: 4, img: sliderImage, title: "Jeans and shirt ", price: 145 },
        { id: 5, img: women, title: "shalwar Kameez", price: 145 },
        { id: 6, img: charcoal, title: "charcoal tshirt", price: 145 },
    ];

    useEffect(() => {
        setSliderDate(slider);
    }, []);

    return (
        <>
            <div className='px-2'>
                <Swiper slidesPerView={1} spaceBetween={30} loop={true} navigation={true} modules={[Navigation]} className="mySwiper  overflow-hidden" breakpoints={{ 640: { slidesPerView: 2, }, 1024: { slidesPerView: 4, }, }}>
                    {sliderDate.map((slide) => (
                        <SwiperSlide key={slide.id} className="border-2 px-9 rounded-lg border-slate-400 flex justify-center items-center">
                            <div className="relative flex justify-center items-center flex-col group">
                                <img className=" h-[35vh] transition-all group-hover:scale-110 duration-500 group-hover:rounded-3xl ease-in-out cursor-pointer mx-[8px] my-[20px] rounded" src={slide.img} alt={slide.title} />
                                <span className="absolute top-5 right-[-40px] group-hover:right-1 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600"> <RemoveRedEyeIcon /> </span>
                                <span className="absolute top-12 right-[-40px] group-hover:right-1 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 w-fit text-slate-600"> <FavoriteBorderIcon /> </span>
                                <h1 className="lg:text-lg capitalize font-semibold cursor-pointer">{slide.title}</h1>
                                <p className="lg:text-xl text-yellow-500 cursor-pointer"><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /></p>
                                <h3 className="cursor-pointer text-2xl">${slide.price}</h3>
                                <button
                                    className="rounded-xl w-[100%] capitalize transition ease-in-out bg-slate-300 font-bold my-4 px-3 py-3 group-hover:bg-blue-900 group-hover:text-white" type="button">Add To cart</button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
