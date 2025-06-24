import { useContext, useState } from "react";
import { Context } from "../ContextAPI/ContextProvider";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Button } from "@mui/material";

function AddToCart() {
    const { cartItems, totalPrice, placeOrderFunc, addToCartFunc, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(Context);
    const [displayProduct, setDisplayProduct] = useState(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
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
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold capitalize text-center md:text-left">
                See products in your cart
            </h2>

            {cartItems.length === 0 ? (
                <div className="flex flex-col justify-center items-center mt-5">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2037/2037455.png"
                        alt="Empty Cart"
                        className="h-24 w-24 mb-4 opacity-50"
                    />
                    <p className="text-gray-500 mt-2">Your Cart is empty</p>
                </div>
            ) : (
                <div className="mt-4">
                    {/* ✅ Scrollable cart list */}
                    <ul className="max-h-[500px] overflow-y-auto space-y-3">
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                className="border-b pb-2 flex flex-col md:flex-row md:items-center justify-between gap-9"
                            >
                                {/* ✅ Image & Title */}
                                <div className="flex items-center gap-4 w-full md:w-[70%] ">
                                    <img
                                        src={item.image?.startsWith("http") ? item.image : `http://localhost:5000${item.image}`}
                                        alt={item.title || "Product Image"}
                                        className="w-24 h-36 object-cover"
                                    />

                                    <div className="flex flex-col">
                                        <h3 className="cursor-pointer font-semibold text-sm sm:text-base">
                                            {item.title}{" "}
                                            <del className="text-xs font-semibold border-b-2 border-red-500 text-red-400">
                                                {item.off}
                                            </del>
                                        </h3>
                                        <span className="font-semibold text-sm sm:text-base">${item.price}</span>
                                    </div>
                                </div>

                                {/* ✅ Quantity Buttons & Remove Button */}
                                <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto">
                                    <button
                                        className="px-3 py-1 bg-gray-200 rounded text-lg sm:text-xl"
                                        onClick={() => decreaseQuantity(item.id)}
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <button
                                        className="px-3 py-1 bg-gray-200 rounded text-lg sm:text-xl"
                                        onClick={() => increaseQuantity(item.id)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="p-1 text-red-500"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <MdOutlineDeleteForever className="text-2xl sm:text-3xl" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* ✅ Total Price */}
                    <div className="flex justify-between py-3">
                        <p className="capitalize font-semibold  text-center md:text-left">
                            Total Price: <span className="text-lg text-blue-600">${totalPrice}</span>
                        </p>
                        {/* <Button onClick={() => handleBuyNow(displayProduct)} variant="contained" size="large">Buy Now</Button> */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddToCart;
