import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [rating, setRating] = useState({})
    const [favorites, setFavorites] = useState([]); // New state for favorites

    // Add to Favorites
    const addToFavorites = (product) => {
        setFavorites((prevFavorites) => {
            const isProductInFavorites = prevFavorites.some((item) => item.id === product.id);
            if (!isProductInFavorites) {
                return [...prevFavorites, product]; // Add product to favorites
            }
            return prevFavorites; // If already in favorites, do nothing
        });
    };

    // Rating 

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

    // Increase Quantity
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

    // Decrease Quantity (Minimum 1)
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

    // **Remove Product from Cart**
    const removeFromCart = (id) => {
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));

        const product = cartItems.find((item) => item.id === id);
        if (product) {
            setTotalPrice((prevTotalPrice) => Math.max(0, prevTotalPrice - product.price * product.quantity));
        }
    };
    return (
        <Context.Provider value={{ addToCartFunc, increaseQuantity, decreaseQuantity, removeFromCart, cartItems, totalPrice, isOpen, setIsOpen,handleRating,rating }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;