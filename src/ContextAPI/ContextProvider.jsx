import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [rating, setRating] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [sendUserId, setSendUserId] = useState('');
    const [sendUsername, setSendUsername] = useState({});
    const [showLoginModal, setShowLoginModal] = useState(false);

    const addToFavorites = (product) => {
        setFavorites((prevFavorites) => {
            const isProductInFavorites = prevFavorites.some((item) => item.id === product.id);
            if (!isProductInFavorites) {
                return [...prevFavorites, product];
            }
            return prevFavorites;
        });
    };

    const handleRating = (productId, ratingValue) => {
        setRating((prevRatings) => ({
            ...prevRatings,
            [productId]: ratingValue
        }));
    };

    const addToCartFunc = (product) => {
        setCartItems((prevCartItems) => {
            const existingItem = prevCartItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCartItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCartItems, { ...product, quantity: 1 }];
            }
        });
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
    };

    const increaseQuantity = (id) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
        const product = cartItems.find((item) => item.id === id);
        if (product) {
            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
        }
    };

    const decreaseQuantity = (id) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) => {
                if (item.id === id) {
                    return item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item;
                }
                return item;
            })
        );
        const product = cartItems.find((item) => item.id === id);
        if (product && product.quantity > 1) {
            setTotalPrice((prevTotalPrice) => Math.max(0, prevTotalPrice - product.price));
        }
    };

    const removeFromCart = (id) => {
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));
        const product = cartItems.find((item) => item.id === id);
        if (product) {
            setTotalPrice((prevTotalPrice) => Math.max(0, prevTotalPrice - product.price * product.quantity));
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setSendUserId(
                decoded.userId,
            );
        }
    }, []);
    useEffect(() => {
        const getResponse = async () => {

            try {
                const response = await axios.get(`http://localhost:5000/api/users/getUserById/${sendUserId}`)
                setSendUsername(response.data.user)
                console.log(response);
            }
            catch (err) {
                console.log("error is", err)
            }
        }
        getResponse();
    }, [sendUserId]);

    const placeOrderFunc = async (customOrder) => {
        try {
            const orderItems = customOrder ? [{
                product: customOrder._id || customOrder.id,
                quantity: customOrder.quantity,
                name: customOrder.name,
                price: customOrder.price
            }] : cartItems.map(item => ({
                product: item._id,
                quantity: item.quantity,
                name: item.name,
                price: item.price
            }));

            const totalAmount = customOrder ? customOrder.price * customOrder.quantity : totalPrice;

            const response = await axios.post("http://localhost:5000/api/order/place", {
                userId: sendUserId,
                items: orderItems,
                totalAmount: totalAmount,
            });
            console.log("Order Placed successfully", response.data);
        } catch (error) {
            console.error("Order placement failed:", error.message);
            alert("Failed to place order");
        }
    };

    return (
        <Context.Provider value={{
            addToCartFunc,
            increaseQuantity,
            decreaseQuantity,
            addToFavorites,
            favorites,
            removeFromCart,
            cartItems,
            totalPrice,
            isOpen,
            setIsOpen,
            handleRating,
            rating,
            sendUsername,
            placeOrderFunc,
            showLoginModal,
            setShowLoginModal}}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;