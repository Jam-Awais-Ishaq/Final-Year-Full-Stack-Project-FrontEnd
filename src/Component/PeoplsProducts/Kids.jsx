import React, { useEffect, useState, useContext } from "react";
import { FaRegHeart, FaRegEyeSlash, FaStar } from "react-icons/fa";
import { Context } from "../../ContextAPI/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Kids() {
  const { addToCartFunc, addToFavorites, placeOrderFunc } = useContext(Context);
  const [kids, setKids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/category/kids`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          },
          params: {
            timestamp: Date.now()
          }
        });
        const kidsWithId = response.data.map(kid => ({
          ...kid,
          id: kid._id,
          img: kid.image // Ensure img property exists
        }));

        setKids(kidsWithId);
      } catch (error) {
        console.log("Error in Kids Section", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const navigate = useNavigate();

  const handleFavoriteClick = async (product) => {
    try {
      const productToAdd = {
        ...product,
        img: product.image,
        id: product._id || product.id
      };

      await addToFavorites(productToAdd);
      console.log("Product added to favorites:", productToAdd);
      navigate("/productCart");
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="my-5 bg-gray-100 ml-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {kids.map((kid) => (
          <div key={kid._id} className="bg-white border border-slate-400 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <div className="relative group">
              <img
                src={kid.image.startsWith('http') ? kid.image : `http://localhost:5000${kid.image}`}
                alt={kid.title || "Kids Product"}
                className="w-full h-[370px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex justify-center items-center gap-3">
                <button
                  onClick={() => handleFavoriteClick(kid)}
                  className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  <FaRegHeart className="text-red-500 text-xl" />
                </button>
                <button className="bg-white p-2 rounded-full shadow hover:scale-110 transition">
                  <FaRegEyeSlash className="text-blue-500 text-xl" />
                </button>
                <button className="bg-white p-2 rounded-full shadow hover:scale-110 transition">
                  <FaStar className="text-yellow-500 text-xl" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{kid.name}</h3>
              <p className="text-blue-500 text-lg font-bold mb-3">${kid.price}</p>
              <button
                onClick={() => addToCartFunc(kid)}
                className="w-full bg-gradient-to-r bg-green-500 py-2 rounded-xl hover:bg-green-600 text-white hover:from-blue-600 hover:to-indigo-700 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}