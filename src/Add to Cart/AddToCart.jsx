import { useContext } from "react";
import { Context } from "../ContextAPI/ContextProvider";
import { MdOutlineDeleteForever } from "react-icons/md";

function AddToCart() {
    const { cartItems, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(Context);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold capitalize">see products on your cart</h2>
            {cartItems.length === 0 ? (
                <div className="flex flex-col justify-center items-center mt-5">
                    <img src="https://cdn-icons-png.flaticon.com/512/2037/2037455.png" alt="Empty Cart" className="h-24 w-24 mb-4 opacity-50" />
                    <p className="text-gray-500 mt-2">Your Cart is empty</p>
                </div>
            ) : (
                <div>
                    {/* ✅ Scrollable area with max height */}
                    <ul className="max-h-[400px] overflow-y-auto">
                        {cartItems.map((item) => (
                            <li key={item.id} className="border-b py-2 flex justify-between gap-4 items-center">
                                <div className="flex items-center gap-4 w-[70%]">
                                    <img src={item.img} className="h-24" alt={item.title} />
                                    <h3 className="cursor-pointer font-semibold">
                                        {item.title}{" "}
                                        <del className="text-xs font-semibold border-b-2 border-red-500 text-red-400">
                                            {item.off}
                                        </del>
                                    </h3>
                                    <span className="font-semibold">${item.price}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded text-xl"
                                        onClick={() => decreaseQuantity(item.id)}
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded text-xl"
                                        onClick={() => increaseQuantity(item.id)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="px-2 py-1 text-red-500"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <MdOutlineDeleteForever className="text-2xl" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="capitalize font-semibold mt-4">
                        Total Price: <span className="text-lg text-blue-600">${totalPrice}</span>
                    </p>
                </div>
            )}
        </div>
    );
}

export default AddToCart;
