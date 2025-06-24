import React, { useContext, useEffect, useState } from "react";
import { Button, Rating, Modal, Box } from "@mui/material";
import { ShoppingCart, LocalMall, Reviews, Close } from "@mui/icons-material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import img1 from "../images/homeLeft.jpeg";
import img2 from "../images/olive.png";
import img3 from "../images/peach.png";
import img4 from "../images/homeright.jpeg";
import "tailwindcss/tailwind.css";
import { useNavigate, useLocation } from "react-router-dom";
import Receipt from "../ReceiptFLD/Receipt";
import { Context } from "../ContextAPI/ContextProvider";

const ProductCart = () => {
    const { 
        favorites, 
        placeOrderFunc, 
        cartItems, 
        addToCartFunc 
    } = useContext(Context);
    
    const { state } = useLocation();
    const [selectedSize, setSelectedSize] = useState("XXL");
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(img1);
    const [isTrue, setIsTrue] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const [displayProduct, setDisplayProduct] = useState(null);
    const navigate = useNavigate();

    // const products = [
    //     { img: img1 },
    //     { img: img2 },
    //     { img: img3 },
    //     { img: img4 },
    // ];

    useEffect(() => {
        if (state?.product) {
            setDisplayProduct(state.product);
            setMainImage(state.product.image || img1);
        } else if (favorites.length > 0) {
            setDisplayProduct(favorites[0]);
            setMainImage(favorites[0].image || img1);
        }

        setReviews([
            {
                id: 0,
                img: img2,
                name: "Awais Jam",
                description: "I recently purchased these shoes, and I must say the quality is outstanding!",
                time: "1 month ago",
                status: "verified",
                rating: <StarBorderIcon />
            },
            {
                id: 1,
                img: img2,
                name: "Awais Jam",
                description: "The product is great value for money!",
                time: "2 weeks ago",
                status: "UnVerified",
                rating: <StarBorderIcon />
            }
        ]);
    }, [favorites, state]);

    // const handleImageClick = (img) => {
    //     setMainImage(img);
    //     setIsTrue(true);
    // };

    const handleAddToCart = () => {
        if (!displayProduct) return;
        
        const productToAdd = {
            ...displayProduct,
            size: selectedSize,
            quantity: quantity,
            price: parseFloat(displayProduct.price) // Ensure price is a number
        };
        
        addToCartFunc(productToAdd);
        
        // Optional: Navigate to cart or show notification
        // navigate('/cart');
    };

    const handleBuyNow = (product) => {
        const orderProduct = product || displayProduct;
        if (!orderProduct) return;

        const orderDetails = {
            ...orderProduct,
            size: selectedSize,
            quantity: quantity,
            paymentMethod: 'cod',
        };

        setSelectedProduct(orderDetails);
        placeOrderFunc(orderDetails);
        setShowReceipt(true);
    };

    const handleCloseReceipt = () => {
        setShowReceipt(false);
    };

    if (!displayProduct) {
        return (
            <div className="container mx-auto p-6 text-center py-12">
                <h3 className="text-2xl font-semibold">No product selected</h3>
                <p className="text-gray-600 mt-2">
                    Click the heart icon on a product to add it here
                </p>
            </div>
        );
    }

    return (
        <>
            <Modal
                open={showReceipt}
                onClose={handleCloseReceipt}
                aria-labelledby="receipt-modal-title"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '80%', md: '60%' },
                    maxWidth: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2,
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    outline: 'none'
                }}>
                    <div className="flex justify-between items-center flex-col mb-4 border-b pb-2">
                        <h2 className="text-xl flex justify-between w-full font-bold">
                            Order Receipt
                            <Close 
                                className="cursor-pointer" 
                                onClick={handleCloseReceipt} 
                            />
                        </h2>
                        <Receipt product={selectedProduct} />
                    </div>
                </Box>
            </Modal>

            <div className="container mx-auto p-2">
                <div className="grid grid-cols-1  md:grid-cols-2 gap-10">
                    <div className="flex justify-center">
                        <img
                            src={
                                displayProduct.image?.startsWith("http") 
                                    ? displayProduct.image 
                                    : `http://localhost:5000${displayProduct.image}` || mainImage
                            }
                            alt={displayProduct.name || "Product"}
                            className="w-[] h-[350px]  rounded-lg shadow-lg"
                            onError={(e) => {
                                e.target.src = img1;
                            }}/>
                        {/* <div className="flex space-x-2 mt-4">
                            {products.map((img, index) => (
                                <img
                                    key={index}
                                    src={img.img}
                                    alt="Thumbnail"
                                    className={`w-20 h-20 rounded-lg cursor-pointer border-2 ${
                                        mainImage === img.img ? "border-black" : "border-gray-300"
                                    }`}
                                    onClick={() => handleImageClick(img.img)}
                                />
                            ))}
                        </div> */}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">
                            {displayProduct.name || "Untitled Product"}
                        </h2>
                        <div className="flex items-center space-x-2 my-2">
                            <Rating value={4.8} readOnly precision={0.1} />
                            <span className="text-gray-500">({reviews.length} Reviews)</span>
                        </div>
                        <div className="text-2xl font-semibold text-red-600">
                            ${displayProduct.price?.toFixed(2) || "0.00"}
                            {displayProduct.off && (
                                <span className="line-through text-gray-500 ml-2">
                                    ${displayProduct.off}
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600 mt-2">
                            {displayProduct.description || "No description available"}
                        </p>
                        <div className="mt-4">
                            <span className="font-medium">Size:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-3 py-1 border rounded-md text-sm ${
                                            selectedSize === size 
                                                ? "bg-black text-white" 
                                                : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-l-lg"
                            >
                                -
                            </button>
                            <span className="px-6 py-2 border-t border-b bg-white text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
                            >
                                +
                            </button>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <Button
                                variant="contained"
                                startIcon={<ShoppingCart />}
                                className="!bg-yellow-500 !text-black hover:!bg-yellow-600"
                                sx={{ minWidth: 150 }}
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<LocalMall />}
                                onClick={() => handleBuyNow(displayProduct)}
                                sx={{ minWidth: 150 }}
                            >
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>

                {/* <div className="container mx-auto p-6 mt-8">
                    <h3 className="text-2xl font-semibold mb-4 flex items-center">
                        <Reviews className="mr-2 text-gray-700" /> Customer Reviews
                    </h3>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="border p-4 rounded-lg shadow-sm mb-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start space-x-4">
                                    <img 
                                        src={review.img} 
                                        alt="User" 
                                        className="w-12 h-12 rounded-full border object-cover" 
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-semibold">{review.name}</h4>
                                            <p className="text-gray-500 text-sm">
                                                {review.time} • <span className={`${
                                                    review.status === 'verified' 
                                                        ? 'text-green-600' 
                                                        : 'text-gray-500'
                                                }`}>
                                                    {review.status}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <Rating value={4} readOnly precision={0.5} />
                                        </div>
                                        <p className="text-gray-700 mt-2">{review.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 border rounded-lg bg-gray-50">
                            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                sx={{ mt: 2 }}
                            >
                                Write a Review
                            </Button>
                        </div>
                    )}
                </div> */}
            </div>
        </>
    );
};
export default ProductCart;