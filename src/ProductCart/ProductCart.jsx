import { useEffect, useState } from "react";
import { Button, Rating } from "@mui/material";
import { ShoppingCart, LocalMall, Reviews } from "@mui/icons-material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import img1 from "../images/homeLeft.jpeg";
import img2 from "../images/olive.png";
import img3 from "../images/peach.png";
import img4 from "../images/homeright.jpeg";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";

const ProductCart = () => {
    const [selectedSize, setSelectedSize] = useState("XXL");
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(img1);
    const [reviews, setReviews] = useState([])
    const products = [
        { img: img1 },
        { img: img2 },
        { img: img3 },
        { img: img4 },
    ];

    const products1 = [
        {
            id: 0, img: img2, title: "Awais Jam", description: "I recently purchased these shoes, and I must say the quality is outstanding! The material feels premium, and the stitching is top-notch. They are not only stylish but also incredibly comfortable for long hours of wear. The durability is impressive, making them a great investment. Highly recommended for anyone looking for high-quality shoes!", time: "1 month ago", status: "verified", rating: <StarBorderIcon />
        },
        {
            id: 1, img: img2, title: "Awais Jam", description: "I recently purchased these shoes, and I must say the quality is outstanding! The material feels premium, and the stitching is top-notch. They are not only stylish but also incredibly comfortable for long hours of wear. The durability is impressive, making them a great investment. Highly recommended for anyone looking for high-quality shoes!", time: "1 month ago", status: "UnVerified", rating: <StarBorderIcon />
        }
    ]

    useEffect(() => {
        setReviews(products1);
    }, [])

    return (
        <>
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    <div>
                        <img src={mainImage} alt="Trendy Brown Coat" className="w-full h-[400px] globleimg rounded-lg shadow-lg" />

                        <div className="flex space-x-2 mt-4">
                            {products.map((img, index) => (
                                <img key={index} src={img.img} alt="Thumbnail" className={`w-20 h-20 rounded-lg cursor-pointer border border-gray-300 ${mainImage === img.img ? "border-2 border-black" : ""}`} onClick={() => setMainImage(img.img)} />))}
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-3xl font-bold">Trendy Brown Coat</h2>
                        <div className="flex items-center space-x-2 my-2">
                            <Rating value={4.8} readOnly precision={0.1} />
                            <span className="text-gray-500">(245 Reviews)</span>
                        </div>
                        <div className="text-2xl font-semibold text-red-600">
                            $75.00 <span className="line-through text-gray-500">$150.00</span>
                        </div>
                        <p className="text-gray-600 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                        </p>

                        <div className="mt-4">
                            <span className="font-medium">Size:</span>
                            <div className="flex space-x-2 mt-1">
                                {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (<button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border rounded-lg ${selectedSize === size ? "bg-black text-white" : "bg-gray-100"}`}>{size}</button>))}
                            </div>
                        </div>

                        <div className="mt-4 flex items-center">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-2 bg-gray-200 text-black rounded-l-lg"
                            >
                                -
                            </button>
                            <span className="px-6 py-2 border bg-white">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-2 bg-gray-200 text-black rounded-r-lg"
                            >
                                +
                            </button>
                        </div>

                        <div className="mt-6 flex space-x-4">
                            <Button variant="contained" color="primary" startIcon={<ShoppingCart />} className="!bg-yellow-500 !text-black">
                                Add to Cart
                            </Button>
                            <Button variant="contained" color="secondary" startIcon={<LocalMall />}>
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div >

            {/* ---------- REVIEWS SECTION ---------- */}
            <div className="container mx-auto p-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                    <Reviews className="mr-2 text-gray-700" /> Customer Reviews
                </h3>

                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className=" border p-4 rounded-lg shadow-md mb-4">
                            <div className="flex items-center space-x-4">
                                <img src={review.img} alt="User" className="w-12 h-12 rounded-full border" />
                                <div>
                                    <h4 className="font-semibold">{review.title}</h4>
                                </div>
                            </div>
                            <p className=" text-gray-500 text-sm">{review.time} • <span className="text-green-600">{review.status}</span></p>
                            <div className="flex items-center mt-2">
                                <Rating value={4} readOnly precision={0.5} />
                            </div>
                            <p className="text-gray-700 mt-2">{review.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
)}
            </div>

        </>
    );
};

export default ProductCart;